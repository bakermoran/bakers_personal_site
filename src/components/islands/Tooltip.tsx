import React, { type ReactNode, type PropsWithChildren } from "react";
import * as Radix from "@radix-ui/react-tooltip";

interface Props extends PropsWithChildren<Radix.TooltipProps> {
  content: ReactNode;
}

export const Tooltip = ({ children, content, ...props }: Props) => {
  return (
    <Radix.Provider delayDuration={500}>
      <Radix.Root {...props}>
        <Radix.Trigger>{children}</Radix.Trigger>
        <Radix.Portal>
          <Radix.Content
            className="p-2 rounded-md bg-primary text-primary-foreground"
            sideOffset={5}
          >
            {content}
            <Radix.Arrow />
          </Radix.Content>
        </Radix.Portal>
      </Radix.Root>
    </Radix.Provider>
  );
};
