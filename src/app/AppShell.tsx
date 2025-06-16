"use client";
import React from "react";
import Sidebar from "./Sidebar";
import HomePage from "./page";

export default function AppShell() {
  const [videoUrl, setVideoUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [result, setResult] = React.useState<any>(null);
  const [tab, setTab] = React.useState<'transcript' | 'summary' | 'keymoments' | 'mindmap'>("transcript");

  React.useEffect(() => {
    fetch("/api/videos/demo")
      .then(res => res.json())
      .then(setResult);
  }, []);

  React.useEffect(() => {
    const handler = (e: any) => {
      if (e.detail && e.detail.tab) setTab(e.detail.tab);
    };
    window.addEventListener('switch-tab', handler);
    return () => window.removeEventListener('switch-tab', handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setTimeout(() => {
      setLoading(false);
      setMessage("分析任務已提交，請稍候查詢結果。");
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 260, background: '#f5f6fa', borderRight: '1px solid #eee', padding: '32px 0 0 0' }}>
        <Sidebar
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </aside>
      <main style={{ flex: 1, minHeight: '100vh', background: 'var(--background)' }}>
        <HomePage result={result} tab={tab} message={message} />
      </main>
    </div>
  );
} 