import shocknetGlobal from './shocknet-global.css';
import shocknetSanctum from './shocknet-sanctum.css';

/** Map document-level selectors to the shadow host so Shocknet tokens apply inside closed shadow roots. */
export function adaptShocknetCssForShadow(css: string): string {
  return css
    .replace(/(^|\n)\s*:root\s*,/g, '$1:host,')
    .replace(/(^|\n)\s*:root\s*\{/g, '$1:host {')
    .replace(/(^|\n)\s*html\s*\{/g, '$1:host {')
    .replace(/(^|\n)\s*body\s*\{/g, '$1:host {')
    .replace(
      /:host,\s*\n\s*\[data-theme="dark"\]/g,
      ':host,\n:host([data-theme="dark"]),\n[data-theme="dark"]'
    );
}

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Inter:wght@400;500;600&display=swap');`;

let cachedAdaptedBundle: string | null = null;

export function getWidgetStylesheetText(): string {
  if (!cachedAdaptedBundle) {
    const combined = `${shocknetGlobal}\n${shocknetSanctum}`;
    cachedAdaptedBundle = `${FONT_IMPORT}\n${adaptShocknetCssForShadow(combined)}`;
  }
  return cachedAdaptedBundle;
}
