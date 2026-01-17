# React-Leaflet 入門ガイド

## React-Leaflet とは

-   **Leaflet**: オープンソースの地図表示 JavaScript ライブラリ
-   **React-Leaflet**: Leaflet を React で使いやすくしたラッパーライブラリ
-   **特徴**: 軽量、シンプル、自前の画像を地図として扱える

---

## 1. 基本的なセットアップ

### 1-1. インストール

```bash
npm install leaflet react-leaflet
npm install -D @types/leaflet  # TypeScript使用時
```

### 1-2. ファイル構成例（Next.js App Router の場合）

3 ファイル必要

```
app/
└── map/
    ├── page.tsx         # ルーティング用（サーバーコンポーネント）
    ├── MapWrapper.tsx   # dynamic importの境界
    └── MapView.tsx      # Leaflet本体
```

---

## 2. Next.js での重要な注意点

### 2-1. なぜ特殊な構成が必要なのか

**問題**: Leaflet は `window` や `document` を使うため、サーバー側では動かない

（DOM を直接操作している）

```typescript
// ❌ これだけではエラーになる
import { MapContainer } from "react-leaflet";
```

**エラー例**:

```
ReferenceError: window is not defined
```

### 2-2. 解決策: dynamic import + ssr: false

#### MapWrapper.tsx

```typescript
"use client";

import dynamic from "next/dynamic";

// サーバー側では実行せず、クライアント側でのみロード（マップコンポーネントを動的にインポート）
const DynamicMapView = dynamic(() => import("./MapView"), {
    ssr: false, // ← これが重要
    loading: () => <p>地図を読み込んでいます...</p>,
});

export default function MapWrapper() {
    return (
        <div className="w-full">
            <h2 className="text-2xl font-semibold pb-4">案内図</h2>
            <DynamicMapView /> // ← ここにマップが表示される
        </div>
    );
}
```

#### page.tsx

```typescript
// "use client" は書かない（サーバーコンポーネントのまま）
import MapWrapper from "./MapWrapper";

export default function MapPage() {
    return <MapWrapper />;
}
```

**ポイント**:

-   `ssr: false` でサーバー側の実行をスキップ
-   `loading` でローディング中の表示を設定
-   SEO 用のページ構造はサーバー側で生成される

---

## 3. 主要な概念の解説

### 3-1. CRS（座標参照系）

#### CRS.Simple とは

-   **座標系**: ピクセル座標を直接使う（緯度経度ではない）
-   **用途**: 自前の画像、ゲームマップ、建物平面図など
-   **特徴**: 地球の丸さを考慮しない単純な座標系

```typescript
crs={CRS.Simple}  // ピクセル座標系
```

#### 他の選択肢

```typescript
crs={CRS.EPSG3857}  // Web Mercator（Google Maps等と同じ）
                    // 緯度・経度を使う
                    // 実際の地理データに適している
```

**使い分け**:

-   自前の画像 → `CRS.Simple`
-   実際の地図 → `CRS.EPSG3857`

---

### 3-2. bounds（境界）

#### 基本概念

**bounds** = 地図の矩形領域を定義する 2 点の座標

```typescript
const bounds: LatLngBoundsExpression = [
    [0, 0], // 左下の座標 [Y, X]
    [imgHeight, imgWidth], // 右上の座標 [Y, X]
];
```

#### 視覚的な理解

```
       X軸 幅
    ┌─────────────────┐ (imgHeight, imgWidth)
Y   │                 │
軸  │   [画像領域]     │
    |                 |
高  │                 │
さ  |                 |
    │                 │
    └─────────────────┘
(0, 0)
```

**重要**: Leaflet の座標は `[Y, X]` の順序（`[緯度(Latitude), 経度 (Longitude)]` の伝統的な慣習による）

---

### 3-3. maxBounds と maxBoundsViscosity

#### maxBounds

ユーザーがドラッグできる範囲の制限

```typescript
maxBounds = { bounds }; // 画像の外にドラッグできなくする
```

**効果**:

-   画像の外の空白領域が見えなくなる
-   ユーザーが迷子にならない

#### maxBoundsViscosity

境界に達したときの「抵抗の強さ」

```typescript
maxBoundsViscosity={1.0}  // 完全に固定（壁のように止まる）
maxBoundsViscosity={0.5}  // ある程度越えられるが引き戻される
maxBoundsViscosity={0.0}  // 制限なし（自由に動ける）
```

**体感的な違い**:

-   `1.0`: 壁に当たったような硬い感触
-   `0.5-0.8`: ゴムバンドで引っ張られる柔らかい感触（**推奨**）
-   `0.0`: 制限が実質的に無効

**UX 観点での推奨**:

```typescript
maxBoundsViscosity={0.7}  // 適度なレスポンスで操作感が良い
```

---

### 3-4. zoom（拡大・縮小）

```typescript
zoom={0}       // 初期表示の倍率
maxZoom={2}    // 最大4倍まで拡大可能（2^2 = 4倍）
minZoom={0}    // これ以上縮小できない
```

**zoom の計算**:

-   `zoom = 0` → 等倍
-   `zoom = 1` → 2 倍
-   `zoom = 2` → 4 倍
-   `zoom = -1` → 0.5 倍

---

## 4. 主要コンポーネント

### 4-1. MapContainer

地図全体のコンテナ

```typescript
<MapContainer
    crs={CRS.Simple} // 座標系
    center={[imgHeight / 2, imgWidth / 2]} // 初期表示の中心 [Y, X]
    zoom={0} // 初期ズームレベル
    maxZoom={2} // 最大ズーム（拡大）
    minZoom={0} // 最小ズーム（縮小）
    style={{ height: "100%", width: "100%" }}
    maxBounds={bounds} // ドラッグ範囲制限
    maxBoundsViscosity={0.7} // ドラッグ境界到達時の抵抗
    attributionControl={false} // デフォルトの権利表記をオフ
>
    {/* 子要素... */}
</MapContainer>
```

