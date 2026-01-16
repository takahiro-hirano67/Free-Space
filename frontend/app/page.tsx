import { redirect } from "next/navigation";

// リダイレクト専用ページ
export default function Page() {
    redirect("/home");
}
