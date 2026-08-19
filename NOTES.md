# Accessibility Components — Notes

## Overview

For this assignment, I built three interactive components from scratch using
React and TypeScript:

- Modal Dialog
- Tabs
- Disclosure

The components were implemented without a component library and tested using
keyboard-only interaction.

After completing the handwritten versions, I installed shadcn/ui with Radix UI
and added the generated Dialog and Tabs components. I inspected the generated
source to compare the library implementation with my own implementations.

The main difference I noticed is that my handwritten components implement the
interaction and accessibility behavior directly, while shadcn provides
reusable wrappers around Radix primitives that already handle much of the
complex behavior.

---

# 1. Modal Dialog

## My handwritten implementation

My Modal implementation required me to manually manage:

- Opening and closing the modal
- Moving focus into the modal when it opens
- Trapping focus inside the modal
- Handling `Tab` and `Shift + Tab`
- Handling `Escape`
- Returning focus to the original trigger when the modal closes
- Connecting the dialog to its accessible heading
- Using the appropriate ARIA attributes

This made the Modal the most complex of the three components because focus
management had to be handled explicitly.

## What shadcn/Radix provides

The generated shadcn Dialog is built on top of Radix Dialog primitives.

Instead of manually implementing all dialog behavior, the component is
composed from primitives such as:

- `Dialog`
- `DialogTrigger`
- `DialogContent`
- `DialogOverlay`
- `DialogClose`
- `DialogTitle`
- `DialogDescription`
- `DialogFooter`

Radix provides the underlying dialog behavior while shadcn adds styling and
convenient reusable components around those primitives.

## Concrete gaps I found

### Gap 1 — Manual focus and dialog behavior

My handwritten Modal had to implement focus management, focus trapping,
Escape handling, and focus restoration manually.

The Radix Dialog primitive provides these dialog interaction behaviors,
meaning the application does not have to maintain all of that behavior itself.

This reduces the amount of accessibility-sensitive code that needs to be
written and maintained manually.

### Gap 2 — Close behavior

In my handwritten Modal, a close button needs to be connected manually to
the modal's state, for example by using an `onClick` handler that changes
the open state.

The shadcn implementation uses:

```tsx
<DialogPrimitive.Close asChild>
  <Button>
    Close
  </Button>
</DialogPrimitive.Close>
```
DialogPrimitive.Close already knows that the associated dialog should be
closed when the control is activated.

The asChild prop also allows the existing Button to act as the Radix close
control instead of creating an unnecessary additional interactive element.

### Gap 3 — Component composition

My handwritten Modal was more responsible for its own structure and behavior.

The shadcn implementation separates the dialog into reusable primitives
such as DialogContent, DialogHeader, DialogFooter, DialogTitle,
and DialogDescription.

This makes the dialog easier to compose and reuse in different application
screens.

# 2. Tabs
## My handwritten implementation

My handwritten Tabs component manually implemented the required keyboard and
accessibility behavior.

It handled:

role="tablist"
role="tab"
role="tabpanel"
aria-selected
aria-controls
aria-labelledby
Roving tabIndex
ArrowRight and ArrowLeft
Home and End
Wrapping between the first and last tabs
Automatic activation
Moving focus when the selected tab changes

The component used React state to keep the selected tab synchronized with
the visible panel.

## What shadcn/Radix provides

The shadcn Tabs component is built using Radix Tabs primitives such as:

Tabs
TabsList
TabsTrigger
TabsContent

The shadcn source mainly provides a styled and reusable wrapper around these
primitives, while Radix handles the underlying Tabs behavior.

## Concrete gaps I found

### Gap 1 — Manual keyboard and focus behavior

My handwritten Tabs manually implemented roving tabindex, arrow-key
navigation, Home/End navigation, automatic activation, and focus movement.

With shadcn/Radix, this behavior is provided by the underlying Tabs primitive.

Therefore, shadcn/Radix reduces the amount of accessibility-sensitive
keyboard and focus-management code that I have to maintain myself.

### Gap 2 — Composition

My handwritten Tabs uses a specific data-driven structure for its tab items.

The shadcn implementation exposes separate components:
```
<Tabs>
  <TabsList>
    <TabsTrigger value="account">
      Account
    </TabsTrigger>


    <TabsTrigger value="settings">
      Settings
    </TabsTrigger>
  </TabsList>


  <TabsContent value="account">
    ...
  </TabsContent>


  <TabsContent value="settings">
    ...
  </TabsContent>
</Tabs>
```

This makes the shadcn version more composable because application code can
place arbitrary React content inside each tab panel without changing the
Tabs component itself.

### Gap 3 — Styling and variants

My handwritten Tabs has styling designed specifically for my playground.

The shadcn implementation adds a reusable styling layer using utilities such
as cn and supports component variants.

This makes the generated component easier to adapt to different visual
designs without rewriting its structure or behavior.

# 3. Disclosure
My handwritten implementation

The Disclosure was intentionally much simpler than Modal and Tabs.

I used:

1. A native <button>
2. aria-expanded
3. aria-controls
4. A stable content id
5. The native hidden attribute
6. A single piece of React state

I did not add custom keyboard handlers because a native button already
supports Enter and Space.

I also did not move focus when opening or closing the disclosure because focus
correctly remains on the trigger.

## Comparison with shadcn

The assignment only required shadcn Dialog and Tabs to be added and inspected.
Therefore, I did not replace my handwritten Disclosure with a shadcn
implementation.

The Disclosure was already relatively small and relied heavily on native
browser behavior.

This helped me understand that a component library is not automatically
necessary for every interactive component.
