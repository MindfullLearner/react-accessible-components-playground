"use client";

import { useRef, useState } from "react";
import Modal from "@/playground/modal/Modal";

export default function ModalDemoPage() {
  const [isOpen, setIsOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    // Return focus to the element that opened the modal.
    openButtonRef.current?.focus();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 p-8 dark:bg-black">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Modal Dialog Demo
      </h1>
      <p className="max-w-md text-center text-sm text-zinc-600 dark:text-zinc-400">
        A handwritten, accessible modal dialog built from native HTML
        elements and the WAI-ARIA Dialog (Modal) pattern.
      </p>

      <button
        ref={openButtonRef}
        type="button"
        onClick={openModal}
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
      >
        Open Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        titleId="delete-item-title"
        title="Delete this item?"
      >
        <p>
          This action cannot be undone. Are you sure you want to continue?
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </main>
  );
}
