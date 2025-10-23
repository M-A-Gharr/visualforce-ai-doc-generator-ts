import { AiProvider, AiProviderResult, MemberDescriptionResult } from "./AiProvider";
import OpenAI from "openai";
import "dotenv/config";

export class OpenAiProvider implements AiProvider {
  name = "OpenAI";
  private client: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY || "";
    if (!apiKey) throw new Error("OpenAI API key is missing in .env");

    this.client = new OpenAI({ apiKey });
  }

  async generateOverviewPurpose(pageName: string, content: string): Promise<AiProviderResult> {
    try {
      const prompt = `
You are a Salesforce Visualforce assistant. 
Generate concise overview & purpose of page "${pageName}".
Return JSON: { "overview": "...", "purpose": "..." }

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
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);

      return { overview: "", purpose: "" };
    } catch (err: any) {
      console.warn(`OpenAI overview generation failed: ${err.message}`);
      return { overview: "", purpose: "" };
    }
  }

  async generateMemberDescriptions(
    pageName: string,
    properties: string[],
    methods: string[]
  ): Promise<MemberDescriptionResult> {
    if ((!properties || properties.length === 0) && (!methods || methods.length === 0)) {
      return { properties: {}, methods: {} };
    }

    try {
      const prompt = `
You are a Salesforce Visualforce assistant.
For page "${pageName}", generate short descriptions for each property and method.
Return JSON:
{
  "properties": { "propertyName": "description" },
  "methods": { "methodName": "description" }
}

Properties: ${properties.join(", ")}
Methods: ${methods.join(", ")}
      `;

      const completion = await this.client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a Salesforce documentation assistant." },
          { role: "user", content: prompt },
        ],
      });

      const responseText = completion.choices[0].message?.content || "";
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);

      return { properties: {}, methods: {} };
    } catch (err: any) {
      console.warn(`OpenAI member descriptions failed: ${err.message}`);
      return { properties: {}, methods: {} };
    }
  }
}