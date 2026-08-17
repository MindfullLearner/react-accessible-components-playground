"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export interface TabItem {
  /** Stable, unique id for this tab — used to build DOM ids and as the React key. */
  id: string;
  /** Visible label shown on the tab button. */
  label: string;
  /** Content rendered inside this tab's panel. */
  content: ReactNode;
}

interface TabsProps {
  /** The tabs to render, in order. Provide at least two. */
  items: TabItem[];
  /** id of the tab selected initially. Defaults to the first tab. */
  defaultSelectedId?: string;
  /** Accessible name for the tablist itself (e.g. "Account settings sections"). */
  label: string;
}

export default function Tabs({ items, defaultSelectedId, label }: TabsProps) {
  const [selectedId, setSelectedId] = useState(
    defaultSelectedId ?? items[0]?.id
  );

  // Map of tab id -> button element, so arrow-key navigation can move
  // DOM focus programmatically to the newly selected tab.
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  function focusTab(id: string) {
    tabRefs.current.get(id)?.focus();
  }

  function selectAndFocus(id: string) {
    setSelectedId(id);
    focusTab(id);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const lastIndex = items.length - 1;
    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowRight":
        // Wrap from the last tab back to the first.
        nextIndex = index === lastIndex ? 0 : index + 1;
        break;
      case "ArrowLeft":
        // Wrap from the first tab back to the last.
        nextIndex = index === 0 ? lastIndex : index - 1;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = lastIndex;
        break;
      default:
        // Any other key: let the browser handle it normally (e.g. Tab).
        return;
    }

    // Prevent the page from scrolling on Home/End/arrow keys.
    event.preventDefault();
    // Automatic activation: moving focus also selects the tab.
    selectAndFocus(items[nextIndex].id);
  }

  return (
    <div>
      <div role="tablist" aria-label={label} className="flex border-b border-zinc-200 dark:border-zinc-800">
        {items.map((item, index) => {
          const selected = item.id === selectedId;
          return (
            <button
              key={item.id}
              ref={(node) => {
                if (node) {
                  tabRefs.current.set(item.id, node);
                } else {
                  tabRefs.current.delete(item.id);
                }
              }}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`panel-${item.id}`}
              // Roving tabindex: only the selected tab is in the normal
              // Tab order; the rest are reachable only via arrow keys.
              tabIndex={selected ? 0 : -1}
              onClick={() => setSelectedId(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={
                selected
                  ? "border-b-2 border-zinc-900 px-4 py-2 text-sm font-medium text-zinc-900 dark:border-zinc-50 dark:text-zinc-50"
                  : "border-b-2 border-transparent px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              }
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item) => {
        const selected = item.id === selectedId;
        return (
          <div
            key={item.id}
            role="tabpanel"
            id={`panel-${item.id}`}
            aria-labelledby={`tab-${item.id}`}
            // tabIndex 0 lets a keyboard user Tab from the active tab
            // straight into the panel, even if the panel's own content
            // has no focusable elements.
            tabIndex={0}
            hidden={!selected}
            className="p-4 text-sm text-zinc-700 dark:text-zinc-300"
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
}
