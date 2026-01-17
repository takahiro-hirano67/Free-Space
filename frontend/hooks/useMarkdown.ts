// Free-Space/frontend/hooks/useMarkdown.ts

"use client";

import { useEffect, useState } from "react";

// public 配下の markdown ファイルを取得するカスタムフック
export function useMarkdown(path: string) {
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!path) return;

        setLoading(true);
        setError(null);

        fetch(path)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch markdown: ${path}`);
                }
                return res.text();
            })
            .then(setContent)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [path]);

    return { content, loading, error };
}
