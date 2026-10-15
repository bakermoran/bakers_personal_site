import { Command } from "@/components/islands/Command";
import type { PageProps } from "../types";
import { socialLinks } from "@/content/socialLinks";
import { useTranslations } from "@/i18n/utils";

export const Contact = ({ close, lang }: PageProps) => {
  const t = useTranslations(lang);

  const open = (url: string) => {
    close();
    // mailto: would leave an empty tab behind if opened in a new window.
    if (url.startsWith("mailto:")) window.location.href = url;
    else window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Command.Page id="contact">
      <Command.Group heading={t("contact")}>
        {socialLinks.map(({ name, url }) => (
          <Command.Item key={name} onSelect={() => open(url)}>
            {name}
          </Command.Item>
        ))}
      </Command.Group>
    </Command.Page>
  );
};
