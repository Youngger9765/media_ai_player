import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { videoId: string } }) {
  // 回傳假資料
  return NextResponse.json({
    videoId: params.videoId,
    status: 'completed',
    transcript: {
      source: 'mock',
      confidence: 0.98,
      segments: [
        { text: '大家好，歡迎收看本集節目。', start: 0, end: 3, confidence: 0.99 },
        { text: '今天我們要介紹AI影片分析。', start: 3, end: 7, confidence: 0.97 }
      ]
    },
    analysis: {
      summary: '本影片介紹了AI影片內容分析的應用與流程。',
      key_moments: [
        {
          start_time: '00:00:03',
          end_time: '00:00:07',
          title: 'AI影片分析介紹',
          description: '說明AI如何自動分析影片內容',
          keywords: ['AI', '影片分析'],
          screenshot_url: 'https://placehold.co/320x180?text=AI分析'
        }
      ],
      topics: ['AI', '影片分析'],
      keywords: ['AI', '自動化', '內容分析'],
      mind_map: {
        topic: 'AI影片分析',
        branches: [
          { title: '應用', nodes: ['教育', '內容創作'] },
          { title: '流程', nodes: ['上傳', '分析', '摘要'] }
        ]
      }
    },
    generated_content: {
      article: '# AI影片分析應用\n本影片介紹了AI如何協助內容理解與摘要。',
      summary: 'AI影片分析讓內容理解更高效。'
    }
  });
} 