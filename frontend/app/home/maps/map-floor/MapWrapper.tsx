// Free-Space/frontend/app/home/maps/map-floor/MapWrapper.tsx

"use client";

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
    return (
        <div className="max-w-6xl w-full mx-auto">
            <h2 className="text-2xl font-semibold pb-4">案内図 階層表現</h2>
            <ul className="pb-2 list-disc list-inside">
                <li>
                    マップ右下の階層ボタンを押すことで、表示する階層を切り替えることができます。
                </li>
                <li>表示する画像のサイズは統一していないと表示が不自然になります。</li>
            </ul>
            {/* マップ */}
            <DynamicMapView />
        </div>
    );
}
