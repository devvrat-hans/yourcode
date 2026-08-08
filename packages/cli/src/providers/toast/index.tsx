import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { DEFAULT_TOAST_DURATION, type ToastOptions, type ToastVariant } from "./types";
import { useTerminalDimensions } from "@opentui/react";
import { colors } from "../../theme/colors";

export type ToastContextValue = {
    show: (options: ToastOptions) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
    const value = useContext(ToastContext);
    if(!value) {
        throw new Error("useToast must be used within a ToastProvider");
    }

    return value;
};

type ToastProviderProps = {
    children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
    const [currentToast, setCurrentToast] = useState<ToastOptions | null>(null);
    const timeoutHandleRef = useRef<NodeJS.Timeout | null>(null);

    const clearCurrentTimout = useCallback(() => {
        if(timeoutHandleRef.current) {
            clearTimeout(timeoutHandleRef.current);
            timeoutHandleRef.current = null;
        }
    }, []);

    const show = useCallback((options: ToastOptions) => {
        const duration = options.duration ?? DEFAULT_TOAST_DURATION;

        clearCurrentTimout();

        setCurrentToast({
            variant: options.variant ?? "info",
            ...options,
            duration,
        });

        timeoutHandleRef.current = setTimeout(() => {
            setCurrentToast(null);
        }, duration).unref();
    }, [clearCurrentTimout]);

    const value: ToastContextValue = {
        show,
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <Toast currentToast={currentToast} />
        </ToastContext.Provider>
    )
}

type ToastProps = {
  currentToast: ToastOptions | null;
};

function Toast({ currentToast }: ToastProps) {
  const { width } = useTerminalDimensions();

  if (!currentToast) {
    return null;
  }

  const variantColors: Record<ToastVariant, string> = {
    success: colors.success,
    error: colors.error,
    info: colors.info,
  };

  const borderColor = currentToast.variant
    ? variantColors[currentToast.variant]
    : variantColors.info;

  return (
    <box
      position="absolute"
      justifyContent="center"
      alignItems="flex-start"
      top={2}
      right={2}
      width={Math.max(1, Math.min(60, width - 6))}
      paddingLeft={2}
      paddingRight={2}
      paddingTop={1}
      paddingBottom={1}
      backgroundColor={colors.backgroundBlack}
      borderColor={borderColor}
      border={["left", "right"]}
    >
      <box flexDirection="column" gap={1} width="100%">
        <text fg={colors.toastText} wrapMode="word" width="100%">
          {currentToast.message}
        </text>
      </box>
    </box>
  );
};
