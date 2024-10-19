"use client"

import {useTranslations} from "next-intl";

import {APP} from "@/constants/configs";

export default function Footer({absolute = false} : {absolute: boolean}) {
    const t = useTranslations();

    return (
        <footer className={`my-5 ml-5 bottom-0 ${absolute ? "absolute" : ""}`}>
            <p className="text-sm text-muted-foreground"
                dangerouslySetInnerHTML={{
                    __html: t.markup("footer.message", {
                        authorLink: (chunks: string): string => (`
                            <a href="${APP.authorUrl}" 
                                target="_blank"
                                rel="noreferrer"
                                class="font-medium underline underline-offset-4"
                            >
                                ${chunks}
                            </a>
                        `),
                        repoLink: (chunks: string): string => (`
                            <a href="${APP.repoUrl}" 
                                target="_blank"
                                rel="noreferrer"
                                class="font-medium underline underline-offset-4"
                            >
                                ${chunks}
                            </a>
                        `),
                        author: APP.author,
                        repo: APP.repo
                    })
                }}
            />
        </footer>
    );
};
