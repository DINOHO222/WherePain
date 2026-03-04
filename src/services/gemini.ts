import { GoogleGenAI } from "@google/genai";
import { SymptomData, AnalysisResult } from '@/types';

// Lazy initialization of Gemini API
let ai: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!ai) {
    // Use import.meta.env for Vite environment variables
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (apiKey) {
      ai = new GoogleGenAI({ apiKey });
    }
  }
  return ai;
};

export const analyzeSymptoms = async (data: SymptomData): Promise<AnalysisResult> => {
  const client = getAiClient();
  if (!client) {
    throw new Error("Gemini API Key is missing. Please configure VITE_GEMINI_API_KEY in your environment.");
  }

  const prompt = `
    作為一名專業的醫療AI助手，請根據以下症狀進行初步分析：
    
    疼痛部位: ${translateBodyPart(data.bodyPart)} (${data.side === 'front' ? '正面' : '背面'})
    疼痛程度: ${data.painLevel}/10
    持續時間: ${translateDuration(data.duration)}
    其他描述: ${data.description || '無'}

    請以JSON格式回傳結果，包含以下欄位：
    1. possibleCondition (可能的情況，簡短描述)
    2. recommendation (建議採取的行動，如休息、就醫等)
    3. urgency (緊急程度: low, medium, high)

    請確保回應是純JSON格式，不要包含Markdown標記。
  `;

  try {
    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response from AI");
    }
    
    const analysis = JSON.parse(responseText);
    return analysis as AnalysisResult;
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    throw new Error("無法完成分析，請稍後再試。");
  }
};

function translateBodyPart(part: string | null): string {
  const map: Record<string, string> = {
    'head': '頭部',
    'neck': '頸部',
    'chest': '胸部',
    'upper_stomach': '上腹部',
    'lower_stomach': '下腹部',
    'back': '背部',
    'left_arm': '左手臂',
    'right_arm': '右手臂',
    'left_hand': '左手',
    'right_hand': '右手',
    'left_leg': '左腿',
    'right_leg': '右腿',
    'left_foot': '左腳',
    'right_foot': '右腳'
  };
  return part ? map[part] || part : '未指定';
}

function translateDuration(duration: string): string {
  const map: Record<string, string> = {
    'today': '今天開始',
    'few_days': '持續幾天',
    'one_week': '約一週',
    'one_month': '約一個月',
    'chronic': '長期慢性'
  };
  return map[duration] || duration;
}
