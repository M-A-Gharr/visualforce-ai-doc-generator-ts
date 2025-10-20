import { AiProvider, AiProviderResult } from "./AiProvider";

export class AiManager {
    providers: AiProvider[];

    constructor(providers: AiProvider[]) {
        this.providers = providers;
    }

    /**
    * Generate overview and purpose using the first available AI provider
    * @param pageName Name of the Visualforce page
    * @param content VF page content
    */
    async generateOverviewPurpose(pageName: string, content: string): Promise<AiProviderResult> {
        // let lastError: Error | null = null;

        for (const provider of this.providers) {
            try {
                const result = await provider.generateOverviewPurpose(pageName, content);

                if ((result?.overview && result.overview.trim()) || (result?.purpose && result.purpose.trim())) {
                    console.log(`✅ AI Provider used: ${provider.name}`);
                    return result;
                }
            } catch (err: any) {
                console.warn(`❌ Provider ${provider.name} failed: ${err.message}`);
                // lastError = err;
            }
        }
        // console.error("⚠️ All AI providers failed. Returning default message.");
        return {
            overview: "",
            purpose: "",
        };
    }
}
