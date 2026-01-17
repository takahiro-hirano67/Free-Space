// Free-Space/frontend/app/home/maps/map-pin/MapView.tsx

"use client";

import L, { CRS, LatLngBoundsExpression, LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useCallback, useState } from "react";
import { AttributionControl, ImageOverlay, MapContainer, Marker } from "react-leaflet";
import DirectionPad from "./DirectionPad";

export default function MapView() {
    // ============================================================
    // 【マップ境界定義】
    // ============================================================
    const imgWidth: number = 1170;
    const imgHeight: number = 696;

    // 貼り付ける画像の表示範囲（境界）を定義[Y, X]
    const bounds: LatLngBoundsExpression = [
        [0, 0], // 左下（原点）
        [imgHeight, imgWidth], // 右上（高さ最大, 幅最大）
    ];

    // ============================================================
    // 【マップアイコン定義】
    // ============================================================

    // public 配下の画像を使ってアイコンを定義（基本形）
    const aorun_icon = L.icon({
        iconUrl: "/mascot/aorun_normal.png",
        iconSize: [64, 64], // アイコンのサイズ
        iconAnchor: [32, 32], // アイコンの座標（アイコン画像内のどのピクセル位置かを示す。ピン→先端, 画像→中央）
    });

    // アイコン定義を一元管理（オブジェクト化しておくと楽に利用できる）
    const icons = {
        aorun_feel_up: L.icon({
            iconUrl: "/mascot/aorun_feel_up.png",
            iconSize: [64, 64],
            iconAnchor: [32, 32],
        }),
        aorun_feel_down: L.icon({
            iconUrl: "/mascot/aorun_feel_down.png",
            iconSize: [32, 32],
            iconAnchor: [16, 16],
        }),
        aorun_question: L.icon({
            iconUrl: "/mascot/aorun_question.png",
            iconSize: [64, 64],
            iconAnchor: [32, 32],
        }),
        soccer_ball: L.icon({
            iconUrl: "/maps/icons/soccer_ball.png",
            iconSize: [32, 32],
            iconAnchor: [16, 16],
        }),
    };

    // クリックハンドラ
    const handleMarkerClick = useCallback(
        (place: string) => (): void => {
            alert(`${place}がクリックされました`);
        },
        []
    );

    // ============================================================
    // 【移動アイコン関係】
    // ============================================================

    // 初期位置（中央下）
    const initialPositionX = imgWidth / 2;
    const initialPositionY = 50;

    // 方向入力
    const [selfPosition, setSelfPosition] = useState({
        x: initialPositionX,
        y: initialPositionY,
    });

    const handleMoveMarkerClick = useCallback(
        (e: LeafletMouseEvent) => {
            const { lat, lng } = e.latlng;
            alert(`現在の座標: [Y:${selfPosition.y}, X:${selfPosition.x}]`);
        },
        [selfPosition]
    );

    // 方向ボタン用
    const handleControlButtonClick = (direction: "up" | "down" | "left" | "right") => {
        setSelfPosition((prev) => {
            switch (direction) {
                case "right":
                    return { ...prev, x: prev.x + 10 };
                case "left":
                    return { ...prev, x: prev.x - 10 };
                case "up":
                    return { ...prev, y: prev.y + 10 };
                case "down":
                    return { ...prev, y: prev.y - 10 };
                default:
                    return prev;
            }
        });
    };

    return (
        <div className="w-full h-full flex flex-col">
            {/* Map */}
            <div
                className="w-full border border-gray-200"
                style={{ aspectRatio: `${imgWidth} / ${imgHeight}` }}>
                <MapContainer
                    crs={CRS.Simple} // ピクセル座標系指定
                    center={[imgHeight / 2, imgWidth / 2]} // マップの中央を指定
                    zoom={0} // 拡大・縮小初期値
                    maxZoom={2} // 拡大段階
                    minZoom={0} // 縮小段階
                    style={{ width: "100%", height: "100%" }} // 明示的に高さと幅を指定
                    maxBounds={bounds} // ドラッグ移動範囲制限
                    maxBoundsViscosity={0.6} // 境界に達したときの抵抗の強さ
                    attributionControl={false} // デフォルトの権利表記をオフ
                >
                    {/* 権利表記の調整（右下・初期挿入なし） */}
                    <AttributionControl position="bottomright" prefix={false} />
                    {/* 表示画像 */}
                    <ImageOverlay url="/maps/map/campus_map.jpg" bounds={bounds} attribution="© Example" />
                    {/* 左下（原点） */}
                    <Marker
                        position={[0, 0]}
                        icon={icons.aorun_feel_up}
                        eventHandlers={{
                            click: handleMarkerClick("左下のあおるん"),
                        }}
                    />
                    {/* 左上 */}
                    <Marker
                        position={[imgHeight, 0]}
                        icon={icons.aorun_question}
                        eventHandlers={{
                            click: handleMarkerClick("左上のあおるん"),
                        }}
                    />
                    {/* 中央 */}
                    <Marker
                        position={[imgHeight / 2, imgWidth / 2]}
                        icon={aorun_icon}
                        // イベントハンドラ登録（クリックなど）
                        eventHandlers={{
                            click: handleMarkerClick("中央のあおるん"),
                        }}
                    />
                    {/* 右下 */}
                    <Marker
                        position={[0, imgWidth]}
                        icon={icons.aorun_question}
                        eventHandlers={{
                            click: handleMarkerClick("右下のあおるん"),
                        }}
                    />
                    {/* 右上 */}
                    <Marker
                        position={[imgHeight, imgWidth]}
                        icon={icons.aorun_feel_up}
                        eventHandlers={{
                            click: handleMarkerClick("右上のあおるん"),
                        }}
                    />
                    {/* 池の中 */}
                    <Marker
                        position={[375, 260]}
                        icon={icons.aorun_feel_down}
                        eventHandlers={{
                            click: handleMarkerClick("池の中のあおるん"),
                        }}
                    />
                    {/* サッカー場 */}
                    <Marker
                        position={[430, 775]}
                        icon={icons.soccer_ball}
                        eventHandlers={{
                            click: handleMarkerClick("サッカー場"),
                        }}
                    />
                    {/* 中央下（移動するあおるん） */}
                    <Marker
                        position={[selfPosition.y, selfPosition.x]}
                        icon={aorun_icon}
                        eventHandlers={{
                            click: handleMoveMarkerClick,
                        }}
                    />
                </MapContainer>
            </div>
            {/* コントロール */}
            <div className="flex justify-center py-4">
                <DirectionPad onMove={handleControlButtonClick} />
            </div>
        </div>
    );
}
