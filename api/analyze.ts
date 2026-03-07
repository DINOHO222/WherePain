import { GoogleGenAI } from '@google/genai';
import type { VercelRequest, VercelResponse } from '@vercel/node';
// Inline BODY_PART_LABELS to prevent Vercel cross-directory import module resolution failures
const BODY_PART_LABELS: Record<string, string> = {
    'head_front': '額頭/頭頂', 'face': '臉部', 'neck_front': '前頸部', 'chest': '胸部', 'abdomen': '腹部', 'pelvis': '鼠蹊部/下腹',
    'left_shoulder_front': '左前肩', 'right_shoulder_front': '右前肩', 'left_upper_arm_front': '左大臂(前)', 'right_upper_arm_front': '右大臂(前)',
    'left_elbow_front': '左手肘(前)', 'right_elbow_front': '右手肘(前)', 'left_forearm_front': '左小臂(前)', 'right_forearm_front': '右小臂(前)',
    'left_wrist_front': '左手腕(前)', 'right_wrist_front': '右手腕(前)', 'left_hand_front': '左手掌(手心)', 'right_hand_front': '右手掌(手心)',
    'left_thigh_front': '左大腿(前)', 'right_thigh_front': '右大腿(前)', 'left_knee': '左膝蓋', 'right_knee': '右膝蓋',
    'left_calf_front': '左小腿(前脛骨)', 'right_calf_front': '右小腿(前脛骨)', 'left_ankle_front': '左腳踝(前)', 'right_ankle_front': '右腳踝(前)',
    'left_foot_front': '左腳背/腳趾', 'right_foot_front': '右腳背/腳趾',
    'head_back': '後腦勺', 'neck_back': '後頸部', 'upper_back': '上背部', 'lower_back': '下背', 'glutes': '臀部',
    'left_shoulder_back': '左後肩', 'right_shoulder_back': '右後肩', 'left_upper_arm_back': '左大臂(後)', 'right_upper_arm_back': '右大臂(後)',
    'left_elbow_back': '左手肘(後)', 'right_elbow_back': '右手肘(後)', 'left_forearm_back': '左小臂(後)', 'right_forearm_back': '右小臂(後)',
    'left_wrist_back': '左手腕(後)', 'right_wrist_back': '右手腕(後)', 'left_hand_back': '左手背', 'right_hand_back': '右手背',
    'left_thigh_back': '左大腿(後)', 'right_thigh_back': '右大腿(後)', 'left_calf_back': '左小腿(肚)', 'right_calf_back': '右小腿(肚)',
    'left_ankle_back': '左腳踝(後)', 'right_ankle_back': '右腳踝(後)', 'left_heel': '左腳跟', 'right_heel': '右腳跟',
    'left_foot_back': '左腳底', 'right_foot_back': '右腳底'
};
// Initialize the API client using the secure server-side environment variable
// Note: Vercel will inject process.env.GEMINI_API_KEY from your project settings
const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('Missing GEMINI_API_KEY environment variable in Vercel settings');
    }
    return new GoogleGenAI({ apiKey });
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { symptomData } = req.body;

        if (!symptomData || !symptomData.bodyParts) {
            return res.status(400).json({ error: 'Missing symptomData or bodyParts in request body' });
        }

        const ai = getAiClient();

        const partNames = symptomData.bodyParts.map((p: string) => BODY_PART_LABELS[p as keyof typeof BODY_PART_LABELS] || p).join('、 ') || '未指定';

        const prompt = `
      身為一位急診室的資深分診醫師，請根據以下病患主訴進行專業的初步醫療評估 (Triage)，並嚴格以下列 JSON 格式回傳，不要有任何多餘的文字：

      {
        "urgency": "low" | "medium" | "high",
        "possibleCondition": "string (以條列式 1. 2. 3. 說明最可能的 1~3 種情況)",
        "recommendation": "string (具體的處置建議文字，必要時可要求病患立即就醫)",
        "medicalDepartment": "string (建議就診的科別)"
      }

      醫療科別 (medicalDepartment) 的嚴格規定：
      - 請務必從以下清單中選擇最適合的科別，完全不要自創科別名稱，以便後續進行 Google Maps 的精準搜尋：
        【家醫科、一般內科、心臟內科、胸腔內科、腸胃內科、神經內科、骨科、復健科、泌尿科、婦產科、小兒科、耳鼻喉科、眼科、皮膚科、牙科、急診醫學科、身心科、不需就醫】
      - 若病患症狀極端輕微、明顯為生理期正常現象、或不需要醫療介入，請將科別設為「不需就醫」。

      病患主訴：
      影響部位：${partNames}
      疼痛指數 (1-10)：${symptomData.painLevel}
      症狀長度：${symptomData.duration}
      其他描述：${symptomData.description || '無'}
    `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        if (!response.text) {
            throw new Error("API returned empty response");
        }

        // Pass the raw JSON text back to the frontend
        const result = JSON.parse(response.text);
        return res.status(200).json(result);

    } catch (error) {
        console.error("Vercel API handling error:", error);
        return res.status(500).json({
            error: 'Failed to analyze symptoms',
            details: error instanceof Error ? error.message : String(error)
        });
    }
}
