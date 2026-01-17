// Free-Space/frontend/app/home/maps/map-zoom/MapWrapper.tsx

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

export default function MapWrapper() {
    return (
        <div className="max-w-6xl w-full mx-auto">
            <h2 className="text-2xl font-semibold pb-4">案内図 ズーム</h2>
            <DynamicMapView />
        </div>
    );
}
