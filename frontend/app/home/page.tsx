// Continuum/frontend/app/home/page.tsx

"use client";

import { ChevronRight, Github, MapPin } from "lucide-react";
import Link from "next/link";

export default function Home() {
    // ============================================================
    // カテゴリリンク登録
    // ============================================================
    const categories = {
        // 地図機能
        maps: {
            title: "地図",
            color: "bg-blue-100 text-blue-700",
            links: [
                { icon: MapPin, label: "地図実験", id: "map", url: "/home/maps/map", target: "" },
            ],
        },
        // 外部リンク
        external: {
            title: "外部リンク",
            color: "bg-pink-100 text-pink-700",
            links: [
                {
                    icon: Github,
                    label: "GitHub",
                    id: "github",
                    url: "https://github.com",
                    target: "_blank",
                },
                {
                    icon: Github,
                    label: "リポジトリ",
                    id: "Repository",
                    url: "https://github.com/takahiro-hirano67/Free-Space.git",
                    target: "_blank",
                },
            ],
        },
    };

    return (
        <div className="flex-1 overflow-y-auto pb-32">
            {/* メインコンテンツ */}
            <div className="max-w-6xl mx-auto">
                {/* カテゴリリンク */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {Object.entries(categories).map(([key, category]) => (
                        <div key={key} className="space-y-2">
                            <div
                                className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold mb-3 ${category.color}`}>
                                {category.title}
                            </div>
                            <div className="space-y-1">
                                {category.links.map((link) => (
                                    <Link
                                        key={link.id}
                                        href={link.url}
                                        target={link.target}
                                        rel={
                                            link.target === "_blank"
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all group">
                                        <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                            <link.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                                            {link.label}
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
