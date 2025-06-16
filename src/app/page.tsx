"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ReactMarkdown from "react-markdown";

// 產生 markmap HTML
function getMindMapHtml(mind_map: string) {
  const mind_map_markdown = mind_map.replace("```markdown", "").replace("```", "");
  return `
    <div class="markmap">
      <script type="text/template">
${mind_map_markdown}
      </script>
    </div>
  `;
}

export default function HomePage() {
  const [videoUrl, setVideoUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [tab, setTab] = useState("transcript");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 處理送出
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl) return;
    setLoading(true);
    setMessage("");
    setResult(null);
    try {
      const res = await fetch("/api/videos/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: videoUrl }),
      });
      const { data, error } = await res.json();
      if (error) {
        setMessage("API 錯誤：" + error);
      } else {
        // 解構 API 回傳的 15 個欄位
        const [
          video_id,
          questions_answers_json,
          df_string_output, 
          summary_text,
          df_summarise,
          key_moments,
          key_moments_html,
          mind_map, 
          mind_map_html,
          transcript_html,
          simple_html_content, 
          reading_passage_text,
          reading_passage,
          content_subject,
          content_grade,
        ] = data;
        setResult({
          video_id,
          questions_answers_json,
          df_string_output, 
          summary_text,
          df_summarise,
          key_moments,
          key_moments_html,
          mind_map, 
          mind_map_html,
          transcript_html,
          simple_html_content, 
          reading_passage_text,
          reading_passage,
          content_subject,
          content_grade,
        });
        setMessage("分析完成！");
      }
    } catch (err) {
      setMessage("API 請求失敗：" + String(err));
    }
    setLoading(false);
  };

  // 監聽 tab 切換
  useEffect(() => {
    const handler = (e: any) => setTab(e.detail.tab);
    window.addEventListener("switch-tab", handler);
    return () => window.removeEventListener("switch-tab", handler);
  }, []);

  // 切換到 mindmap tab 或內容變動時，自動渲染 markmap
  useEffect(() => {
    if (tab === 'mindmap' && result?.mind_map && (window as any).markmap) {
      // 清除舊 SVG（避免重複渲染）
      document.querySelectorAll('.markmap svg').forEach(svg => svg.remove());
      (window as any).markmap.autoLoader.renderAll();
    }
  }, [tab, result]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        videoUrl={videoUrl}
        setVideoUrl={setVideoUrl}
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <main style={{
        maxWidth: 540,
        margin: "48px auto",
        padding: 32,
        borderRadius: 18,
        boxShadow: "0 4px 32px #e3eafc",
        background: "#fff",
        minHeight: 400,
        flex: 1
      }}>
        <h1 style={{
          fontWeight: 800,
          fontSize: 32,
          marginBottom: 12,
          color: "#1976d2",
          letterSpacing: 1
        }}>AI視頻內容智能助手</h1>
        <p style={{ color: "#666", marginBottom: 32, fontSize: 17 }}>
          基於生成式AI的影片內容分析、逐字稿、摘要與互動問答平台。
        </p>
        {message && <div style={{
          marginTop: 10,
          marginBottom: 18,
          color: "#2e7d32",
          fontWeight: 700,
          fontSize: 17,
          background: "#e8f5e9",
          borderRadius: 8,
          padding: "8px 16px",
          display: "inline-block"
        }}>{message}</div>}
        {/* 根據 tab 顯示不同內容 */}
        {result && (
          <section style={{ marginTop: 24, background: "#f9f9f9", borderRadius: 12, padding: 24 }}>
            {tab === 'simple' && (
              <>
                <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>逐字稿</h2>
                <div dangerouslySetInnerHTML={{ __html: result.simple_html_content }} />
              </>
            )}
            {tab === 'transcript' && (
              <>
                <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>逐字稿（截圖）</h2>
                <div dangerouslySetInnerHTML={{ __html: result.transcript_html }} />
              </>
            )}
            {tab === 'reading' && (
              <>
                <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>文章模式</h2>
                <div dangerouslySetInnerHTML={{ __html: result.reading_passage_text }} />
              </>
            )}
            {tab === 'summary' && (
              <>
                <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>重點摘要</h2>
                <div style={{ fontSize: 16, lineHeight: 1.7 }}>
                  <ReactMarkdown>
                    {result.summary_text}
                  </ReactMarkdown>
                </div>
              </>
            )}
            {tab === 'keymoments' && (
              <>
                <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>關鍵時刻</h2>
                <div dangerouslySetInnerHTML={{ __html: result.key_moments_html }} />
              </>
            )}
            {tab === 'mindmap' && (
              <>
                <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>心智圖</h2>
                <div
                  id="mindmap-html"
                  style={{
                    width: "100%",
                    minHeight: 500,
                    maxHeight: 800,
                    background: "#fff",
                    borderRadius: 18,
                    padding: 32,
                    boxSizing: "border-box",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: result.mind_map ? getMindMapHtml(result.mind_map) : "<div>無心智圖資料</div>"
                  }}
                />
                <style>{`
                  .markmap > svg {
                    width: 100% !important;
                    height: 100% !important;
                    min-height: 400px;
                    max-height: 700px;
                    display: block;
                  }
                `}</style>
              </>
            )}
          </section>
        )}
      </main>
    </div>
  );
} 