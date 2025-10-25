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

function extractPageBlocks(content: string): VfPageBlock[] {
    const pageBlocks: VfPageBlock[] = [];
    const pageBlockRegex = /<apex:pageBlock\s+([^>]*?)>(([\s\S]*?)<\/apex:pageBlock>)?/gi;
    let match;

    while ((match = pageBlockRegex.exec(content)) !== null) {
        const fullBlock = match[0];
        const attributes = match[1];
        const blockContent = match[3] || '';

        const titleMatch = attributes.match(/title="([^"]+)"/i);
        const title = titleMatch ? titleMatch[1] : 'No Title';

        const items: string[] = [];
        const itemRegex = /<apex:([a-zA-Z0-9]+)[^>]*?>/gi;
        let itemMatch;
        while ((itemMatch = itemRegex.exec(blockContent)) !== null) {
            items.push(`apex:${itemMatch[1]}`);
        }

        // Also capture pageBlockTable if present, as it's a common direct child
        const pageBlockTableMatch = blockContent.match(/<apex:pageBlockTable\b/i);
        if (pageBlockTableMatch && !items.includes('apex:pageBlockTable')) {
            items.push('apex:pageBlockTable');
        }

        pageBlocks.push({
            title: title,
            items: items.length > 0 ? Array.from(new Set(items)) : ['No specific items detected'],
        });
    }

    return pageBlocks;
}

function extractActionSupports(
    content: string
): Array<{ event: string; reRender?: string; action?: string; status?: string }> {
    const actionSupports: Array<{ event: string; reRender?: string; action?: string; status?: string }> = [];
    const actionSupportRegex = /<apex:actionSupport\s+([^>]*?)>/gi;
    let match;

    while ((match = actionSupportRegex.exec(content)) !== null) {
        const attrs = match[1];
        const eventMatch = attrs.match(/event="([^"]+)"/i);
        const reRenderMatch = attrs.match(/reRender="([^"]+)"/i);
        const actionMatch = attrs.match(/action="([^"]+)"/i);
        const statusMatch = attrs.match(/status="([^"]+)"/i);

        actionSupports.push({
            event: eventMatch ? eventMatch[1] : 'unknown',
            reRender: reRenderMatch ? reRenderMatch[1] : undefined,
            action: actionMatch ? actionMatch[1] : undefined,
            status: statusMatch ? statusMatch[1] : undefined,
        });
    }
    return actionSupports;
}

function extractOutputPanels(
    content: string
): Array<{ id: string; layout?: string; contentPreview: string }> {
    const outputPanels: Array<{ id: string; layout?: string; contentPreview: string }> = [];
    const outputPanelRegex = /<apex:outputPanel\s+([^>]*?)>(([\s\S]*?)<\/apex:outputPanel>)?/gi;
    let match;

    while ((match = outputPanelRegex.exec(content)) !== null) {
        const attrs = match[1];
        const panelContent = (match[3] || '').trim().substring(0, 100) + (match[3] && match[3].trim().length > 100 ? '...' : ''); // Get first 100 chars
        const idMatch = attrs.match(/id="([^"]+)"/i);
        const layoutMatch = attrs.match(/layout="([^"]+)"/i);

        if (idMatch) { // Only include panels with an ID for now, as they are usually targets
            outputPanels.push({
                id: idMatch[1],
                layout: layoutMatch ? layoutMatch[1] : undefined,
                contentPreview: panelContent.replace(/\s+/g, ' '), // Normalize whitespace for preview
            });
        }
    }
    return outputPanels;
}

function extractScripts(
    content: string
): Array<{ type: string; value: string }> {
    const scripts: Array<{ type: string; value: string }> = [];
    // Regex for both inline scripts and external scripts
    const scriptRegex = /<script\s+([^>]*?)?>(?:([\s\S]*?)<\/script>)?/gi;
    let match;

    while ((match = scriptRegex.exec(content)) !== null) {
        const attrs = match[1] || ''; // Attributes for script tag
        const inlineContent = match[2] ? match[2].trim() : ''; // Content between script tags

        const srcMatch = attrs.match(/src="([^"]+)"/i);
        const typeMatch = attrs.match(/type="([^"]+)"/i);

        if (srcMatch) {
            scripts.push({
                type: 'external',
                value: srcMatch[1],
            });
        } else if (inlineContent) {
            // Trim and take a snippet for inline scripts
            const snippet = inlineContent.substring(0, 150) + (inlineContent.length > 150 ? '...' : '');
            scripts.push({
                type: typeMatch ? typeMatch[1] : 'inline',
                value: snippet,
            });
        }
    }
    return scripts;
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

    const pageBlocks = extractPageBlocks(content);
    const actionSupports = extractActionSupports(content);
    const outputPanels = extractOutputPanels(content);
    const scripts = extractScripts(content);


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
        pageStructure,
        dependencies,
        keyFunctions: [], // should be handled by AI later
        interactions: [], // should be handled by AI later
        pageBlocks,
        actionSupports,
        outputPanels,
        scripts,
    };

    return pageInfo;
}