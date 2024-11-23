import type { Metadata } from "next";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import {AbstractIntlMessages} from "use-intl";
import {Inter} from "next/font/google";
import clsx from "clsx";
import {ReactElement} from "react";
import {ThemeProvider} from "next-themes";

import {Toaster} from "@/components/ui/toaster";
import {LayoutPropsType} from "@/lib/types";
import {ClientProvider} from "@/app/provider";

import "@/assets/css/globals.css";

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
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                        <ClientProvider>
                            <div className="flex min-h-[100vh] flex-col">
                                <Toaster />
                                {children}
                            </div>
                        </ClientProvider>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
};
