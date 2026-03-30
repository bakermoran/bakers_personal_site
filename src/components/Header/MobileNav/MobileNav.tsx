import * as React from "react";
import * as DropdownMenu from "@/components/ui/DropdownMenu";
import { Bars3Icon } from "@heroicons/react/24/solid/esm/index";
import { navigation } from "@/constants";

export default function MobileNav({ currentPath }: { currentPath: string }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="inline md:hidden">
        <Bars3Icon className="h-5 w-5" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="end">
        {navigation.map((item) => (
          <DropdownMenu.Item key={item.href} asChild>
            <a href={item.href} aria-current={item.href === currentPath ? "page" : undefined}>
              {item.name}
            </a>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
