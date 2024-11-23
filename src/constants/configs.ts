export const ENV_APP = {
    NAME: process.env.NEXT_PUBLIC_APP_NAME,
    VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
    FULL_NAME: process.env.NEXT_PUBLIC_APP_FULL_NAME,
    AUTHOR: process.env.NEXT_PUBLIC_APP_AUTHOR,
    AUTHOR_URL: process.env.NEXT_PUBLIC_APP_AUTHOR_URL,
    REPO: process.env.NEXT_PUBLIC_APP_REPO,
    REPO_URL: process.env.NEXT_PUBLIC_APP_REPO_URL,
} as const;

export const ENV_API = {
    BASE_URL: process.env.API_BASE_URL,
} as const;