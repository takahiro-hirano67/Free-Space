// Free-Space/frontend/app/home/maps/map-zoom/MapView.tsx

"use client";

import L, { CRS, LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useCallback, useState } from "react";
import {
    AttributionControl,
    ImageOverlay,
    MapContainer,
    Marker,
    useMapEvents,
} from "react-leaflet";
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

    // アイコン定義を一元管理
    const icons = {
        aorun_normal: L.icon({
            iconUrl: "/mascot/aorun_normal.png",
            iconSize: [64, 64],
            iconAnchor: [32, 32],
        }),
        aorun_feel_up: L.icon({
            iconUrl: "/mascot/aorun_feel_up.png",
            iconSize: [32, 32],
            iconAnchor: [16, 16],
        }),
        aorun_question: L.icon({
            iconUrl: "/mascot/aorun_question.png",
            iconSize: [32, 32],
            iconAnchor: [16, 16],
        }),
        aorun_feel_down: L.icon({
            iconUrl: "/mascot/aorun_feel_down.png",
            iconSize: [32, 32],
            iconAnchor: [16, 16],
        }),
        soccer_ball: L.icon({
            iconUrl: "/maps/icons/soccer_ball.png",
            iconSize: [32, 32],
            iconAnchor: [16, 16],
        }),
    };

    // クリックハンドラ（引数）
    const handleMarkerClick = useCallback(
        (place: string) => (): void => {
            alert(`${place}がクリックされました`);
        },
        []
    );

    // ズームを監視するコンポーネント
    function ZoomWatcher({ onZoomChange }: { onZoomChange: (zoom: number) => void }) {
        useMapEvents({
            zoomend: (e) => {
                onZoomChange(e.target.getZoom());
            },
        });
        return null;
    }

    // ズームを監視するState
    const [zoomLevel, setZoomLevel] = useState(0);

    return (
        <>
            {/* w-full で幅いっぱいにしつつ、高さは「画像の比率」に自動計算させる */}
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
                    maxBoundsViscosity={1.0} // 境界に達したときの抵抗の強さ（固定）
                    attributionControl={false} // デフォルトの権利表記をオフ
                >
                    {/* 権利表記の調整（右下・初期挿入なし） */}
                    <AttributionControl position="bottomright" prefix={false} />
                    {/* 表示画像 */}
                    <ImageOverlay url="/campus_map.jpg" bounds={bounds} attribution="© Example" />
                    {/* zoom 監視 */}
                    <ZoomWatcher onZoomChange={setZoomLevel} />
                    {/* 画像切り替え */}
                    {zoomLevel < 1 ? (
                        <>
                            {/* 大学全体 */}
                            <ImageOverlay url="/maps/map/campus_map.jpg" bounds={bounds} />
                            {/* アイコンもズームレベルに合わせて変更可能 */}
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
                        </>
                    ) : (
                        <>
                            {/* 自由ヶ丘キャンパス */}
                            <ImageOverlay url="/maps/map/campus_map_ziyuu.png" bounds={bounds} />
                        </>
                    )}

                    {/* 中央（共通アイコン） */}
                    <Marker
                        position={[imgHeight / 2, imgWidth / 2]}
                        icon={icons.aorun_normal}
                        // イベントハンドラ登録（クリックなど）
                        eventHandlers={{
                            click: handleMarkerClick("中央"),
                        }}
                    />
                </MapContainer>
            </div>
        </>
    );
}
