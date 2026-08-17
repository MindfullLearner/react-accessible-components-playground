"use client";

import { useState, type ReactNode } from "react";

interface DisclosureProps {
  /** Visible label on the trigger button (e.g. "Shipping details"). */
  summary: string;
  /** Stable id for the disclosed content, referenced by aria-controls. */
  contentId: string;
  /** Whether the disclosure starts open. Defaults to closed. */
  defaultOpen?: boolean;
  /** The content shown or hidden by the trigger. */
  children: ReactNode;
}

export default function Disclosure({
  summary,
  contentId,
  defaultOpen = false,
  children,
}: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800"
      >
        <span>{summary}</span>
        <span aria-hidden="true" className={isOpen ? "rotate-180" : ""}>
          ▾
        </span>
      </button>

      {/*
        No role is needed here. `hidden` removes this element from both
        the visual layout and the accessibility tree when closed, and
        `aria-expanded` on the trigger already communicates open/closed
        state to assistive tech.
      */}
      <div id={contentId} hidden={!isOpen} className="px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </div>
  );
}
