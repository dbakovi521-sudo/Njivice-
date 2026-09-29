import { useCallback, useEffect, useRef, useState, type TouchEvent as ReactTouchEvent } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';

export interface LightboxImage {
  src: string;
  alt: string;
  /** Optional line of text shown beneath the photo. Falls back to the alt text. */
  caption?: string;
}

interface LightboxDialogProps {
  items: LightboxImage[];
  index: number;
  onClose: () => void;
  onNavigate: (delta: number) => void;
}

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
const SWIPE_THRESHOLD = 45;

const LightboxDialog = ({ items, index, onClose, onNavigate }: LightboxDialogProps) => {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const item = items[index];

  // Lock page scroll while the lightbox is open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Move focus into the dialog, hand it back to the page when it closes.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previouslyFocused?.focus?.();
  }, []);

  // Keyboard: Escape closes, arrow keys step through, Tab stays inside.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNavigate(1);
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onNavigate(-1);
        return;
      }
      if (event.key === 'Tab' && dialogRef.current) {
        const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, onNavigate]);

  const handleTouchStart = (event: ReactTouchEvent) => {
    const touch = event.touches[0];
    swiped.current = false;
    swipeStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: ReactTouchEvent) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      swiped.current = true;
      onNavigate(dx < 0 ? 1 : -1);
    }
  };

  // A swipe also fires a click on the backdrop — ignore that one.
  const handleBackdropClick = () => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    onClose();
  };

  const navButtonClass =
    'absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#08141B] sm:h-12 sm:w-12';

  if (!item) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${t.lightbox.dialog} — ${item.alt}`}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#08141B]/95 px-2 py-4 backdrop-blur-sm sm:px-6"
      onClick={handleBackdropClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={t.lightbox.close}
        className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#08141B] sm:right-5 sm:top-5"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={() => onNavigate(-1)}
        aria-label={t.lightbox.previous}
        className={`${navButtonClass} left-2 sm:left-5`}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={() => onNavigate(1)}
        aria-label={t.lightbox.next}
        className={`${navButtonClass} right-2 sm:right-5`}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <figure className="flex max-h-full w-full max-w-6xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={item.src}
          alt={item.alt}
          draggable={false}
          className="max-h-[72vh] w-auto max-w-full select-none rounded-xl object-contain shadow-[0_24px_70px_rgba(0,0,0,0.55)] sm:max-h-[76vh]"
        />
        <figcaption className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-14 text-center sm:px-20">
          <span className="text-[15px] font-medium text-white/90">{item.caption ?? item.alt}</span>
          <span className="text-[13px] tabular-nums text-white/55">
            {index + 1} / {items.length}
          </span>
        </figcaption>
        <p className="mt-2 hidden text-[12px] text-white/40 sm:block">{t.lightbox.hint}</p>
      </figure>
    </div>
  );
};

/**
 * Small, dependency-free photo lightbox. Each section that shows photos calls
 * `useLightbox()` and renders the returned `lightbox` node once, then calls
 * `openAt(list, index)` from its image buttons.
 */
export function useLightbox() {
  const [items, setItems] = useState<LightboxImage[]>([]);
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openAt = useCallback((list: LightboxImage[], startIndex: number, source?: string) => {
    if (list.length === 0) return;
    setItems(list);
    setIndex(Math.min(Math.max(startIndex, 0), list.length - 1));
    setIsOpen(true);
    (window as any).supercool?.track?.('image_view', {
      ...(source ? { source } : {}),
      image: startIndex + 1,
      total: list.length,
    });
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const navigate = useCallback(
    (delta: number) => {
      setIndex((current) => {
        const count = items.length;
        if (count === 0) return current;
        return (current + delta + count) % count;
      });
    },
    [items.length],
  );

  const lightbox =
    isOpen && items.length > 0 ? (
      <LightboxDialog items={items} index={index} onClose={close} onNavigate={navigate} />
    ) : null;

  return { openAt, lightbox };
}

export default useLightbox;
