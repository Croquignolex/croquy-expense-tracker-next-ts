import {useTranslations} from "next-intl";
import clsx from 'clsx';
import {FC, ReactElement} from "react";

import {ENV_APP} from "@/constants/configs";

type FooterPropsType = {
    absolute?: boolean,
};

const Footer: FC<FooterPropsType> = ({absolute = false}): ReactElement => {
    const t = useTranslations();

    return (
        <footer className={clsx({"my-5 ml-5 bottom-0" : true, "absolute": absolute})}>
            <p className="text-sm text-muted-foreground"
                dangerouslySetInnerHTML={{
                    __html: t.markup("footer.message", {
                        authorLink: (chunks: string): string => (`
                            <a href="${ENV_APP.AUTHOR_URL}" 
                                target="_blank"
                                rel="noreferrer"
                                class="font-medium underline underline-offset-4"
                            >
                                ${chunks}
                            </a>
                        `),
                        repoLink: (chunks: string): string => (`
                            <a href="${ENV_APP.REPO_URL}" 
                                target="_blank"
                                rel="noreferrer"
                                class="font-medium underline underline-offset-4"
                            >
                                ${chunks}
                            </a>
                        `),
                        author: ENV_APP.AUTHOR,
                        repo: ENV_APP.REPO
                    })
                }}
            />
        </footer>
    );
};

export {Footer};