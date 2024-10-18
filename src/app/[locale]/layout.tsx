import type { Metadata } from "next";
import localFont from "next/font/local";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

import "@/src/assets/css/globals.css";
import Root from "@/src/app/[locale]/root";

const geistSans = localFont({
    src: "../../assets/fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "../../assets/fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: {
        default: 'Croquextra',
        template: '%s - Croquextra'
    },
    description: 'Croquy Expense Tracker',
}

export default async function RootLayout({children, params: {locale}}: Readonly<{children: React.ReactNode, params: {locale: string}}>) {
    // Providing all messages to the client
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-accent`}>
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
}
