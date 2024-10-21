import type { Metadata } from "next";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import {AbstractIntlMessages} from "use-intl";
import {Inter} from "next/font/google";
import clsx from "clsx";
import {ReactElement} from "react";

import "@/assets/css/globals.css";
import Root from "@/app/root";
import {LayoutPropsType} from "@/lib/types";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: {
        default: 'Croquextra',
        template: '%s - Croquextra'
    },
    description: 'Croquy Expense Tracker',
};

export default async function RootLayout({children}: LayoutPropsType): Promise<ReactElement> {
    // Providing all messages to the client
    const locale: string = await getLocale();
    const messages: AbstractIntlMessages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={clsx("antialiased bg-auto", inter.className)}>
                <NextIntlClientProvider messages={messages}>
                    <Root>
                        <div className="flex min-h-[100vh] flex-col">
                            {children}
                        </div>
                    </Root>
                </NextIntlClientProvider>
            </body>
        </html>
    );
};
