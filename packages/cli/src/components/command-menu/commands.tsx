import type { Command } from "./types";

export const COMMANDS: Command[] = [
    {
        name: "new",
        description: "Start a new conversation",
        value: "/new"
    },
    {
        name: "agents",
        description: "Switch agents",
        value: "/agents"
    },
    {
        name: "models",
        description: "Select AI model for generation",
        value: "/models"
    },
    {
        name: "sessions",
        description: "Browse past sessions",
        value: "/sessions"
    },
    {
        name: "theme",
        description: "Change theme color",
        value: "/theme"
    },
    {
        name: "login",
        description: "Log in to your account",
        value: "/login"
    },
    {
        name: "logout",
        description: "Log out of your account",
        value: "/logout"
    },
    {
        name: "login",
        description: "Log in to your account",
        value: "/login"
    },
    {
        name: "upgrade",
        description: "Upgrade your account",
        value: "/upgrade"
    },
    {
        name: "usage",
        description: "View your usage statistics",
        value: "/usage"
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