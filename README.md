# WherePain 哪裡痛 🏥

![WherePain Preview](public/body.png)

**WherePain** 是一款專為現代人打造的「視覺化症狀分析助理」。透過直覺的 3D 人體圖形介面，讓使用者能快速點選身體不適的部位，並結合最新的 AI 醫療語言模型，即時提供初步的醫療分診建議、可能症狀分析以及建議就診科別，解決「不知道該看哪一科」的常見困擾。

---

## 🚀 技術棧 (Tech Stack)

本作採用現代化的前端與無伺服器架構，確保極致的效能、良好的型別安全以及嚴密的環境變數防護。

*   **前端框架**: React 19 + Vite
*   **型別系統**: TypeScript (嚴格模式)
*   **UI 樣式**: Tailwind CSS (使用原子化 Design System 與 CSS 變數實作亮/暗色主題基礎)
*   **圖標庫**: Lucide React
*   **互動套件**: `react-zoom-pan-pinch` (實作人體模型 SVG 縮放與拖曳)
*   **AI 引擎**: Google Gemini 2.5 Flash (`@google/genai`)
*   **後端/部署**: Vercel Serverless Functions (Node.js) - 確保 `GEMINI_API_KEY` 不外洩。

---

## 💡 使用情境 (Use Cases)

1.  **突發性不適難以描述時**： 
    當使用者突然感到身體某處疼痛，但不知道具體的醫學名稱時。只需打開 APP，直接點擊人體圖上對應的部位（可多選），即可開始分析。
2.  **猶豫該掛哪一科時**：
    「下背痛到底要看骨科、復健科還是泌尿科？」系統會根據使用者點選的部位、疼痛指數 (1-10) 與持續時間，由 AI 判定最適合的單一醫療科別，減少掛錯科浪費醫療資源。
3.  **長輩或醫療知識較少者使用**：
    全視覺化的操作流程，沒有複雜的醫學專有名詞輸入框。配備清晰的骨架屏 (Skeleton) 與友善的 Toast 提示，讓任何年齡層都能輕鬆上手。
4.  **症狀追蹤**：
    內建基於 `localStorage` 的歷史紀錄功能，方便病患在就醫時，直接打開 APP 向醫師展示先前的疼痛點與 AI 初步評估結果作為參考。

---

## 🛠️ 本機開發 (Local Development)

請確保已安裝 Node.js。

```bash
# 1. 安裝依賴
npm install

# 2. 環境變數設定 
# 複製 .env.example 為 .env 並填寫您的 Gemini API Key
# GEMINI_API_KEY=your_genai_api_key

# 3. 啟動開發伺服器
npm run dev
```

> **注意**：本專案的 AI API 呼叫已移至 Vercel Serverless Function (`/api/analyze.ts`)。若要在本機完整測試 API，建議安裝 Vercel CLI 並使用 `vercel dev` 指令啟動。

---
*Disclaimer: 本應用程式產生之結果僅供初步參考，不能取代專業醫師的醫療診斷。若遇緊急狀況請立即就醫。*