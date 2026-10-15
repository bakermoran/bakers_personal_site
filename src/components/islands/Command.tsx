import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { Command as BaseCommand } from "cmdk";

// Wrap base cmd-k and extend it with:
// - Page context for sub-page navigation within the dialog.
// - Custom handling for Escape and Backspace keys to navigate between sub-pages and the root page.

const PageContext = React.createContext<string | undefined>(undefined);

interface ItemProps extends React.ComponentProps<typeof BaseCommand.Item> {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

function Item({ icon: Icon, children, ...props }: ItemProps) {
  return (
    <BaseCommand.Item {...props}>
      {Icon && <Icon aria-hidden className="text-muted-foreground size-4 shrink-0" />}
      {children}
    </BaseCommand.Item>
  );
}

interface DialogProps<P extends string> extends React.ComponentProps<typeof BaseCommand> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  page: P;
  onPageChange: (page: P) => void;
  rootPage?: P;
}

function Dialog<P extends string>({
  open,
  onOpenChange,
  page,
  onPageChange,
  rootPage = "root" as P,
  label,
  onKeyDown,
  children,
  ...props
}: DialogProps<P>) {
  const onSubPage = page !== rootPage;

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay cmdk-overlay="" />
        <RadixDialog.Content
          cmdk-dialog=""
          aria-describedby={undefined}
          onEscapeKeyDown={(e) => {
            if (!onSubPage) return;
            e.preventDefault();
            onPageChange(rootPage);
          }}
        >
          <RadixDialog.Title className="sr-only">{label}</RadixDialog.Title>
          <PageContext.Provider value={page}>
            <BaseCommand
              {...props}
              label={label}
              onKeyDown={(e) => {
                onKeyDown?.(e);
                if (e.defaultPrevented || !onSubPage) return;
                if (
                  e.key === "Backspace" &&
                  e.target instanceof HTMLInputElement &&
                  e.target.value === ""
                ) {
                  e.preventDefault();
                  onPageChange(rootPage);
                }
              }}
            >
              {children}
            </BaseCommand>
          </PageContext.Provider>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

function Page({ id, children }: React.PropsWithChildren<{ id: string }>) {
  const page = React.useContext(PageContext);
  return page === id ? children : null;
}

export const Command = Object.assign(
  (props: React.ComponentProps<typeof BaseCommand>) => <BaseCommand {...props} />,
  {
    Dialog,
    Page,
    Item,
    Input: BaseCommand.Input,
    List: BaseCommand.List,
    Empty: BaseCommand.Empty,
    Group: BaseCommand.Group,
    Separator: BaseCommand.Separator,
    Loading: BaseCommand.Loading,
  },
);
