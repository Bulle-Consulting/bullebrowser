// Wire up electron-updater to GitHub Releases. Disabled in dev.

import { app } from 'electron';
import { autoUpdater } from 'electron-updater';

export function setupAutoUpdate() {
  if (!app.isPackaged) return;
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater
    .checkForUpdatesAndNotify()
    .catch((err) => console.warn('[updater] check failed:', err));
}
