export interface AiProviderResult {
  overview?: string;
  purpose?: string;
}

export interface AiProvider {
  name: string;
  generateOverviewPurpose(pageName: string, content: string): Promise<AiProviderResult>;
}