import { BrowserWindow, nativeImage } from 'electron';
import { join } from 'node:path';
import { product } from '@bullebrowser/brand-tokens';

export interface WindowOptions {
  preloadPath: string;
}

export function createBrowserWindow(opts: WindowOptions): BrowserWindow {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 600,
    title: product.windowTitle,
    backgroundColor: '#0F172A',
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    autoHideMenuBar: true,
    show: false,
    icon: tryIcon(),
    webPreferences: {
      preload: opts.preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webviewTag: false,
    },
  });

  win.once('ready-to-show', () => win.show());
  win.on('page-title-updated', (e) => e.preventDefault()); // keep our title

  return win;
}

function tryIcon() {
  try {
    return nativeImage.createFromPath(
      join(process.resourcesPath, 'icon.png'),
    );
  } catch {
    return undefined;
  }
}
