// Free-Space/frontend/app/layout.tsx

import { Header } from "@/components/layout/header";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Free Space",
    description: "Free Hills Lab 2年グループで共有するリポジトリ",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                suppressHydrationWarning={true}>
                <div className="flex flex-col h-screen">
                    <Header />
                    <main className="flex-1 flex flex-col overflow-x-hidden  overflow-y-scroll relative px-8 py-8 min-w-0">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
