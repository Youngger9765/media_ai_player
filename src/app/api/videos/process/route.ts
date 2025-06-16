import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  // 解析前端傳來的資料
  const contentType = req.headers.get('content-type') || '';
  let url = '';
  if (contentType.includes('application/json')) {
    const body = await req.json();
    url = body.url;
  } else if (contentType.includes('multipart/form-data')) {
    // TODO: 處理檔案上傳
    // 這裡可用 busboy/formidable 處理大檔案
  }

  // 讀取 .env.local 的 PASSWORD
  const PASSWORD = process.env.PASSWORD;
  console.log('[API] 收到請求:', { url, PASSWORD_exists: !!PASSWORD });
  if (!PASSWORD) {
    console.error('[API] 缺少 PASSWORD');
    return NextResponse.json({ error: 'Missing PASSWORD in environment variables.' }, { status: 500 });
  }
  if (!url) {
    console.error('[API] 缺少 url');
    return NextResponse.json({ error: 'Missing url in request body.' }, { status: 400 });
  }

  // 動態 import @gradio/client
  let Client;
  try {
    Client = (await import("@gradio/client")).Client;
  } catch (e) {
    console.error('[API] @gradio/client 未安裝', e);
    return NextResponse.json({ error: '@gradio/client 未安裝，請先安裝。' }, { status: 500 });
  }

  try {
    console.log('[API] 開始呼叫 gradio client');
    const client = await Client.connect("https://junyiacademy-vaitor-public.hf.space/");
    const result = await client.predict("/process_youtube_link", {
      password: PASSWORD,
      link: url,
      LLM_model: "open-ai-gpt-4o",
    });
    console.log('[API] gradio client 回傳結果', result);
    // 直接回傳 API 結果
    return NextResponse.json({ data: result.data });
  } catch (err) {
    console.error('[API] 呼叫 gradio client 發生錯誤', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
} 