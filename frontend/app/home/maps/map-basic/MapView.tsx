// Free-Space/frontend/app/home/maps/map-basic/MapView.tsx

"use client";

import L, { CRS, LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useCallback } from "react";
import { AttributionControl, ImageOverlay, MapContainer, Marker } from "react-leaflet";

export default function MapView() {
    // ============================================================
    // 【マップ境界定義】
    // - bounds（境界） は、地図上の矩形の領域を定義するもの。左下と右上の2点の座標で表現される。
    // - Leafletでは実際の地理座標（緯度・経度）を使うが、CRS.Simple を使用しているため、ピクセル座標として扱われる。
    // 緯度 (Latitude) , 経度 (Longitude) ※ 地理座標の伝統的な表記順序
    //  ↓                 ↓
    // Y軸               X軸
    // ============================================================

    // 画像サイズ設定(px)
    const imgHeight: number = 696; // 高さ(Y)
    const imgWidth: number = 1170; // 幅(X)

    // 画像の境界（表示範囲）を定義（bounds = 境界）
    const bounds: LatLngBoundsExpression = [
        [0, 0], // 画像の左下（原点）
        [imgHeight, imgWidth], // 画像の右上（Y: 696, X: 1170）
    ];

    // ============================================================
    // 【マップアイコン定義】
    // ============================================================

    // public 配下の画像を使ってアイコンを定義
    const aorun_icon = L.icon({
        iconUrl: "/mascot/aorun_normal.png",
        iconSize: [64, 64], // アイコンのサイズ
        iconAnchor: [32, 32], // アイコンの判定座標（アイコン画像内のどのピクセル位置かを示す。ピン→先端, 画像→中央）
    });

    // クリックハンドラ（引数）
    const handleMarkerClick = useCallback(
        (place: string) => (): void => {
            alert(`${place}がクリックされました`);
        },
        []
    );

    return (
        <>
            {/* w-full で幅いっぱいにしつつ、高さは「画像の比率」に自動計算させる */}
            <div
                className="w-full border border-gray-200"
                style={{ aspectRatio: `${imgWidth} / ${imgHeight}` }}>
                <MapContainer
                    crs={CRS.Simple} // ピクセル座標系を指定（平面図は地球の曲率を考慮する必要がない）
                    center={[imgHeight / 2, imgWidth / 2]} // マップの中央を指定
                    zoom={0} // 拡大・縮小初期値
                    maxZoom={2} // 拡大段階(0～プラス, 1の時→2倍に拡大)
                    minZoom={0} // 縮小段階(マイナス～0, -1の時→0.5倍に縮小) ※ PCなら0, スマホなら-1が丁度いい?
                    style={{ height: "100%", width: "100%" }} // 明示的に高さと幅を指定
                    maxBounds={bounds} // ユーザーがパン（ドラッグ移動）できる範囲の制限 --> ユーザーは `bounds` で定義された範囲の外にはドラッグできなくなる
                    maxBoundsViscosity={0.6} // 境界に達したときの抵抗の強さ（1.0: 固定, 0.5: 小さい抵抗, 0.0: 抵抗なし）/ 1.0未満 --> 境界を少し越えられるが、手を離すと戻る
                    attributionControl={false} // デフォルトの権利表記をオフ
                >
                    {/* 権利表記の調整（右下・初期挿入なし） */}
                    <AttributionControl position="bottomright" prefix={false} />
                    {/* 表示画像 */}
                    <ImageOverlay
                        url="/maps/map/campus_map.jpg" // パス
                        bounds={bounds} // 境界
                        attribution="© Example" // 権利表記
                        // 読み込み時のエラーハンドリング
                        eventHandlers={{
                            error: () => console.error("画像の読み込みに失敗しました"),
                        }}
                    />

                    {/* マーカー（中央） */}
                    <Marker
                        position={[imgHeight / 2, imgWidth / 2]} // マップ内の配置座標
                        icon={aorun_icon} // 表示アイコン
                        eventHandlers={{
                            click: handleMarkerClick("中央"),
                        }}
                    />
                </MapContainer>
            </div>
        </>
    );
}

// メモ
// CRS (Coordinate Reference System) = 座標参照系
