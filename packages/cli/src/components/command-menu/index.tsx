import { TextAttributes } from "@opentui/core";
import type { ScrollBoxRenderable } from "@opentui/core";
import { COMMANDS } from "./commands";
import type { RefObject } from "react";
import { getFilteredCommands } from "./filter-commands";
import { useTheme } from "../../providers/theme";

const MAX_VISIBLE_ITEMS = 10;

// The width of the command menu should accommodate the longest command name and description.
// Also the descriptions should start from the same horizontal position as the command names.
const COMMAND_COLUMN_WIDTH = Math.max(...COMMANDS.map((cmd) => cmd.name.length)) + 4;

type CommandMenuProps = {
    query: string;
    selectedIndex: number;
    scrollRef: RefObject<ScrollBoxRenderable | null>;
    onSelect: (index: number) => void;
    onExecute: (index: number) => void;
}

export function CommandMenu({
    query,
    selectedIndex,
    scrollRef,
    onSelect,
    onExecute,
}: CommandMenuProps) {
    const { colors } = useTheme();
    const filteredCommands = getFilteredCommands(query);
    const visibleCommands = Math.min(filteredCommands.length, MAX_VISIBLE_ITEMS);

    if(filteredCommands.length === 0) {
        return (
            <box paddingX={1}>
                <text attributes={TextAttributes.DIM}>
                    No matching commands found
                </text>
            </box>
        );
    }

    return (
        <scrollbox ref={scrollRef} height={visibleCommands}>
            {filteredCommands.map((cmd, index) => {
                const isSelected = index === selectedIndex;
                return (
                    <box
                        key={cmd.value}
                        flexDirection="row"
                        paddingX={1}
                        height={1}
                        overflow="hidden"
                        backgroundColor={isSelected ? colors.selection : undefined}
                        onMouseMove={() => onSelect(index)}
                        onMouseDown={() => onExecute(index)}
                    >
                        <box width={COMMAND_COLUMN_WIDTH} flexShrink={0}>
                            <text
                                selectable={false}
                                fg={isSelected ? "black" : "white"}
                            >
                                /{cmd.name}
                            </text>
                        </box>
                        <box flexGrow={1} flexShrink={1} overflow="hidden">
                            <text
                                selectable={false}
                                fg={isSelected ? "black" : "gray"}
                            >
                                {cmd.description}
                            </text>
                        </box>
                    </box>
                );
            })}
        </scrollbox>
    )

}