import type { Metadata } from "next";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import {AbstractIntlMessages} from "use-intl";

import "@/assets/css/globals.css";
import Root from "@/app/root";

export const metadata: Metadata = {
    title: {
        default: 'Croquextra',
        template: '%s - Croquextra'
    },
    description: 'Croquy Expense Tracker',
};

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode}>): Promise<unknown> {
    // Providing all messages to the client
    const locale: string = await getLocale();
    const messages: AbstractIntlMessages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className="antialiased bg-accent">
                <NextIntlClientProvider messages={messages}>
                    <Root>
                        <div className={"font-[family-name:var(--font-geist-sans)]"}>
                            {children}
                        </div>
                    </Root>
                </NextIntlClientProvider>
            </body>
        </html>
    );
};
