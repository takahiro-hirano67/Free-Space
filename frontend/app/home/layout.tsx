"use client";

import { Header } from "@/components/layout/header";
import React from "react";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main className="flex-1 flex flex-col overflow-hidden relative px-6 py-8 min-w-0">
                {children}
            </main>
        </>
    );
}
