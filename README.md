# Free-Space

仲間内で知識を共有するためのリポジトリです。

ライブラリのお試しや技術的に可能かどうかの検証も行います。

ここに書いてあるソースコード等は、フリーヒルズラボのメンバーであれば自由にコピーしていただいて構いません。

---

## 概要

### リポジトリのセットアップ

```bash
git clone https://github.com/takahiro-hirano67/Free-Space.git
cd frontend
npm install
cd ../
npm run dev
```

（下記のパッケージインストールコマンドは、別プロジェクトで利用する際の参考用）

---

### 新しいページを作成したい時について

新しいページを作成したい時は、Next App Router のディレクトリ構成に基づき
`frontend/app/home/〇〇/page.tsx` に記述するだけで既存コードに影響を与えず実装可能です。
お気軽にお試しください。

---

### backend ディレクトリについて

将来的に python でも同様に検証を行う可能性も考慮し、ディレクトリのみ作成しています。（今は中身なし）

---

## インストールしているライブラリについて

プロジェクト作成後に `npm install 〇〇` とインストールしたライブラリ記述していきます。
（都度追記）

明示的にライブラリ別で 1 行ずつ記述しています。
（分かりやすいよう一括インストールコマンドは避けています）

---

### 地図ライブラリ

#### Leaflet

Web ブラウザ上で動作する軽量なオープンソースの JavaScript ライブラリ

ズーム、パン、マーカー、ポリゴン、ポップアップなどの基本的な地図操作をシンプルに実装できる

##### インストールコマンド

```bash
npm install leaflet
npm install react-leaflet
npm install -D @types/leaflet
```

---

### アイコンライブラリ

#### Lucide-React

オープンソースアイコンライブラリで、1000 種類以上の軽量な SVG アイコンを提供し、カスタマイズが容易。

##### インストールコマンド

```bash
npm install lucide-react
```

---

### Markdown 表示関連

#### React-Markdown

React で Markdown（# 見出し や **太字** などの記法）を HTML として表示するための
React コンポーネント／ライブラリで、ブログやドキュメントビューア、
リアルタイムプレビュー付きエディタによく使われる。

-   **Markdown の解析（Remark）**
-   **HTML への変換（Rehype）**
-   **描画（React Components）**

##### インストールコマンド

```bash
npm install react-markdown
```

---

#### 関連プラグイン等

| カテゴリ            | プラグイン / ライブラリ         | 説明                                                                                                                                                             |
| ------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 機能の拡張          | remark-gfm                      | GitHub Flavored Markdown に対応させるプラグイン。標準の Markdown にはない「表（テーブル）」「打ち消し線」などが利用可能。                                        |
| 機能の拡張          | remark-breaks                   | 標準の Markdown では行末にスペース 2 つが必要な改行を、Enter キーでの改行をそのまま `<br>` タグとして扱えるようにする。                                          |
| 機能の拡張          | remark-github-blockquote-alert  | GitHub で採用されている `> [!NOTE]` や `> [!WARNING]` といった記述を表示できるようにする。                                                                       |
| 数式の表示          | remark-math                     | Markdown 内の `$E=mc^2$` や `$$...$$` といった数式記法を認識させるためのプラグイン。                                                                             |
| 数式の表示          | rehype-katex                    | `remark-math` で認識された数式を、KaTeX ライブラリを使ってブラウザ上で綺麗に表示できる HTML/CSS に変換する。                                                     |
| コードと図の描画    | react-syntax-highlighter        | コードブロック内のコードを、言語に合わせてシンタックスハイライト表示するライブラリ。                                                                             |
| コードと図の描画    | mermaid                         | テキストベースでフローチャートなどの図を描画できるライブラリ。                                                                                                   |
| コードと図の描画    | @types/react-syntax-highlighter | `react-syntax-highlighter` を TypeScript 環境で使用するための型定義ファイル（開発時のみ使用）。                                                                  |
| HTML の直接埋め込み | rehype-raw                      | Markdown 内に記述された生の HTML タグを、そのまま HTML として出力できるようにする（※XSS などのセキュリティリスクに注意が必要。信頼できるコンテンツでのみ使用）。 |

(XSS: クロスサイトスクリプティング)

##### インストールコマンド

```bash
npm install mermaid
npm install rehype-katex
npm install rehype-raw
npm install remark-breaks
npm install remark-gfm
npm install remark-github-blockquote-alert
npm install remark-math
npm install react-syntax-highlighter
npm i --save-dev @types/react-syntax-highlighter
```

---

## ディレクトリ構造

```
Free-Space
├─ backend
│  ├─ .python-version
│  ├─ main.py
│  └─ pyproject.toml
├─ frontend
│  ├─ app
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ home
│  │  │  ├─ HomeClient.tsx
│  │  │  ├─ maps
│  │  │  │  ├─ map-basic
│  │  │  │  │  ├─ MapView.tsx
│  │  │  │  │  ├─ MapWrapper.tsx
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ map-floor
│  │  │  │  │  ├─ MapView.tsx
│  │  │  │  │  ├─ MapWrapper.tsx
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ map-pin
│  │  │  │  │  ├─ DirectionPad.tsx
│  │  │  │  │  ├─ MapView.tsx
│  │  │  │  │  ├─ MapWrapper.tsx
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ map-zoom
│  │  │  │     ├─ MapView.tsx
│  │  │  │     ├─ MapWrapper.tsx
│  │  │  │     └─ page.tsx
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components
│  │  ├─ layout
│  │  │  └─ header.tsx
│  │  ├─ markdown
│  │  │  ├─ MarkdownViewer.tsx
│  │  │  ├─ markdown_style.css
│  │  │  └─ Mermaid.tsx
│  │  └─ ui
│  │     └─ CopyButton.tsx
│  ├─ eslint.config.mjs
│  ├─ hooks
│  │  └─ useMarkdown.ts
│  ├─ next.config.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.mjs
│  ├─ public
│  │  ├─ docs
│  │  │  └─ maps
│  │  │     └─ React-Leaflet-Guide.md
│  │  ├─ maps
│  │  │  ├─ icons
│  │  │  │  └─ soccer_ball.png
│  │  │  └─ map
│  │  │     ├─ campus_map.jpg
│  │  │     ├─ campus_map_ziyuu.png
│  │  │     ├─ ziyuu_floor_1.png
│  │  │     ├─ ziyuu_floor_2.png
│  │  │     ├─ ziyuu_floor_3.png
│  │  │     └─ ziyuu_floor_4.png
│  │  └─ mascot
│  │     ├─ aorun_feel_down.png
│  │     ├─ aorun_feel_up.png
│  │     ├─ aorun_normal.png
│  │     └─ aorun_question.png
│  ├─ tailwind.config.js
│  └─ tsconfig.json
├─ README.md
├─ repomix-output.xml
└─ repomix.config.json

```
