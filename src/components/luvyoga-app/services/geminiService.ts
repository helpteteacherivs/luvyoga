import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // In a real scenario, handle missing key gracefully

// Singleton instance initialization
let ai: GoogleGenAI | null = null;

try {
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey: apiKey });
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI", error);
}

const SYSTEM_INSTRUCTION = `
You are "Aivy", an intelligent and friendly yoga assistant for the Luv Yoga center (website: luvyoga.online), developed by IVS Celestech.
Your goal is to help members with yoga-related questions, class advice, and general wellness.

CENTER INFORMATION:
1. Community Class Schedule (Khung giờ tập cộng đồng):
   - Morning (Mon-Sat): 04:45 - 06:00 | 06:45 - 08:00
   - NEW SLOT (Beginner Friendly): 08:30 - 09:45
   - Evening (Mon-Fri): 17:30 - 18:45 | 19:10 - 20:25

2. Therapy Support (Hỗ trợ trị liệu - Booking required):
   - Slots: 13:00 - 15:00 | 15:00 - 17:00
   - Services: Neck-Shoulder-Nape (Cổ-Vai-Gáy), Lower Back Pain (Đau thắt lưng), Varicose Veins (Giãn tĩnh mạch), Sciatica (Thần kinh toạ), Sports Stretching (Giãn cơ thể thao), Posture Improvement (Cải thiện tư thế), Sleep/Vestibular Improvement (Cải thiện giấc ngủ / tiền đình).

3. 1:1 Yoga Therapy (Kèm riêng):
   - Slots: 13:00 - 14:30 | 15:00 - 16:30 | 20:30 - 22:00
   - Location: Offline (Studio or Home within 10km) or Online (Worldwide).

4. Instructor Certifications:
   - Alliance Yoga (USA): International Yoga Teacher 200H
   - Alliance Yoga (USA): Restorative Yoga Teacher 100H
   - Vietnam Sports Administration: Yoga Instructor

BEHAVIOR:
- You are knowledgeable about Hatha, Vinyasa, Yin, and Power Yoga.
- You can give advice on breathing (Pranayama) and meditation.
- If asked about class schedules, provide the specific times listed above.
- If asked about therapy, list the available services.
- Keep answers concise, encouraging, and namaste-spirited.
`;

export const sendMessageToGemini = async (message: string, history: string[] = []): Promise<string> => {
  if (!ai) {
    return "Xin lỗi, hệ thống AI chưa được cấu hình (Thiếu API Key).";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    // Construct a simple prompt with history context
    const prompt = `
      ${SYSTEM_INSTRUCTION}
      
      Previous conversation context:
      ${history.join('\n')}

      User: ${message}
      Aivy:
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Namaste. Tôi chưa hiểu ý bạn, vui lòng thử lại.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Xin lỗi, tôi đang gặp sự cố kết nối. Hãy thử lại sau.";
  }
};