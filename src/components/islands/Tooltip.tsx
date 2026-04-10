import * as React from "react";
import * as Radix from "@radix-ui/react-tooltip";

const TooltipDemo = () => {
  return (
    <Radix.Provider>
      <Radix.Root>
        <Radix.Trigger asChild>
          <button className="IconButton">Testing</button>
        </Radix.Trigger>
        <Radix.Portal>
          <Radix.Content className="TooltipContent" sideOffset={5}>
            Add to library
            <Radix.Arrow className="RadixArrow" />
          </Radix.Content>
        </Radix.Portal>
      </Radix.Root>
    </Radix.Provider>
  );
};

export default TooltipDemo;
