"use client";
import React from "react";

export default function Sidebar({
  videoUrl,
  setVideoUrl,
  loading,
  handleSubmit
}: {
  videoUrl: string;
  setVideoUrl: (v: string) => void;
  loading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  // 按鈕樣式
  const btnStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 0',
    borderRadius: 10,
    border: 0,
    background: '#1976d2',
    color: '#fff',
    fontWeight: 700,
    fontSize: 17,
    boxShadow: '0 2px 8px #dbeafe',
    cursor: 'pointer',
    transition: 'background 0.2s, transform 0.1s',
    marginBottom: 0
  };
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: 'linear-gradient(180deg, #f5f6fa 60%, #e3eafc 100%)',
      boxShadow: '2px 0 8px #e0e7ef',
      padding: '32px 0 0 0',
      alignItems: 'center',
      minWidth: 260,
    }}>
      <form onSubmit={handleSubmit} style={{ width: '90%', marginBottom: 32 }}>
        <label style={{ fontWeight: 600, marginBottom: 4 }}>
          YouTube 連結：
          <input
            type="url"
            value={videoUrl}
            onChange={e => setVideoUrl(e.target.value)}
            placeholder="https://youtube.com/..."
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", marginTop: 4, fontSize: 15 }}
          />
        </label>
        <button type="submit" disabled={loading} style={{ ...btnStyle, marginTop: 12, marginBottom: 18, background: loading ? '#90caf9' : '#1976d2', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? "分析中..." : "提交分析"}
        </button>
      </form>
      <div style={{
        fontWeight: 800,
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 18,
        letterSpacing: 2,
        color: '#1976d2'
      }}>功能選單</div>
      <div style={{ width: '80%', borderBottom: '1px solid #e0e7ef', marginBottom: 18 }} />
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 18, width: '90%' }}>
        <button
          style={btnStyle}
          onClick={() => window.dispatchEvent(new CustomEvent('switch-tab', { detail: { tab: 'simple' } }))}
          onMouseOver={e => (e.currentTarget.style.background = '#1251a3')}
          onMouseOut={e => (e.currentTarget.style.background = '#1976d2')}
        >逐字稿</button>
        <button
          style={btnStyle}
          onClick={() => window.dispatchEvent(new CustomEvent('switch-tab', { detail: { tab: 'transcript' } }))}
          onMouseOver={e => (e.currentTarget.style.background = '#1251a3')}
          onMouseOut={e => (e.currentTarget.style.background = '#1976d2')}
        >逐字稿（截圖）</button>
        <button
          style={btnStyle}
          onClick={() => window.dispatchEvent(new CustomEvent('switch-tab', { detail: { tab: 'reading' } }))}
          onMouseOver={e => (e.currentTarget.style.background = '#1251a3')}
          onMouseOut={e => (e.currentTarget.style.background = '#1976d2')}
        >文章模式</button>
        <button
          style={btnStyle}
          onClick={() => window.dispatchEvent(new CustomEvent('switch-tab', { detail: { tab: 'summary' } }))}
          onMouseOver={e => (e.currentTarget.style.background = '#1251a3')}
          onMouseOut={e => (e.currentTarget.style.background = '#1976d2')}
        >重點摘要</button>
        <button
          style={btnStyle}
          onClick={() => window.dispatchEvent(new CustomEvent('switch-tab', { detail: { tab: 'keymoments' } }))}
          onMouseOver={e => (e.currentTarget.style.background = '#1251a3')}
          onMouseOut={e => (e.currentTarget.style.background = '#1976d2')}
        >關鍵時刻</button>
        <button
          style={btnStyle}
          onClick={() => window.dispatchEvent(new CustomEvent('switch-tab', { detail: { tab: 'mindmap' } }))}
          onMouseOver={e => (e.currentTarget.style.background = '#1251a3')}
          onMouseOut={e => (e.currentTarget.style.background = '#1976d2')}
        >心智圖</button>
      </nav>
      <div style={{ flex: 1 }} />
      <div style={{ marginBottom: 24 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: '#e3eafc', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, color: '#1976d2', fontSize: 20
        }}>N</div>
      </div>
    </div>
  );
} 