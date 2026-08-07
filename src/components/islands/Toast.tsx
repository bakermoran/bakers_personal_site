import { useState, useEffect } from "react";
import * as Radix from "@radix-ui/react-toast";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "./Toast.css";

interface ToastData {
  title: string;
  description: string;
}

export default function Toast() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<ToastData>({
    title: "",
    description: "",
  });

  useEffect(() => {
    const handler = (e: CustomEvent<ToastData>) => {
      setData(e.detail);
      setOpen(true);
    };
    window.addEventListener("show-toast", handler as EventListener);
    return () => window.removeEventListener("show-toast", handler as EventListener);
  }, []);

  return (
    <Radix.Provider>
      <Radix.Root
        open={open}
        onOpenChange={setOpen}
        className={`ToastRoot relative bg-muted text-muted-foreground border rounded-md shadow-lg p-4 flex flex-col gap-1`}
        duration={2000}
      >
        <Radix.Title className="font-serif font-semibold text-foreground text-sm">
          {data.title}
        </Radix.Title>
        <Radix.Description className="text-muted-foreground text-sm">
          {data.description}
        </Radix.Description>
        <Radix.Close className="absolute top-4 right-2 text-muted-foreground">
          <XMarkIcon className="h-4 w-4" />
        </Radix.Close>
      </Radix.Root>

      <Radix.Viewport className="fixed bottom-0 right-0 p-6 z-50 w-80" />
    </Radix.Provider>
  );
}
