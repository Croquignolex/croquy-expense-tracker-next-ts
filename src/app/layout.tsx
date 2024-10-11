import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/src/assets/css/globals.css";
import Root from "@/src/app/root";

const geistSans = localFont({
    src: "../assets/fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "../assets/fonts/GeistMonoVF.woff",
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

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Root>
                    <div className={"font-[family-name:var(--font-geist-sans)]"}>
                        {children}
                    </div>
                </Root>
            </body>
        </html>
    );
}
