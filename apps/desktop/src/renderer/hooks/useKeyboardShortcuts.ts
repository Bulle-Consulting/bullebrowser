import { useEffect } from 'react';
import { useBrowserStore, activeTabSelector } from '../state/browser-store.js';

export function useKeyboardShortcuts() {
  const toggleAi = useBrowserStore((s) => s.toggleAiPanel);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;
      const active = activeTabSelector(useBrowserStore.getState());
      if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        void window.bullebrowser.tabs.create();
      } else if (e.key.toLowerCase() === 'w') {
        e.preventDefault();
        if (active) void window.bullebrowser.tabs.close(active.id);
      } else if (e.key.toLowerCase() === 'l') {
        e.preventDefault();
        window.dispatchEvent(new Event('bullebrowser:focus-address'));
      } else if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        if (active) void window.bullebrowser.tabs.reload(active.id);
      } else if (e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        toggleAi();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggleAi]);
}
