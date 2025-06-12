"use client";
import React, { useState, useEffect } from "react";

export default function HomePage() {
  const [videoUrl, setVideoUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    // 預設載入 demo 假資料
    fetch("/api/videos/demo")
      .then(res => res.json())
      .then(setResult);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    // TODO: 呼叫 /api/videos/process 上傳影片或傳送連結
    setTimeout(() => {
      setLoading(false);
      setMessage("分析任務已提交，請稍候查詢結果。");
    }, 1000);
  };

  return (
    <main style={{ maxWidth: 480, margin: "40px auto", padding: 24, borderRadius: 12, boxShadow: "0 2px 12px #eee", background: "#fff" }}>
      <h1 style={{ fontWeight: 700, fontSize: 28, marginBottom: 8 }}>AI視頻內容智能助手</h1>
      <p style={{ color: "#666", marginBottom: 24 }}>
        基於生成式AI的影片內容分析、逐字稿、摘要與互動問答平台。
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <label>
          YouTube 連結：
          <input
            type="url"
            value={videoUrl}
            onChange={e => setVideoUrl(e.target.value)}
            placeholder="https://youtube.com/..."
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", marginTop: 4 }}
          />
        </label>
        <button type="submit" disabled={loading} style={{ background: "#1976d2", color: "#fff", border: 0, borderRadius: 6, padding: "10px 0", fontWeight: 600, fontSize: 16, cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "分析中..." : "提交分析"}
        </button>
      </form>
      {message && <div style={{ marginTop: 20, color: "#388e3c", fontWeight: 500 }}>{message}</div>}

      {/* 假資料分析結果展示區塊 */}
      {result && (
        <section style={{ marginTop: 40, background: "#f9f9f9", borderRadius: 8, padding: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>分析結果（Demo）</h2>
          <div style={{ marginBottom: 8 }}><b>摘要：</b>{result.analysis?.summary}</div>
          <div style={{ marginBottom: 8 }}>
            <b>逐字稿：</b>
            <ul style={{ paddingLeft: 20 }}>
              {result.transcript?.segments?.map((seg: any, i: number) => (
                <li key={i}>{seg.text} <span style={{ color: '#888', fontSize: 12 }}>（{seg.start}~{seg.end}s）</span></li>
              ))}
            </ul>
          </div>
          <div style={{ marginBottom: 8 }}>
            <b>關鍵時刻：</b>
            <ul style={{ paddingLeft: 20 }}>
              {result.analysis?.key_moments?.map((m: any, i: number) => (
                <li key={i}>
                  <b>{m.title}</b> [{m.start_time}~{m.end_time}]<br/>
                  {m.description}<br/>
                  <img src={m.screenshot_url} alt={m.title} style={{ width: 160, marginTop: 4, borderRadius: 4 }} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
} 