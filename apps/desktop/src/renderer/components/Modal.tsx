import { useEffect } from 'react';

export function Modal({
  title,
  onClose,
  children,
  width = 480,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{ width }}
        className="max-h-[80vh] overflow-hidden rounded-lg bg-surface-light text-ink-primary shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="text-sm font-semibold">{title}</div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid h-7 w-7 place-items-center rounded hover:bg-surface-muted"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </header>
        <div className="max-h-[68vh] overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