---

### 4-2. ImageOverlay

画像を地図として表示

```typescript
<ImageOverlay
    url="/campus_map.jpg" // 画像のパス（public配下）
    bounds={bounds} // 画像の表示範囲
    attribution="© Example" // 権利表記
/>
```

---

### 4-3. Marker

地図上にマーカーを配置

```typescript
<Marker
    position={[imgHeight / 2, imgWidth / 2]} // 配置位置 [Y, X]
    icon={customIcon} // カスタムアイコン
    eventHandlers={{
        click: handleMarkerClick("場所名"),
    }}
/>
```

#### カスタムアイコンの定義

```typescript
const customIcon = L.icon({
    iconUrl: "/marker-icon.png", // アイコン画像
    iconSize: [64, 64], // アイコンのサイズ [幅, 高さ]
    iconAnchor: [32, 32], // アイコンの基準点（中心の場合）
});
```

**iconAnchor の理解**:

-   ピンアイコン → `[幅/2, 高さ]` （先端が位置）
-   円形アイコン → `[幅/2, 高さ/2]` （中心が位置）

---

### 4-4. AttributionControl

権利表記の調整（初期状態は扱いにくいため）

```typescript
<AttributionControl
    position="bottomright" // 表示位置
    prefix={false} // "Leaflet"の表記を消す
/>
```

---

## 5. よくある実装パターン

---

### 5-1. レスポンシブ対応

```typescript
<div
    className="w-full border border-gray-200"
    style={{ aspectRatio: `${imgWidth} / ${imgHeight}` }}>
    <MapContainer style={{ height: "100%", width: "100%" }} {...他の属性}>
        {/* ... */}
    </MapContainer>
</div>
```

**ポイント**:

-   `aspectRatio` で画像の縦横比を維持
-   幅は親要素に合わせて自動調整

**備考**:

-   スマホ環境での使用感は要検証

---

## 6. トラブルシューティング

### 6-1. 地図が表示されない

#### 原因 1: CSS が読み込まれていない

```typescript
// MapView.tsx の先頭に必須
import "leaflet/dist/leaflet.css";
```

#### 原因 2: 高さが 0 になっている

```typescript
// MapContainer に明示的に高さを指定
<MapContainer style={{ height: "500px", width: "100%" }} {...}>
```

#### 原因 3: SSR エラー

```
ReferenceError: window is not defined
```

**解決策**: `dynamic` + `ssr: false` を使う（2 章参照）

---

### 6-2. マーカーが意図した位置に表示されない

#### 原因: [Y, X] の順序を間違えている

```typescript
// ❌ 間違い（幅, 高さ）
position={[imgWidth / 2, imgHeight / 2]}

// ✅ 正しい（高さ, 幅）
position={[imgHeight / 2, imgWidth / 2]}
```

**対策**: 変数名で明示する

```typescript
const markerY = imgHeight / 2;
const markerX = imgWidth / 2;
position={[markerY, markerX]}
```

---

### 6-3. 画像の外に空白が見える

#### 原因: maxBounds または maxBoundsViscosity の設定ミス

```typescript
// ✅ 正しい設定
maxBounds={bounds}
maxBoundsViscosity={1.0}  // または 0.5-0.8
```

---

## 7. 実装のベストプラクティス

### 7-1. 座標の管理

```typescript
// 定数を先に定義
const imgWidth = 1170;
const imgHeight = 696;

// bounds を再利用
const bounds: LatLngBoundsExpression = [
    [0, 0],
    [imgHeight, imgWidth],
];

// マーカー位置も計算で定義
const centerY = imgHeight / 2;
const centerX = imgWidth / 2;
```

---

### 7-2. アイコンの一元管理

```typescript
// icons.ts
import L from "leaflet";

export const icons = {
    entrance: L.icon({
        iconUrl: "/icons/entrance.png",
        iconSize: [48, 48],
        iconAnchor: [24, 24],
    }),
    library: L.icon({
        iconUrl: "/icons/library.png",
        iconSize: [48, 48],
        iconAnchor: [24, 24],
    }),
};
```

---

### 7-3. イベントハンドラの最適化

```typescript
// useCallback で再レンダリングを防ぐ
const handleMarkerClick = useCallback(
    // 引数はここ
    (place: string) => (): void => {
        // ここにクリック処理
    },
    [] // 依存配列が空 = 一度だけ生成
);
```

---

---

## 8. まとめ

### React-Leaflet が適している用途

✅ 自前の画像を地図として表示したい  
✅ シンプルなインタラクティブマップが必要  
✅ 軽量なライブラリを使いたい

### 押さえるべきポイント

1. **Next.js では `dynamic` + `ssr: false` が必須**
2. **座標は `[Y, X]` の順序**
3. **`CRS.Simple` でピクセル座標を使う**
4. **`maxBounds` で画像の外を隠す**
5. **`maxBoundsViscosity` で UX を調整**

### 参考リンク

-   [Leaflet 公式ドキュメント](https://leafletjs.com/)
-   [React-Leaflet 公式ドキュメント](https://react-leaflet.js.org/)
-   [Leaflet Tutorials](https://leafletjs.com/examples.html)

---

## 付録: 実装例

実際に動作するコードの完全版は、このリポジトリ内のページやコードを参照してください。

補足: アイコン等に使用しているあおるん（aorun）はマスコットキャラクターです。
