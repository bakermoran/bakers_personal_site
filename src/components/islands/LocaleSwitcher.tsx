import * as DropdownMenu from "./DropdownMenu";
import { ChevronDownIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

interface Props {
  currentLocale: string;
  localizedLinks: { href: string; code: string; name: string }[];
}

export default function LocaleSwitcher({ currentLocale, localizedLinks }: Props) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <GlobeAltIcon className="h-5 w-5" />
        <span className="hidden text-sm sm:inline">{currentLocale.toUpperCase()}</span>
        <ChevronDownIcon className="h-3 w-3 hidden sm:inline" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="end">
        {localizedLinks.map((lang) => (
          <DropdownMenu.Item key={lang.code} asChild>
            <a href={lang.href} aria-current={lang.code === currentLocale ? "page" : undefined}>
              {lang.name}
            </a>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
