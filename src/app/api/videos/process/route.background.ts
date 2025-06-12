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
  // TODO: 實際觸發影片分析任務（如排入佇列、寫入資料庫等）
  // 目前僅回傳 mock 狀態
  return NextResponse.json({ status: 'processing', message: '影片分析已啟動', url });
} 