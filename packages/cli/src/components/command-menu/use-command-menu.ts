import type { ScrollBoxRenderable } from "@opentui/core";
import type { Command } from "./types";
import { useState , useRef, useMemo } from "react";
import { getFilteredCommands } from "./filter-commands";
import { useKeyboard } from "@opentui/react";
import { useKeyboardLayer } from "../../providers/keyboard-layer";

type UseCommandMenuReturn = {
    showCommandMenu: boolean;
    commandQuery: string;
    selectedIndex: number;
    scrollRef: React.RefObject<ScrollBoxRenderable | null>;
    handleContentChange: (text: string) => void;
    resolveCommand: (index: number) => Command | undefined;
    setSelectedIndex: (index: number) => void;
}

export function useCommandMenu() : UseCommandMenuReturn {
    const [textValue, setTextValue] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showCommandMenu, setShowCommandMenu] = useState(false);
    const scrollRef = useRef<ScrollBoxRenderable>(null);
    const { push, pop, isTopLayer } = useKeyboardLayer();

    const commandQuery = showCommandMenu && textValue.startsWith("/") ? textValue.slice(1) : "";

    const filteredCommands = useMemo(() => getFilteredCommands(commandQuery), [commandQuery]);

    const handleContentChange = (text: string) => {
        setTextValue(text);
        setSelectedIndex(0);

        // Jump back to the top of the scrollbox when the user types a new character
        const scrollbox = scrollRef.current;
        if(scrollbox) {
            scrollbox.scrollTo(0);
        }

        const isSlashCommand = text.startsWith("/");
        const hasWhitespace = text.includes(" ");

        // TODO: standardize a single function called closeCommandMenu() that handles closing the command menu and popping the layer from the stack
        if(isSlashCommand && !hasWhitespace) {
            setShowCommandMenu(true);
            push("command", () => {
                setShowCommandMenu(false);
                pop("command");
                return true;
            });
        }
        else{
            setShowCommandMenu(false);
            pop("command");
        }
    }

    // Resolve a command at a specific index
    const resolveCommand = (index: number): Command | undefined => {
        const command = filteredCommands[index];
        if(command) {
            setShowCommandMenu(false);
            pop("command");
        }
        return command;
    }

    // Use of arrow keys to navigate the command menu
    useKeyboard((key) => {
        if(!showCommandMenu || !isTopLayer("command")) return;

        if(key.name === "escape") {
            key.preventDefault();
            setShowCommandMenu(false);
            pop("command");
        }
        else if(key.name === "up") {
            key.preventDefault();
            setSelectedIndex((i : number) => {
                const newIndex = Math.max(i - 1, 0);

                // Keep the highlighted command in view while using arrow keys on the edge of the scrollbox
                const sb = scrollRef.current;
                if(sb && newIndex < sb.scrollTop) {
                    sb.scrollTo(newIndex);
                }
                return newIndex;
            });
        }
        else if(key.name === "down") {
            key.preventDefault();
            setSelectedIndex((i : number) => {
                if(filteredCommands.length === 0) return 0;
                const newIndex = Math.min(i + 1, filteredCommands.length - 1);

                const sb = scrollRef.current;
                if(sb) {
                    const viewportHeight = sb.viewport.height;
                    const visibleEnd = sb.scrollTop + viewportHeight - 1;
                    if(newIndex > visibleEnd) {
                        sb.scrollTo(newIndex - viewportHeight + 1);
                    }
                    
                }
                return newIndex;
            });
        }
    });

    return {
        showCommandMenu,
        commandQuery,
        selectedIndex,
        scrollRef,
        handleContentChange,
        resolveCommand,
        setSelectedIndex
    };

};