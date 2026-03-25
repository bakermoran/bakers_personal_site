import * as React from "react";
import * as DropdownMenu from "@/components/ui/DropdownMenu";

interface Props {
  currentLocale: string;
  localizedLinks: { href: string; code: string; name: string }[];
}

export default function LocaleSwitcher({ currentLocale, localizedLinks }: Props) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
        <span className="hidden text-sm sm:inline">{currentLocale.toUpperCase()}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
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
