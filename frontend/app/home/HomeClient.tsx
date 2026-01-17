// Free-Space/frontend/app/home/HomeClient.tsx

"use client";

import MarkdownViewer from "@/components/markdown/MarkdownViewer";
import { ChevronDown, ChevronRight, Github, Map, MapPin, ZoomIn, TriangleRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// サーバーから受け取るデータの型定義
type Props = {
    readmeContent: string;
};

export default function HomeClient({ readmeContent }: Props) {
    const [displayReadme, setDisplayReadme] = useState<boolean>(false);

    // ============================================================
    // カテゴリリンク定義
    // ============================================================

    const categories = {
        maps: {
            title: "地図（React-Leaflet）",
            color: "bg-blue-100 text-blue-700",
            links: [
                {
                    icon: Map,
                    label: "基本形",
                    id: "map-basic",
                    url: "/home/maps/map-basic",
                    target: "",
                },
                {
                    icon: MapPin,
                    label: "ピン",
                    id: "map-pin",
                    url: "/home/maps/map-pin",
                    target: "",
                },
                {
                    icon: ZoomIn,
                    label: "ズーム",
                    id: "map-zoom",
                    url: "/home/maps/map-zoom",
                    target: "",
                },
                {
                    icon: TriangleRight,
                    label: "階層",
                    id: "map-floor",
                    url: "/home/maps/map-floor",
                    target: "",
                },
            ],
        },
        external: {
            title: "外部リンク",
            color: "bg-pink-100 text-pink-700",
            links: [
                {
                    icon: Github,
                    label: "リポジトリへのリンク",
                    id: "Repository",
                    url: "https://github.com/takahiro-hirano67/Free-Space.git",
                    target: "_blank",
                },
            ],
        },
    };

    return (
        <div className="flex-1 overflow-y-auto pb-32">
            <div className="max-w-6xl mx-auto">
                {/* カテゴリリンク表示 */}
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

                {/* README トグルボタンエリア */}
                <div className="flex flex-col max-w-54 mt-52 mb-6">
                    <button
                        onClick={() => setDisplayReadme(!displayReadme)}
                        className="flex items-center justify-start gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:text-blue-600 hover:border-blue-200 hover:shadow-sm transition-all duration-200">
                        {displayReadme ? (
                            <>
                                <ChevronDown className="w-4 h-4" />
                                README.md を閉じる
                            </>
                        ) : (
                            <>
                                <ChevronRight className="w-4 h-4" />
                                README.md を開く
                            </>
                        )}
                    </button>
                </div>

                {/* README表示エリア */}
                {displayReadme && (
                    <div className="bg-white p-6 rounded-xl border border-gray-200 animate-in fade-in slide-in-from-top-4 duration-300">
                        <h2 className="text-xl font-bold mb-4 text-gray-700 flex items-center gap-2">
                            README.md
                        </h2>
                        <hr className="mb-4" />
                        <MarkdownViewer content={readmeContent} />
                    </div>
                )}
            </div>
        </div>
    );
}
