"use client";

import { Play } from "lucide-react";
import Link from "next/link";

export const Header = () => {
    return (
        <header
            className="flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-200/70 shadow-2xs z-50 transition-all duration-300"
            style={{ height: "52px" }}>
            <div className="flex items-center gap-2">
                {/* ロゴ部分 */}
                <Link href="/home" className="flex items-center gap-2 ml-2">
                    <div className="w-7 h-7 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Play className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-gray-600">FreeHillsLab / FreeSpace</span>
                </Link>
            </div>
        </header>
    );
};
