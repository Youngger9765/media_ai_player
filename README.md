# AI視頻內容智能助手（AI Video Content Assistant）

## 產品簡介
AI視頻內容智能助手是一款基於生成式AI技術的視頻內容分析與互動平台，支援多種視頻來源，提供智能逐字稿、內容分析、AI問答、文檔生成等一站式服務，適用於學習、培訓、研究與內容創作等多元場景。

## 核心功能
- 🎬 **視頻內容分析**：自動提取視頻主題、關鍵時刻、情感傾向等
- 📝 **逐字稿生成**：多語言高準確率逐字稿，含時間戳
- 🖼️ **智能截圖**：關鍵畫面自動擷取，雲端存取
- 🤖 **AI對話問答**：多角色AI助手，深度互動
- 📄 **內容生成**：文章、摘要、部落格、學習筆記等多格式文檔
- 🗺️ **心智圖/時間軸**：內容可視化，重點一目了然
- 📦 **批量處理**：多視頻同時分析與文檔生成

## 技術架構
- **前端**：React 18+、TypeScript、Material-UI/Ant Design、Redux Toolkit/Zustand、Socket.io-client、react-markdown、markmap-view
- **後端**：Python 3.9+、FastAPI、PostgreSQL、Redis、Elasticsearch、Celery、AWS S3/Google Cloud Storage、OpenAI/Anthropic/Gemini API、yt-dlp、moviepy、whisper

## 主要數據模型（簡要）
- `Video`：視頻基本資訊、處理狀態、元數據
- `Transcript`：逐字稿段落、來源、準確度
- `AnalysisResult`：主題、摘要、關鍵時刻、心智圖
- `BlogArticle`：部落格內容、配圖、SEO元數據
- `ChatSession`：AI對話會話、訊息、引用

## API 概覽
- `POST /api/videos/process`：提交視頻分析任務
- `GET /api/videos/{video_id}/analysis`：查詢分析結果
- `POST /api/chat/sessions`：建立AI對話會話
- `POST /api/chat/sessions/{session_id}/messages`：發送對話訊息
- `POST /api/documents/generate`：生成文檔
- `GET /api/documents/{document_id}/blog-assets`：獲取部落格素材

> 詳細API請參考 `/docs` 或 Swagger UI

## 專案啟動方式
1. **安裝依賴**
   - 前端：`cd frontend && npm install`
   - 後端：`cd backend && pip install -r requirements.txt`
2. **啟動服務**
   - 前端：`npm start`
   - 後端：`uvicorn app.main:app --reload`
3. **配置環境變數**
   - 參考 `.env.example` 設定API金鑰、資料庫、雲存儲等

## 聯絡方式
- 專案維護者：[your_email@example.com]
- 意見回饋/合作洽談請來信聯絡

---

> 本專案持續開發中，歡迎貢獻與反饋！ 