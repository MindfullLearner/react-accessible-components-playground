import Tabs, { type TabItem } from "@/playground/tabs/Tabs";

const settingsTabs: TabItem[] = [
  {
    id: "profile",
    label: "Profile",
    content: (
      <p>
        This panel would hold profile fields like display name and avatar.
      </p>
    ),
  },
  {
    id: "account",
    label: "Account",
    content: (
      <p>
        This panel would hold account settings like email and password.
      </p>
    ),
  },
  {
    id: "notifications",
    label: "Notifications",
    content: (
      <p>
        This panel would hold notification preferences and delivery
        channels.
      </p>
    ),
  },
  {
    id: "billing",
    label: "Billing",
    content: (
      <p>This panel would hold billing details and invoice history.</p>
    ),
  },
];

export default function TabsDemoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 p-8 dark:bg-black">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Tabs Demo
      </h1>
      <p className="max-w-md text-center text-sm text-zinc-600 dark:text-zinc-400">
        A handwritten, accessible tabs widget built from native HTML
        elements and the WAI-ARIA Tabs pattern with automatic activation.
      </p>

      <div className="w-full max-w-md rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <Tabs items={settingsTabs} label="Settings sections" />
      </div>
    </main>
  );
}
