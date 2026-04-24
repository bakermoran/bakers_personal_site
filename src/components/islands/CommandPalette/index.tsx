import { CommandPalette as CommandPaletteBase } from "./CommandPalette";
import { CommandPaletteProvider, type ContextProps } from "./Context";

export const CommandPalette = (props: ContextProps) => {
  return (
    <CommandPaletteProvider {...props}>
      <CommandPaletteBase />
    </CommandPaletteProvider>
  );
};
