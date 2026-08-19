import type { KeyBinding, TextareaRenderable } from "@opentui/core";
import { StatusBar } from "./status-bar";
import { useCallback, useEffect, useRef } from "react";
import { useRenderer } from "@opentui/react";
import { useCommandMenu } from "./command-menu/use-command-menu";
import type { Command } from "./command-menu/types";
import { CommandMenu } from "./command-menu";
import { useToast } from "../providers/toast";
import { useKeyboardLayer } from "../providers/keyboard-layer";
import { useDialog } from "../providers/dialog";
import { useTheme } from "../providers/theme";

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
    const textareaRef = useRef<TextareaRenderable>(null);
    const onSubmitRef = useRef<() => void>(() => {});
    const renderer = useRenderer();
    const toast = useToast ();
    const dialog = useDialog();
    const { isTopLayer, setResponder } = useKeyboardLayer();
    const { colors } = useTheme();

    const {
        showCommandMenu,
        commandQuery,
        selectedIndex,
        scrollRef,
        handleContentChange,
        resolveCommand,
        setSelectedIndex
    } = useCommandMenu();

    const handleTextareaContentChange = useCallback(() => {
        const textarea = textareaRef.current;
        if(!textarea) return;

        handleContentChange(textarea.plainText);
    }, [])

    const handleSubmit = useCallback(() => {
        if(disabled) return;

        const textarea = textareaRef.current;
        if(!textarea) return;

        const text = textarea.plainText.trim();
        if(text.length === 0) return;

        onSubmit(text);
        textarea.setText("");
    }, [disabled, onSubmit]);

    const handleCommand = useCallback((
        command: Command | undefined
    ) => {
        const textarea = textareaRef.current;
        if(!textarea || !command) return;

        textarea.setText("");

        if(command.action) {
            command.action({
                exit: () => renderer.destroy(),
                toast,
                dialog
            });
        }
        else{
            textarea.insertText(command.value + " ");
        }
    }, [renderer, toast, dialog]);

    const handleCommandExecute = useCallback((
        index: number
    ) => {
        const command = resolveCommand(index);
        handleCommand(command);
    }, [resolveCommand, handleCommand]);

    // Initiate the textarea Submit Handler once so that it always reads the latest state
    useEffect(() => {
        const textarea = textareaRef.current;
        if(!textarea) return;

        textarea.onSubmit = () => {
            onSubmitRef.current();
        }
    }, []);


    onSubmitRef.current = () => {
        if(disabled) return;

        if(showCommandMenu) {
            const command = resolveCommand(selectedIndex);
            handleCommand(command);
            return;
        }

        handleSubmit();
    }

    // Register the base layer responder for the base layer dismissal via ctrl+c
    // TODO: Standardize a single hook combining both the useEffect and the setResponder call to avoid unnecessary re-renders and to ensure the latest state is always used
    useEffect(() => {
        setResponder("base", () => {
            if(disabled) return false;

            const textarea = textareaRef.current;
            if(textarea && textarea.plainText.length > 0) {
                textarea.setText("");
                return true;
            }
            return false;
        });
        return () => {
            setResponder("base", null);
        }
    }, [setResponder, disabled]);


    return (
        <box width="100%" alignItems="center">
            <box
                border={["left"]}
                borderColor={colors.primary}
                width="100%"
            >
                <box
                    position="relative"
                    justifyContent="center"
                    paddingX={2}
                    paddingY={1}
                    backgroundColor={colors.surface}
                    width="100%"
                    gap={1}
                >
                    {showCommandMenu && (
                        <box
                            position="absolute"
                            bottom="100%"
                            left={0}
                            width="100%"
                            backgroundColor={colors.surface}
                            zIndex={10}
                        >
                            <CommandMenu 
                                query={commandQuery}
                                selectedIndex={selectedIndex}
                                scrollRef={scrollRef}
                                onSelect={setSelectedIndex}
                                onExecute={handleCommandExecute}
                            />
                        </box>

                    )}
                    <textarea
                        ref={textareaRef}
                        focused={
                            !disabled && 
                            (isTopLayer("base") || isTopLayer("command"))
                        }
                        keyBindings={TEXTAREA_KEYBINDINGS}
                        onContentChange={handleTextareaContentChange}
                        placeholder={`Ask me anything... "Fix a bug in the database"`}
                    />
                    <StatusBar />
                </box>
            </box>
        </box>
    )
}