// Renderer-side state. The main process is the source of truth for
// tabs/history/etc; we mirror it here for fast UI rendering and update
// on TAB_UPDATED broadcasts.

import { create } from 'zustand';
import type { TabState } from '../../shared/ipc.js';

interface BrowserStoreState {
  tabs: TabState[];
  aiPanelOpen: boolean;
  showSettings: boolean;
  showAbout: boolean;
  setTabs: (tabs: TabState[]) => void;
  toggleAiPanel: () => void;
  setAiPanelOpen: (open: boolean) => void;
  openSettings: () => void;
  closeSettings: () => void;
  openAbout: () => void;
  closeAbout: () => void;
}

export const useBrowserStore = create<BrowserStoreState>((set) => ({
  tabs: [],
  aiPanelOpen: false,
  showSettings: false,
  showAbout: false,
  setTabs: (tabs) => set({ tabs }),
  toggleAiPanel: () => set((s) => ({ aiPanelOpen: !s.aiPanelOpen })),
  setAiPanelOpen: (open) => set({ aiPanelOpen: open }),
  openSettings: () => set({ showSettings: true }),
  closeSettings: () => set({ showSettings: false }),
  openAbout: () => set({ showAbout: true }),
  closeAbout: () => set({ showAbout: false }),
}));

export const activeTabSelector = (s: BrowserStoreState): TabState | undefined =>
  s.tabs.find((t) => t.active);
