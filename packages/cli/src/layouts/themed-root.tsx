import type { ReactNode } from "react";
import { Header } from "../components/header";
import { InputBar } from "../components/input-bar";
import { useTheme } from "../providers/theme";

type Props = {
    children: ReactNode;
}

export function ThemedRoot({ children }: Props) {
  const {colors} = useTheme();
  return (
    <box
      flexGrow={1}
      backgroundColor={colors.background}
      width="100%"
      height="100%"
    >
      {children}
    </box>
  )
}