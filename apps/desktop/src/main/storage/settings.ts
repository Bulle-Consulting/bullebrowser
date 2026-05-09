import { DEFAULT_SETTINGS, type AppSettings } from '../../shared/ipc.js';
import { createStore } from './store.js';

const store = createStore<AppSettings & Record<string, unknown>>(
  'settings',
  DEFAULT_SETTINGS as AppSettings & Record<string, unknown>,
);

export function getSettings(): AppSettings {
  return {
    defaultModel: store.get('defaultModel'),
    aiPanelOpen: store.get('aiPanelOpen'),
    searchProvider: store.get('searchProvider'),
    homepageUrl: store.get('homepageUrl'),
    complianceChecklist: store.get('complianceChecklist'),
  };
}

export function setSettings(patch: Partial<AppSettings>): AppSettings {
  for (const [k, v] of Object.entries(patch)) {
    if (v !== undefined) {
      (store as unknown as { set: (k: string, v: unknown) => void }).set(k, v);
    }
  }
  return getSettings();
}
