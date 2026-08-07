import { useTranslations } from "@/i18n/utils";
import * as DropdownMenu from "./DropdownMenu";
import { ChevronDownIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { ui } from "@/i18n/ui";

interface Props {
  currentLocale: keyof typeof ui;
  localizedLinks: { href: string; code: string; name: string }[];
}

export default function LocaleSwitcher({ currentLocale, localizedLinks }: Props) {
  const t = useTranslations(currentLocale);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="h-10" aria-label={t("selectLanguage")}>
        <GlobeAltIcon className="h-6 w-6" />
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
