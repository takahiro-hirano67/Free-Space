// Free-Space/frontend/app/home/maps/map-basic/MapWrapper.tsx

/**
 * このファイルの役割:
 * - Leafletはwindow/documentに依存するため、サーバーサイドでは動作しない
 * - dynamic importでMapViewをクライアント専用として読み込む
 * - page.tsxはサーバーコンポーネントとして、SEO対策やメタデータ設定を担当
 **/

"use client";

import MarkdownViewer from "@/components/markdown/MarkdownViewer"; // ドキュメント表示用
import { useMarkdown } from "@/hooks/useMarkdown"; // ドキュメント表示用
import { CopyButton } from "@/components/ui/CopyButton"; // ドキュメントコピー用
import dynamic from "next/dynamic";

// MapView をクライアント側だけで読み込む
const DynamicMapView = dynamic(() => import("./MapView"), {
    ssr: false,
    loading: () => (
        <div
            className="w-full border border-gray-200 flex items-center justify-center"
            style={{ aspectRatio: "1170 / 696" }} // 地図と同じアスペクト比を維持（レイアウトシフト防止）
        >
            <div className="text-center">
                {/* スピナーアニメーションとローディング表記 */}
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4" />
                <p className="text-gray-600">地図を読み込んでいます...</p>
            </div>
        </div>
    ),
});

// メインコンポーネント
export default function MapWrapper() {
    const { content, loading, error } = useMarkdown("/docs/maps/React-Leaflet-Guide.md"); // ドキュメント表示用

    return (
        <div className="max-w-6xl w-full mx-auto">
            <h2 className="text-2xl font-semibold pb-4">案内図 基本</h2>
            <ul className="pb-2 list-disc list-inside">
                <li>拡大・縮小が可能です。</li>
                <li>ドラッグすることで移動可能です。（パン操作）</li>
                <li>マップの領域外までパン操作すると、抵抗とともに元に戻る挙動をします。</li>
                <li>アイコンをクリックすることで、その場所を表示するalertが出現します。</li>
            </ul>
            {/* マップ */}
            <DynamicMapView />
            {/* ドキュメント表示 */}
            <div className="bg-white mt-32 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-700">
                        資料
                    </h2>
                    <CopyButton text={content} label="全文をコピー" />
                </div>
                <hr className="mb-4" />
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {content && <MarkdownViewer content={content} />}
            </div>
        </div>
    );
}
