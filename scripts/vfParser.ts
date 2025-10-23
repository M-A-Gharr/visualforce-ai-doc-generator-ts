import { XMLParser } from "fast-xml-parser";
import path from "path";
import { parseApexClassFile, ApexClassInfo, ApexProperty, ApexMethod } from "./apexParser";
import { AiManager } from "./AIProvider/AiManager";
import { OpenAiProvider } from "./AIProvider/openAiProvider";
import { VfPageInfo } from "./utils/types";

// export interface VfProperty {
//   name: string;
//   type: string;
//   visibility: string;
//   description?: string;
//   descriptionAI?: string;
// }
export interface VfProperty extends ApexProperty {
    descriptionAI?: string;
}

export interface VfMethod extends ApexMethod {
    descriptionAI?: string;
}

// export interface VfMethod {
//   name: string;
//   type: string;
//   visibility: string;
//   parameters?: string;
//   description?: string;
//   descriptionAI?: string;
// }

export interface VfPageBlock {
    title: string;
    items?: string[];
}

// export interface VfPageInfo {
//     pageName: string;
//     pageMeta: { label: string; apiVersion: string };
//     standardController?: string;
//     customController?: string;
//     extensions?: string[];
//     properties: VfProperty[];
//     methods: VfMethod[];
//     overview: string;
//     purpose: string;
//     pageStructure: { forms: number; inputs: string[]; buttons: string[] };
//     dependencies: { objects: string[]; detailedfields: string[]; components: string[] };
//     keyFunctions: string[];
//     interactions: string[];
//     pageBlocks: VfPageBlock[];
//     actionSupports: Array<{ event: string; reRender?: string; action?: string; status?: string }>;
//     outputPanels: Array<{ id: string; layout: string; contentPreview: string }>;
//     scripts: Array<{ type: string; value: string }>;
// }

const aiManager = new AiManager([new OpenAiProvider()]);

/* --------------------------------------------- */
/* 🧩 Helper Functions */
/* --------------------------------------------- */

function extractOverviewAndPurpose(content: string) {
    const match = content.match(/<!--([\s\S]*?)-->/);
    if (!match) return { overview: "No overview found.", purpose: "No purpose found." };

    const comment = match[1];
    const overview = comment.match(/Overview:\s*(.*)/i)?.[1]?.trim() || "No overview found.";
    const purpose = comment.match(/Purpose:\s*(.*)/i)?.[1]?.trim() || "No purpose found.";
    return { overview, purpose };
}

function parseControllers(content: string) {
    const tag = content.match(/<apex:page\s+([^>]+)>/i);
    if (!tag) return { standardController: "", customController: "", extensions: [] };

    const attrs = tag[1];
    const standardController = attrs.match(/standardController="([^"]+)"/)?.[1];
    const customController = attrs.match(/controller="([^"]+)"/)?.[1];
    const extensions =
        attrs.match(/extensions="([^"]+)"/)?.[1]?.split(",").map((s) => s.trim()) || [];
    return { standardController, customController, extensions };
}

function detectPageStructure(content: string) {
    const forms = (content.match(/<apex:form\b/gi) || []).length;
    const inputs = [...content.matchAll(/<apex:(input\w+)[^>]*value="([^"]+)"/gi)].map(
        (m) => m[2]
    );
    const buttons = [...content.matchAll(/<apex:(commandButton|button)[^>]*action="([^"]+)"/gi)].map(
        (m) => m[2]
    );
    return { forms, inputs, buttons };
}

function detectDependencies(content: string, controllers: string[]) {
    const objects = new Set<string>();
    const detailedfields = new Set<string>();
    const components = new Set<string>();

    controllers.forEach((c) => c && objects.add(c));

    const fieldMatches = content.matchAll(/\{!([A-Za-z0-9_$.]+)\}/g);
    for (const match of fieldMatches) {
        const full = match[1];
        detailedfields.add(full);
        const root = full.split(".")[0];
        if (root && !root.startsWith("$")) objects.add(root);
    }

    const customComponentMatches = content.matchAll(/<c:([A-Za-z0-9_]+)/g);
    for (const match of customComponentMatches) components.add(match[1]);

    return {
        objects: Array.from(objects),
        detailedfields: Array.from(detailedfields),
        components: Array.from(components),
    };
}

/* --------------------------------------------- */
/* 🧠 Main Parser */
/* --------------------------------------------- */

export async function parseVfPage(
    content: string,
    metaXml: string,
    apexDir: string,
    filePath?: string
): Promise<VfPageInfo> {
    const parser = new XMLParser({ ignoreAttributes: false });
    const meta = metaXml ? parser.parse(metaXml)?.ApexPage ?? {} : {};

    const { standardController, customController, extensions } = parseControllers(content);
    const commentData = extractOverviewAndPurpose(content);
    const pageName = filePath ? path.basename(filePath, ".page") : "Unknown";

    // AI-generated overview and purpose
    const aiOverview = await aiManager.generateOverviewPurpose(pageName, content);
    const overview = aiOverview.overview || commentData.overview;
    const purpose = aiOverview.purpose || commentData.purpose;

    // --- Parse Apex Controllers ---
    const controllers: ApexClassInfo[] = [];
    if (customController) {
        const parsed = parseApexClassFile(apexDir, customController);
        if (parsed) controllers.push(parsed);
    }
    extensions.forEach((ext) => {
        const parsed = parseApexClassFile(apexDir, ext);
        if (parsed) controllers.push(parsed);
    });

    // Merge all properties/methods
    const properties = controllers.flatMap((c) => [
        ...c.properties,
        ...c.innerClasses.flatMap((ic) => ic.properties),
    ]);
    const methods = controllers.flatMap((c) => [
        ...c.methods,
        ...c.innerClasses.flatMap((ic) => ic.methods),
    ]);

    // AI enrich member descriptions
    await aiManager.enrichMembersWithDescriptions(pageName, properties, methods);

    const pageStructure = detectPageStructure(content);
    const dependencies = detectDependencies(content, [
        standardController,
        customController,
        ...extensions,
    ]);

    const pageInfo: VfPageInfo = {
        pageName,
        pageMeta: {
            label: meta.label ?? "N/A",
            apiVersion: meta.apiVersion ?? "N/A",
        },
        standardController,
        customController,
        extensions,
        properties,
        methods,
        overview,
        purpose,
        pageStructure: detectPageStructure(content),
        dependencies: detectDependencies(content, [
            standardController,
            customController,
            ...extensions,
        ]),
        keyFunctions: [],
        interactions: [],
        pageBlocks: [],
        actionSupports: [],
        outputPanels: [],
        scripts: [],
    };

    return pageInfo;
}