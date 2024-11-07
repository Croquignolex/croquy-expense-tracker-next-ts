export const ROUTES_APP = {
    LOGIN: "/login",
    HOME: "/home",
} as const;

export const ROUTES_API = {
    AUTH: {
        LOGIN: "/auth/login",
        REFRESH: "/auth/refresh",
    },
} as const;