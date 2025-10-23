export interface AiProviderResult {
  overview: string;
  purpose: string;
}

export interface MemberDescriptionResult {
  properties: Record<string, string>;
  methods: Record<string, string>;
}

export interface AiProvider {
  name: string;

  // Generate overview/purpose for a Visualforce page
  generateOverviewPurpose(pageName: string, content: string): Promise<AiProviderResult>;

  // Generate descriptions for properties & methods
  // Accepts arrays of property/method names
  generateMemberDescriptions?(
    pageName: string,
    properties: string[],
    methods: string[]
  ): Promise<MemberDescriptionResult>;
}