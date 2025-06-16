"use client";
import React, { useState, useEffect } from "react";

export default function HomePage({ result, tab, message }: { result: any, tab: string, message: string }) {
  // 只負責顯示主內容
  return (
    <main style={{
      maxWidth: 540,
      margin: "48px auto",
      padding: 32,
      borderRadius: 18,
      boxShadow: "0 4px 32px #e3eafc",
      background: "#fff",
      minHeight: 400
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
          {tab === 'transcript' && (
            <>
              <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>逐字稿</h2>
              <ul style={{ paddingLeft: 20 }}>
                {result.transcript?.segments?.map((seg: any, i: number) => (
                  <li key={i}>{seg.text} <span style={{ color: '#888', fontSize: 12 }}>（{seg.start}~{seg.end}s）</span></li>
                ))}
              </ul>
            </>
          )}
          {tab === 'summary' && (
            <>
              <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>重點摘要</h2>
              <div><b>摘要：</b>{result.analysis?.summary}</div>
            </>
          )}
          {tab === 'keymoments' && (
            <>
              <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>關鍵時刻</h2>
              <ul style={{ paddingLeft: 20 }}>
                {result.analysis?.key_moments?.map((m: any, i: number) => (
                  <li key={i}>
                    <b>{m.title}</b> [{m.start_time}~{m.end_time}]<br/>
                    {m.description}<br/>
                    <img src={m.screenshot_url} alt={m.title} style={{ width: 160, marginTop: 4, borderRadius: 4 }} />
                  </li>
                ))}
              </ul>
            </>
          )}
          {tab === 'mindmap' && (
            <>
              <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>心智圖</h2>
              <div style={{ color: '#888' }}>(心智圖功能開發中...)</div>
            </>
          )}
        </section>
      )}
    </main>
  );
} 