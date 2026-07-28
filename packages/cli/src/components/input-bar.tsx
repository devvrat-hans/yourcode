import type { KeyBinding } from "@opentui/core";
import { StatusBar } from "./status-bar";
import { colors } from "../theme/colors";

type Props = {
    onSubmit: (value: string) => void;
    disabled?: boolean;
}

export const TEXTAREA_KEYBINDINGS: KeyBinding[] = [
    { name: "return", action: "submit" },
    { name: "enter", action: "submit" },
    { name: "return", shift: true,action: "newline" },
    { name: "enter", shift: true,action: "newline" },
];

export function InputBar({ onSubmit, disabled }: Props) {
    return (
        <box width="100%" alignItems="center">
            <box
                border={["left"]}
                borderColor={colors.inputBarBlue}
            >
                <box
                    position="relative"
                    justifyContent="center"
                    paddingX={2}
                    paddingY={1}
                    backgroundColor={colors.inputBarBlack}
                    width="100%"
                    gap={1}
                > 
                    <textarea
                        focused={!disabled}
                        keyBindings={TEXTAREA_KEYBINDINGS}
                        placeholder={`Ask me anything... "Fix a bug in the database"`}
                    />
                    <StatusBar />
                </box>
            </box>
        </box>
    )
}