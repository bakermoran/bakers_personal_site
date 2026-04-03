import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LocaleSwitcher from "@/components/islands/LocaleSwitcher";

const localizedLinks = [
  { href: "/", code: "en", name: "English" },
  { href: "/fr/", code: "fr", name: "Français" },
];

describe("LocaleSwitcher", () => {
  it("shows language options when clicked", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<LocaleSwitcher currentLocale="en" localizedLinks={localizedLinks} />);

    await user.click(screen.getByRole("button"));

    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Français")).toBeInTheDocument();
  });

  it("links to the correct locale URL", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<LocaleSwitcher currentLocale="en" localizedLinks={localizedLinks} />);

    await user.click(screen.getByRole("button"));

    const frLink = screen.getByText("Français").closest("a");
    expect(frLink).toHaveAttribute("href", "/fr/");
  });

  it("marks current locale with aria-current", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<LocaleSwitcher currentLocale="en" localizedLinks={localizedLinks} />);

    await user.click(screen.getByRole("button"));

    const enLink = screen.getByText("English").closest("a");
    expect(enLink).toHaveAttribute("aria-current", "page");

    const frLink = screen.getByText("Français").closest("a");
    expect(frLink).not.toHaveAttribute("aria-current");
  });
});
