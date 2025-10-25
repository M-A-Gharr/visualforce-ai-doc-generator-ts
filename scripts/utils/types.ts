export interface VfProperty {
  name: string;
  type: string;
  visibility: string;
  modifiers?: string[];
  descriptionAI?: string;
}

export interface VfMethod {
  name: string;
  type: string;
  parameters?: string;
  visibility: string;
  modifiers?: string[];
  descriptionAI?: string;
}

export interface VfPageBlock {
  title: string;
  items?: string[];
}

export interface VfPageInfo {
  pageName: string;
  overview?: string;
  purpose?: string;
  keyFunctions: string[];
  interactions: string[];
  pageMeta: {
    apiVersion: string;
    label: string;
  };
  standardController?: string;
  customController?: string;
  extensions: string[];
  properties: VfProperty[];
  methods: VfMethod[];
  pageStructure: {
    forms?: number;
    inputs: string[];
    buttons: string[];
  };
  pageBlocks: VfPageBlock[];
  actionSupports: Array<{
    event: string;
    reRender?: string;
    action?: string;
    status?: string;
  }>;
  outputPanels: Array<{
    id: string;
    layout?: string;
    contentPreview: string;
  }>;
  dependencies: {
    objects: string[];
    detailedfields: string[];
    components: string[];
  };
  scripts: Array<{
    type: string;
    value: string;
  }>;
}