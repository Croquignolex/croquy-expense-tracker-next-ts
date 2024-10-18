"use client"

import {APP} from "@/src/constants/configs";

export default function Footer({absolute = false} : {absolute: boolean}) {
    return (
        <footer className={`my-5 ml-5 bottom-0 ${absolute ? "absolute" : ""}`}>
            <p className="text-sm text-muted-foreground">
                Built by{" "}
                <a
                    href={APP.authorUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                >
                    {APP.author}
                </a>
                . The source code is available on{" "}
                <a
                    href={APP.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                >
                    {APP.repo}
                </a>
                .
            </p>
        </footer>
    );
};
