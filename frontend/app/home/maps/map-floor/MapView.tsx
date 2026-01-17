// Free-Space/frontend/app/home/maps/map-floor/MapView.tsx
"use client";

import L, { CRS, LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useCallback, useState } from "react";
import { AttributionControl, ImageOverlay, MapContainer, Marker } from "react-leaflet";

export default function MapView() {
    // ============================================================
    // 【ステート管理】
    // 現在の階層を管理 (初期値: 1階)
    // ============================================================
    const [currentFloor, setCurrentFloor] = useState<number>(1);

    // 階層リスト定義 (表示順: 上から 4, 3, 2, 1)
    const floors = [4, 3, 2, 1];

    // ============================================================
    // 【マップ境界定義】
    // ============================================================

    // 画像サイズ設定(px)
    // ※ 4枚の画像サイズがすべて同じである前提
    const imgHeight: number = 696;
    const imgWidth: number = 1170;

    // 画像の境界（表示範囲）を定義
    const bounds: LatLngBoundsExpression = [
        [0, 0], // 画像の左下
        [imgHeight, imgWidth], // 画像の右上
    ];

    // ============================================================
    // 【マップアイコン定義】
    // ============================================================

    const aorun_icon = L.icon({
        iconUrl: "/mascot/aorun_normal.png",
        iconSize: [64, 64],
        iconAnchor: [32, 32],
    });

    const handleMarkerClick = useCallback(
        (place: string) => (): void => {
            alert(`${place}がクリックされました`);
        },
        []
    );

    return (
        <>
            {/* 親要素に relative を指定し、内部の絶対配置(ボタン)の基準とする */}
            <div
                className="w-full border border-gray-200 relative group"
                style={{ aspectRatio: `${imgWidth} / ${imgHeight}` }}>
                <MapContainer
                    crs={CRS.Simple}
                    center={[imgHeight / 2, imgWidth / 2]}
                    zoom={0}
                    minZoom={0} // 縮小の限界を0に固定
                    maxZoom={0} // 拡大の限界を0に固定
                    zoomControl={false} // デフォルトのズーム(+/-)ボタンを非表示
                    scrollWheelZoom={false} // マウスホイールでのズームを無効化
                    doubleClickZoom={false} // ダブルクリックでのズームを無効化
                    touchZoom={false} // タッチ操作でのズームを無効化
                    dragging={true} // ドラッグ（パン）移動は許可する
                    style={{ height: "100%", width: "100%", background: "#f9fafb" }} // 背景色を少しグレーにして画像読み込み時を目立たなくする
                    maxBounds={bounds}
                    maxBoundsViscosity={1.0}
                    attributionControl={false}>
                    <AttributionControl position="bottomleft" prefix={false} />

                    {/* 現在の階層 (currentFloor) に応じて画像を切り替え */}
                    {/* ※ テンプレートリテラルでパスを動的に生成（ファイル名に命名規則を持たせると可能） */}
                    <ImageOverlay
                        url={`/maps/map/ziyuu_floor_${currentFloor}.png`}
                        bounds={bounds}
                        attribution="© Free Space Map"
                    />

                    {/* マーカー */}
                    {/* ※ 必要であれば currentFloor === 1 の時だけ表示する等の条件分岐を追加可能 */}
                    <Marker
                        position={[imgHeight / 2, imgWidth / 2]}
                        icon={aorun_icon}
                        eventHandlers={{
                            click: handleMarkerClick(`${currentFloor}階の中央`),
                        }}
                    />
                </MapContainer>

                {/* 階層切り替えボタン (マップの上に重ねる) */}
                <div className="absolute bottom-4 right-4 z-1000 flex flex-col gap-1 bg-white p-1 rounded-lg shadow-md border border-gray-300">
                    {floors.map((floor) => (
                        <button
                            key={floor}
                            onClick={(e) => {
                                // 親要素(Map)へのクリック伝播を防ぐ（マップクリック判定防止）
                                e.stopPropagation();
                                setCurrentFloor(floor);
                            }}
                            className={`
                                w-10 h-10 flex items-center justify-center rounded font-bold transition-colors
                                ${
                                    currentFloor === floor
                                        ? "bg-blue-600 text-white" // 選択中のスタイル
                                        : "bg-white text-gray-700 hover:bg-gray-100" // 非選択時のスタイル
                                }
                            `}>
                            {floor}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
