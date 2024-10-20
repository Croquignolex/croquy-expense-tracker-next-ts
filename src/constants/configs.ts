export const ENV_APP = {
    name: process.env.NEXT_PUBLIC_APP_NAME,
    version: process.env.NEXT_PUBLIC_APP_VERSION,
    fullName: process.env.NEXT_PUBLIC_APP_FULL_NAME,
    author: process.env.NEXT_PUBLIC_APP_AUTHOR,
    authorUrl: process.env.NEXT_PUBLIC_APP_AUTHOR_URL,
    repo: process.env.NEXT_PUBLIC_APP_REPO,
    repoUrl: process.env.NEXT_PUBLIC_APP_REPO_URL,
};

export const ENV_API = {
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
};