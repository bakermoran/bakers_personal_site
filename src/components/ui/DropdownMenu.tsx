import * as React from "react";
import * as Radix from "@radix-ui/react-dropdown-menu";

export const Root = Radix.Root;
export const Trigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Radix.Trigger>
>(({ className, ...props }, ref) => (
  <Radix.Trigger
    ref={ref}
    className={[
      "flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5",
      "text-sm text-muted-foreground transition-colors",
      "hover:bg-accent hover:text-foreground",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
));
Trigger.displayName = "DropdownMenu.Trigger";

export const Content = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Radix.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <Radix.Portal>
    <Radix.Content
      ref={ref}
      sideOffset={sideOffset}
      className={[
        "z-50 min-w-36 rounded-md border border-border bg-background py-1 shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  </Radix.Portal>
));
Content.displayName = "DropdownMenu.Content";

export const Item = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Radix.Item>
>(({ className, ...props }, ref) => (
  <Radix.Item
    ref={ref}
    className={[
      "block px-3 py-1.5 text-sm text-foreground outline-none",
      "transition-colors hover:bg-accent focus:bg-accent",
      "cursor-pointer select-none",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
));
Item.displayName = "DropdownMenu.Item";
