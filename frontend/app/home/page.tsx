// Free-Space/frontend/app/home/page.tsx

import fs from "fs";
import path from "path";
import HomeClient from "./HomeClient";

export default function Home() {
    // サーバー側でファイルを読み込む
    const filePath = path.join(process.cwd(), "../README.md");
    let content = "";

    try {
        content = fs.readFileSync(filePath, "utf8");
    } catch (err) {
        console.error(err);
        content = "# Error\nREADME.mdが見つかりませんでした。";
    }

    // クライアントコンポーネントにデータを渡して表示
    return <HomeClient readmeContent={content} />;
}
