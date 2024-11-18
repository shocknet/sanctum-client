import { TokenManager } from '../utils/tokenManager';
import { WidgetOptions } from '../types';
import { ICONS } from '../constants/assets';
import SANCTUM_LOGO from '../assets/santum_huge.png';
import { ClientKeyManager } from '../utils/clientKeyManager';
import { config } from '../utils/config';
import { SanctumError } from '../utils/errors';

type LoginStatus = null | "loading" | "awaiting" | "confirmed";

export class SanctumWidget {
  private static readonly SANCTUM_URL = config.SANCTUM_URL;
  private static readonly WEBSOCKET_URL = config.SANCTUM_WS_URL;

  private static readonly BASE_BACKOFF_DELAY = 1000; // Base delay of 1 second
  private static readonly MAX_BACKOFF_DELAY = 30000; // Max delay of 30 seconds
  private reconnectAttempts = 0;
  private socket: WebSocket | null = null;


  private container: HTMLElement;
  private options: WidgetOptions;
  private requestToken: string | null = null;
  private tokenManager: TokenManager;
  private loginStatus: LoginStatus = null;
  private clientKeyManager = ClientKeyManager.getInstance();
  private timerInterval: number | null = null;
  private secondsLeft: number = 0;
  private expiresAt: number = 0;
  private promptConfirmLogout = false;

  static init(containerId: string, options: WidgetOptions = {}): void {
    new SanctumWidget(containerId, options);
  }

  private constructor(containerId: string, options: WidgetOptions) {
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

  private initialize(): void {
    this.addStyles();


    // Check for existing token
    const data = this.tokenManager.getToken();
    if (data) {
      this.setLoginStatus('confirmed');
      if (this.options.onSuccess) {
        this.options.onSuccess(data.accessToken);
      }
    }
    this.render();
  }

  private async initializeWebSocket(): Promise<void> {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.close();
    }

    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(SanctumWidget.WEBSOCKET_URL);

      this.socket.onopen = () => {
        if (this.socket) {
          this.socket.send(JSON.stringify({
            action: "initial_request",
            data: { clientKey: this.clientKeyManager.getClientKey() }
          }));
        }
      };

      this.socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          const { action, data } = message;

          switch (action) {
            case "request_token_response":
              this.requestToken = data.requestToken;
              this.expiresAt = data.expiresAt;
              this.openSanctumAuth();
              this.setLoginStatus('awaiting');
              break;
            case "access_token":
              console.log("Received access token", data);
              this.tokenManager.setToken(data.accessToken, data.identifier);
              if (this.options.onSuccess) {
                this.options.onSuccess(data.token);
              }
              this.setLoginStatus('confirmed');
              this.socket?.close();
              resolve();
              break;
            case "error":
              console.error("Error from websocket:", data.message)
              if (this.options.onError) {
                this.options.onError(data.message);
              }
              this.setLoginStatus(null);
              this.socket?.close();
              reject(new Error(data.message));
              break
            default:
              console.warn("Unknown action", action)
              this.setLoginStatus(null);
              this.socket?.close();
              reject(new Error("Unknown action"));
          }
        } catch (error) {
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
          this.reconnectWithBackoff(resolve, reject)
        }
      };
    });
  }

  private reconnectWithBackoff(resolve: () => void, reject: () => void): void {
    // Calculate the delay with exponential backoff
    const delay = Math.min(
      SanctumWidget.BASE_BACKOFF_DELAY * (2 ** this.reconnectAttempts),
      SanctumWidget.MAX_BACKOFF_DELAY
    );

    setTimeout(() => {
      console.log(`Reconnecting... Attempt ${this.reconnectAttempts + 1}`);
      this.reconnectAttempts += 1;

      // Attempt to reinitialize the WebSocket
      this.initializeWebSocket().then(resolve).catch(reject);
    }, delay);
  }

  private openSanctumAuth(): void {
    if (!this.requestToken) {
      console.error('No request token available');
      return;
    }
    const authUrl = new URL(`/auth/requestToken/${this.requestToken}`, SanctumWidget.SANCTUM_URL);
    window.open(authUrl.toString(), '_blank');
  }

  private setLoginStatus(status: LoginStatus): void {
    this.loginStatus = status;
    this.render();

    if (status === 'awaiting') {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  private startTimer(): void {
    this.stopTimer();
    const now = Date.now();
    const expiresAt = Math.round((this.expiresAt - now) / 1000);
    this.secondsLeft = expiresAt

    
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

  private stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private updateTimer(): void {
    const timerElement = this.container.querySelector('.timer-num');
    if (timerElement) {
      timerElement.textContent = this.formatTime(this.secondsLeft);
    }
  }

  private render(): void {
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
          <span class="gray-text">client_id-${this.clientKeyManager.getClientKey()}</span>
        `;
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
          const [yesBtn, noBtn] = Array.from(content.querySelectorAll('button')) as HTMLButtonElement[];
          yesBtn.onclick = () => this.handleLogout();
          noBtn.onclick = () => this.setPromptConfirmLogout(false);
        } else {
          content.classList.add('confirmed');
          content.innerHTML = `
            <div class="logout-cross">
              ${ICONS.CLOSE}
            </div>
            ${ICONS.CHECKED}

            <span class="gray-text">${this.tokenManager.getToken()?.identifier}</span>
            <span class="gray-text">client_id-${this.clientKeyManager.getClientKey()}</span>
          `;
          content.querySelector('.logout-cross')?.addEventListener('click',
            () => this.setPromptConfirmLogout(true));
        }
        break;

      default: // null state
        content.classList.add('sanctum-button-group');
        content.innerHTML = `
          <button class="sanctum-login-button">Auth to Sanctum</button>
        `;
        const authBtn = content.querySelector('button') as HTMLButtonElement;
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
        <img src="${SANCTUM_LOGO}" alt="Sanctum Logo" />
      </div>
    `;
    this.container.appendChild(logoSection);
  }

  private addStyles(): void {
    const styleId = 'sanctum-widget-styles';
    if (document.getElementById(styleId)) return;

    const styles = `

      .sanctum-widget-container,
      .sanctum-widget-container * {
        box-sizing: border-box;
      }
      .sanctum-widget-container {
        background-color: #1a1a1a;
        height: 151px;
        min-height: 151px;
        border: 2px solid #32a852;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        gap: 7px;
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
        padding: 0 12px;
        height: 51px;
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

    `;

    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }

  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  private setPromptConfirmLogout(show: boolean): void {
    this.promptConfirmLogout = show;
    this.render();
  }

  private handleLogout(): void {
    this.tokenManager.clearToken();
    this.setLoginStatus(null);
    this.setPromptConfirmLogout(false);
  }

  private handleSanctumRequest(): void {
    this.setLoginStatus('loading');
    this.initializeWebSocket();
  }
}
