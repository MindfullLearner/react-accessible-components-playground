"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ModalProps {
  /** Whether the modal is currently open. */
  isOpen: boolean;
  /** Called whenever the modal should close (Escape key, close button, etc). */
  onClose: () => void;
  /** id used to connect the dialog to its visible heading via aria-labelledby. */
  titleId: string;
  /** Visible heading text, also used as the dialog's accessible name. */
  title: string;
  /** Modal body content (description text, actions, form fields, etc). */
  children: ReactNode;
}

/**
 * Selector for elements that can receive keyboard focus.
 * Used both to move focus into the modal on open, and to find the
 * first/last elements for the Tab/Shift+Tab focus trap.
 */
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Modal({
  isOpen,
  onClose,
  titleId,
  title,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const dialogNode = dialogRef.current;
    if (!dialogNode) return;

    // 1. Move focus into the modal as soon as it opens.
    const focusableElements = Array.from(
      dialogNode.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    );
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    } else {
      // Fallback: if there's nothing focusable inside, focus the dialog
      // container itself so keyboard focus still lands inside the modal.
      dialogNode.focus();
    }

    // 2. Trap Tab/Shift+Tab inside the modal, and close on Escape.
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const currentFocusable = Array.from(
        dialogNode!.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (currentFocusable.length === 0) return;

      const first = currentFocusable[0];
      const last = currentFocusable[currentFocusable.length - 1];

      if (event.shiftKey) {
        // Shift+Tab on the first element should wrap to the last one.
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        // Tab on the last element should wrap to the first one.
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg outline-none dark:bg-zinc-900"
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id={titleId}
            className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-md p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          {children}
        </div>
      </div>
    </div>
  );
}
