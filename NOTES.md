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
