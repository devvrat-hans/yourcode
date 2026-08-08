export type ToastVariant = "success" | "error" | "info";

export type ToastOptions = {
    message: string;
    variant?: ToastVariant;
    duration?: number;
};

export const DEFAULT_TOAST_DURATION = 3000;



