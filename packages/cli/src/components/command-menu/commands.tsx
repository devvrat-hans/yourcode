import type { Command } from "./types";

export const COMMANDS: Command[] = [
    {
        name: "new",
        description: "Start a new conversation",
        value: "/new",
        action: (ctx) => {
            ctx.toast.show({
                message: "Starting a new conversation...",
                variant: "info",
            });
        }
    },
    {
        name: "agents",
        description: "Switch agents",
        value: "/agents",
        action: (ctx) => {
            ctx.dialog.open({
                title: "Switch Mode",
                children: <text>Agent selection coming soon...</text>
            });
        }
    },
    {
        name: "models",
        description: "Select AI model for generation",
        value: "/models",
        action: (ctx) => {
            ctx.dialog.open ({
                title: "Select Model",
                children: <text>Model selection coming soon...</text>
            });
        }
    },
    {
        name: "sessions",
        description: "Browse past sessions",
        value: "/sessions",
        action: (ctx) => {
            ctx.toast.show({
                message: "Loading past sessions...",
                variant: "info",
            });
        }
    },
    {
        name: "theme",
        description: "Change theme color",
        value: "/theme",
        action: (ctx) => {
            ctx.toast.show({
                message: "Opening theme picker...",
                variant: "info",
            });
        }
    },
    {
        name: "login",
        description: "Log in to your account",
        value: "/login",
        action: (ctx) => {
            ctx.toast.show({
                message: "Logging in...",
                variant: "info",
            });
        }
    },
    {
        name: "logout",
        description: "Log out of your account",
        value: "/logout",
        action: (ctx) => {
            ctx.toast.show({
                message: "Logging out...",
                variant: "info",
            });
        }
    },
    {
        name: "login",
        description: "Log in to your account",
        value: "/login",
        action: (ctx) => {
            ctx.toast.show({
                message: "Logging in...",
                variant: "info",
            });
        }
    },
    {
        name: "upgrade",
        description: "Upgrade your account",
        value: "/upgrade",
        action: (ctx) => {
            ctx.toast.show({
                message: "Upgrading account...",
                variant: "info",
            });
        }
    },
    {
        name: "usage",
        description: "View your usage statistics",
        value: "/usage",
        action: (ctx) => {
            ctx.toast.show({
                message: "Viewing usage statistics...",
                variant: "info",
            });
        }
    },
    {
        name: "exit",
        description: "Quit the application",
        value: "/exit",
        action: (ctx) => {
            ctx.exit();
        }
    },

];