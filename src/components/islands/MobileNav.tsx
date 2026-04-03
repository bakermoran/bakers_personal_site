import * as DropdownMenu from "./DropdownMenu";
import { Bars3Icon } from "@heroicons/react/24/solid/esm/index";
import { navigation } from "@/constants";
import { useTranslations } from "@/i18n/utils";
import type { ui } from "@/i18n/ui";

export default function MobileNav({
  currentPath,
  locale = "en",
}: {
  currentPath: string;
  locale?: keyof typeof ui;
}) {
  const t = useTranslations(locale);
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="inline md:hidden">
        <Bars3Icon className="h-5 w-5" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="end">
        {navigation.map((item) => (
          <DropdownMenu.Item key={item.href} asChild>
            <a href={item.href} aria-current={item.href === currentPath ? "page" : undefined}>
              {t(item.name)}
            </a>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
