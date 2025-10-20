import { AiProvider, AiProviderResult } from "./AiProvider";
import OpenAI from "openai";

export class OpenAiProvider implements AiProvider {
    name = "OpenAI";

    private apiKey: string;
    private client: OpenAI;

    constructor() {
        this.apiKey = process.env.OPENAI_API_KEY || "";
        this.client = new OpenAI({ apiKey: this.apiKey });
    }

    async generateOverviewPurpose(pageName: string, content: string): Promise<AiProviderResult> {
        if (!this.apiKey) return {}; 

        try {
            const prompt = `
You are analyzing a Salesforce Visualforce page named "${pageName}". 
Based on the provided code content, generate:
1. A concise **overview** of what the page does.
2. A **purpose** statement describing its main business function.
Format the response as JSON:
{ "overview": "...", "purpose": "..." }

Content:
${content.substring(0, 4000)}
      `;

            const completion = await this.client.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a Salesforce documentation assistant." },
                    { role: "user", content: prompt },
                ],
            });

            const responseText = completion.choices[0].message?.content || "";

            // Try to parse JSON result from the AI
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                return {
                    overview: parsed.overview || `AI-generated overview (OpenAI) for ${pageName}`,
                    purpose: parsed.purpose || `AI-generated purpose (OpenAI) for ${pageName}`,
                };
            }

            // Fallback: if not valid JSON
            return {
                overview: `AI-generated overview (OpenAI) for ${pageName}`,
                purpose: `AI-generated purpose (OpenAI) for ${pageName}`,
            };
        } catch (err) {
            throw new Error(`OpenAI API failed: ${(err as Error).message}`);
        }
    }
}