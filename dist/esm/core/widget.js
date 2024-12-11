import { TokenManager } from '../utils/tokenManager.js';
import { ICONS } from '../constants/assets.js';
import img from '../assets/santum_huge.png.js';
import { ClientKeyManager } from '../utils/clientKeyManager.js';
import { config } from '../utils/config.js';
import { SanctumError } from '../utils/errors.js';

class SanctumWidget {
    static SANCTUM_URL = config.SANCTUM_URL;
    static WEBSOCKET_URL = config.SANCTUM_WS_URL;
    static BASE_BACKOFF_DELAY = 1000; // Base delay of 1 second
    static MAX_BACKOFF_DELAY = 30000; // Max delay of 30 seconds
    reconnectAttempts = 0;
    socket = null;
    container;
    options;
    requestToken = null;
    tokenManager;
    loginStatus = null;
    clientKeyManager = ClientKeyManager.getInstance();
    timerInterval = null;
    secondsLeft = 0;
    expiresAt = 0;
    promptConfirmLogout = false;
    static init(containerId, options = {}) {
        new SanctumWidget(containerId, options);
    }
    constructor(containerId, options) {
        const element = document.getElementById(containerId);
        if (!element) {
            throw new SanctumError(`Container element with id "${containerId}" not found`);
        }
        this.container = element;
        this.options = options;
        this.tokenManager = TokenManager.getInstance();
        this.clientKeyManager = ClientKeyManager.getInstance();
        this.initialize();
    }
    initialize() {
        this.addStyles();
        // Check for existing token
        const data = this.tokenManager.getToken();
        if (data) {
            this.setLoginStatus('confirmed');
        }
        this.render();
    }
    async initializeWebSocket() {
        if (this.socket?.readyState === WebSocket.OPEN) {
            this.socket.close();
        }
        return new Promise((resolve, reject) => {
            this.socket = new WebSocket(SanctumWidget.WEBSOCKET_URL);
            this.socket.onopen = () => {
                if (this.socket) {
                    this.socket.send(JSON.stringify({ clientKey: this.clientKeyManager.getClientKey() }));
                }
            };
            this.socket.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data);
                    if (message.requestToken) {
                        this.requestToken = message.requestToken;
                        this.expiresAt = message.expiresAt;
                        this.openSanctumAuth();
                        this.setLoginStatus('awaiting');
                    }
                    else if (message.accessToken) {
                        this.tokenManager.setToken(message.accessToken, message.accountIdentifier);
                        if (this.options.onSuccess) {
                            this.options.onSuccess(message.accessToken, message.identifier);
                        }
                        this.setLoginStatus('confirmed');
                        this.socket?.close();
                        resolve();
                    }
                    else if (message.error) {
                        console.error("Error from websocket:", message.error);
                        if (this.options.onError) {
                            this.options.onError(message.error);
                        }
                        this.setLoginStatus(null);
                        this.socket?.close();
                        reject(new Error(message.error));
                    }
                }
                catch (error) {
                    console.error('Failed to parse WebSocket message:', error);
                    this.setLoginStatus(null);
                    this.socket?.close();
                    reject(error);
                }
            };
            this.socket.onerror = (error) => {
                console.error('WebSocket error:', error);
                this.setLoginStatus(null);
                this.socket?.close();
                reject(error);
            };
            this.socket.onclose = () => {
                if (this.loginStatus === 'awaiting' || this.loginStatus === 'loading') {
                    this.reconnectWithBackoff(resolve, reject);
                }
            };
        });
    }
    reconnectWithBackoff(resolve, reject) {
        // Calculate the delay with exponential backoff
        const delay = Math.min(SanctumWidget.BASE_BACKOFF_DELAY * (2 ** this.reconnectAttempts), SanctumWidget.MAX_BACKOFF_DELAY);
        setTimeout(() => {
            console.log(`Reconnecting... Attempt ${this.reconnectAttempts + 1}`);
            this.reconnectAttempts += 1;
            // Attempt to reinitialize the WebSocket
            this.initializeWebSocket().then(resolve).catch(reject);
        }, delay);
    }
    openSanctumAuth() {
        if (!this.requestToken) {
            console.error('No request token available');
            return;
        }
        const authUrl = new URL(`/auth/requestToken/${this.requestToken}`, SanctumWidget.SANCTUM_URL);
        window.open(authUrl.toString(), '_blank');
    }
    setLoginStatus(status) {
        this.loginStatus = status;
        this.render();
        if (status === 'awaiting') {
            this.startTimer();
        }
        else {
            this.stopTimer();
        }
    }
    startTimer() {
        this.stopTimer();
        const now = Date.now();
        const expiresAt = Math.round((this.expiresAt - now) / 1000);
        this.secondsLeft = expiresAt;
        this.timerInterval = window.setInterval(() => {
            const secondsLeft = Math.round((this.expiresAt - Date.now()) / 1000);
            if (secondsLeft < 0) {
                this.stopTimer();
                return;
            }
            this.secondsLeft = secondsLeft;
            this.updateTimer();
        }, 1000);
    }
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    updateTimer() {
        const timerElement = this.container.querySelector('.timer-num');
        if (timerElement) {
            timerElement.textContent = this.formatTime(this.secondsLeft);
        }
    }
    formatIdentifier(identifier) {
        if (!identifier)
            return "";
        if (identifier.includes('@')) {
            const [localPart, domain] = identifier.split('@');
            if (localPart.length > 3) {
                return `${localPart.slice(0, 3)}...@${domain}`;
            }
            return identifier;
        }
        if (identifier.startsWith('npub')) {
            return `${identifier.slice(0, 10)}...${identifier.slice(-10)}`;
        }
        return identifier;
    }
    ;
    render() {
        this.container.innerHTML = '';
        this.container.className = 'sanctum-widget-container' + (this.loginStatus === 'confirmed' ? ' when-confirmed' : '');
        const content = document.createElement('div');
        content.className = 'sanctum-alt-view-container';
        switch (this.loginStatus) {
            case 'loading':
                content.classList.add('sanctum-loading');
                content.innerHTML = ICONS.SETTINGS;
                break;
            case 'awaiting':
                content.innerHTML = `
          <div class="sanctum-timer-description">Awaiting User Confirmation</div>
          <div class="sanctum-timer">
            ${ICONS.SANDCLOCK}
            <span class="timer-num white-text">${this.formatTime(this.secondsLeft)}</span>
          </div>
          <button class="sanctum-cancel-button">Cancel</button>
        `;
                const cancelBtn = content.querySelector('.sanctum-cancel-button');
                cancelBtn.onclick = () => this.handleCancel();
                break;
            case 'confirmed':
                if (this.promptConfirmLogout) {
                    content.innerHTML = `
            <span class="title">Log Out?</span>
            <div class="sanctum-button-group logout-buttons">
              <button class="sanctum-login-button">Yes</button>
              <button class="sanctum-login-button">No</button>
            </div>
          `;
                    const [yesBtn, noBtn] = Array.from(content.querySelectorAll('button'));
                    yesBtn.onclick = () => this.handleLogout();
                    noBtn.onclick = () => this.setPromptConfirmLogout(false);
                }
                else {
                    content.classList.add('confirmed');
                    content.innerHTML = `
            <div class="logout-cross">
              ${ICONS.LOGOUT}
            </div>
            ${ICONS.CHECKED}

            <span class="gray-text">${this.formatIdentifier(this.tokenManager.getToken()?.accountIdentifier)}</span>
            <span class="gray-text">client_id-${this.clientKeyManager.getClientKey()}</span>
          `;
                    content.querySelector('.logout-cross')?.addEventListener('click', () => this.setPromptConfirmLogout(true));
                }
                break;
            default: // null state
                content.classList.add('sanctum-button-group');
                content.innerHTML = `
          <button class="sanctum-login-button">Auth to Sanctum</button>
        `;
                const authBtn = content.querySelector('button');
                authBtn.onclick = () => this.handleSanctumRequest();
        }
        this.container.appendChild(content);
        // Add logo section
        const logoSection = document.createElement('div');
        logoSection.className = 'sanctum-logo';
        logoSection.innerHTML = `
      ${(this.loginStatus !== 'awaiting' && this.loginStatus !== 'confirmed')
            ? '<span>Powered by</span>'
            : ''}
      <div>
        <img src="${img}" alt="Sanctum Logo" />
      </div>
    `;
        this.container.appendChild(logoSection);
    }
    addStyles() {
        const styleId = 'sanctum-widget-styles';
        if (document.getElementById(styleId))
            return;
        const styles = `

      .sanctum-widget-container,
      .sanctum-widget-container * {
        box-sizing: border-box;
      }
      .sanctum-widget-container {
        background-color: #1a1a1a;
        min-height: 0;
        aspect-ratio: 3/1;
        border: 2px solid #32a852;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        color: #ffffff;
      }

      .sanctum-widget-container.when-confirmed {
        padding: 0;
        //padding-bottom: 15px;
      }

      .sanctum-logo {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 12px;
      }

      .sanctum-logo span {
        font-size: 11px;
        color: #ffffff;
        text-align: center;
      }

      .sanctum-logo div {
        padding: 0 5px;
        width: 116px;
        display: flex;
        justify-content: center;
      }

      .sanctum-logo div > img {
        width: 104px;
        height: 12px;
      }

      .sanctum-alt-view-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        flex-grow: 1;
      }

      .sanctum-timer-description {
        font-size: 14px;
        color: #ffffff;
      }

      .sanctum-timer {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2px;
        font-size: 16px;
        color: #8c8c8c;
      }

      .sanctum-loading {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      @keyframes rotateAnimation {
        0% { transform: rotate(0deg); }
        50% { transform: rotate(360deg); }
        100% { transform: rotate(380deg); }
      }

      .sanctum-loading svg {
        width: 30px;
        height: 30px;
        transition-duration: 1000ms;
        animation: rotateAnimation 1100ms linear infinite;
      }

      .sanctum-alt-view-container.confirmed span {
        font-size: 12px;
      }

      .sanctum-alt-view-container.confirmed.logout-prompt {
        margin-top: 7px;
        gap: 7px;
      }

      .logout-cross {
        position: absolute;
        right: 3px;
        top: 3px;
        cursor: pointer;
        width: fit-content;
      }

      .title {
        font-size: 16px;
      }

      .sanctum-button-group {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 14px;
      }

      .sanctum-button-group.logout-buttons .sanctum-login-button {
        width: 80px;
        height: 41px;
      }

      .sanctum-login-button {
        padding: 10px 12px;
        font-weight: 600;
        background-color: #32a852;
        border: none;
        border-radius: 5px;
        color: #ffffff;
        font-size: 16px;
        transition-duration: 400ms;
        border: 0;
        font-family: inherit;
        font-style: inherit;
        font-variant: inherit;
        line-height: 1;
        text-transform: none;
        cursor: pointer;
      }

      .sanctum-login-button:hover,
      .sanctum-login-button:active {
        filter: brightness(120%);
      }

      .sanctum-widget-container .gray-text {
        font-size: 11px;
        color: #A0A3A7;
        text-align: center;
        margin: 0;
      }

      .sanctum-widget-container .white-text {
        font-size: 16px;
        color: #ffffff;
        text-align: center;
        margin: 0;
      }

      .sanctum-cancel-button {
        padding: 6px 12px;
        background: transparent;
        border: 1px solid #8c8c8c;
        border-radius: 4px;
        color: #8c8c8c;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .sanctum-cancel-button:hover {
        border-color: #ffffff;
        color: #ffffff;
      }

    `;
        const styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    setPromptConfirmLogout(show) {
        this.promptConfirmLogout = show;
        this.render();
    }
    handleLogout() {
        this.tokenManager.clearToken();
        this.setLoginStatus(null);
        this.setPromptConfirmLogout(false);
        if (this.options.onLogout) {
            this.options.onLogout();
        }
    }
    handleSanctumRequest() {
        this.setLoginStatus('loading');
        this.initializeWebSocket();
    }
    handleCancel() {
        this.socket?.close();
        this.setLoginStatus(null);
        this.stopTimer();
        this.reconnectAttempts = 0;
    }
}

export { SanctumWidget };
//# sourceMappingURL=widget.js.map
