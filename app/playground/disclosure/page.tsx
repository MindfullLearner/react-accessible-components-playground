import Disclosure from "@/playground/disclosure/Disclosure";

export default function DisclosureDemoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 p-8 dark:bg-black">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Disclosure Demo
      </h1>
      <p className="max-w-md text-center text-sm text-zinc-600 dark:text-zinc-400">
        A handwritten, accessible disclosure widget built from a native
        button and the WAI-ARIA Disclosure pattern. Focus never moves —
        it stays on the trigger when you open or close it.
      </p>

      <div className="w-full max-w-md divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
        <Disclosure summary="What is a disclosure widget?" contentId="disclosure-content-what">
          <p>
            A disclosure is a button that shows or hides a section of
            content in place, without moving focus or opening a
            separate layer like a dialog.
          </p>
        </Disclosure>

        <Disclosure summary="Shipping details" contentId="disclosure-content-shipping">
          <p>
            Orders ship within two business days. Standard delivery
            takes five to seven days; expedited delivery takes two to
            three days.
          </p>
        </Disclosure>

        <Disclosure summary="Return policy" contentId="disclosure-content-returns">
          <p>
            Items can be returned within thirty days of delivery in
            their original condition. Refunds are issued to the
            original payment method.
          </p>
        </Disclosure>
      </div>
    </main>
  );
}
