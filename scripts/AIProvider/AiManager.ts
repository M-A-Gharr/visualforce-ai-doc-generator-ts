import { AiProvider, AiProviderResult, MemberDescriptionResult } from "./AiProvider";
import { VfProperty, VfMethod } from "../utils/types";

export class AiManager {
  private providers: AiProvider[];

  constructor(providers: AiProvider[]) {
    this.providers = providers;
  }

  public get hasMemberGenerator(): boolean {
    return this.providers.some(p => typeof p.generateMemberDescriptions === "function");
  }

  public async generateOverviewPurpose(pageName: string, content: string): Promise<AiProviderResult> {
    for (const provider of this.providers) {
      try {
        const result = await provider.generateOverviewPurpose(pageName, content);
        if (result && (result.overview || result.purpose)) {
          return {
            overview: result.overview || "",
            purpose: result.purpose || "",
          };
        }
      } catch (err) {
        console.warn(`⚠️ [${provider.name}] failed to generate overview/purpose:`, err);
      }
    }

    return { overview: "", purpose: "" };
  }

  /**
   * Enrich VfProperty & VfMethod arrays with AI descriptions.
   */
  public async enrichMembersWithDescriptions(
    pageName: string,
    properties: VfProperty[],
    methods: VfMethod[]
  ): Promise<void> {
    for (const provider of this.providers) {
      if (!provider.generateMemberDescriptions) continue;

      try {
        const result = await provider.generateMemberDescriptions(
          pageName,
          properties.map(p => p.name),
          methods.map(m => m.name)
        );

        if (result) {
          properties.forEach(p => {
            p.descriptionAI = result.properties[p.name] || `Property ${p.name} of type ${p.type}.`;
          });
          methods.forEach(m => {
            m.descriptionAI = result.methods[m.name] || `Method ${m.name} returns ${m.type} and takes (${m.parameters || ""}).`;
          });

          return; // Stop after first successful provider
        }
      } catch (err) {
        console.warn(`⚠️ [${provider.name}] failed to generate member descriptions:`, err);
      }
    }

    // Fallback for all members if no provider succeeded
    properties.forEach(p => {
      if (!p.descriptionAI) p.descriptionAI = `Property ${p.name} of type ${p.type}.`;
    });
    methods.forEach(m => {
      if (!m.descriptionAI) m.descriptionAI = `Method ${m.name} returns ${m.type} and takes (${m.parameters || ""}).`;
    });
  }
}