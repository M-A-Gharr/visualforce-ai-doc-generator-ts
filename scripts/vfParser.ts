import { XMLParser } from "fast-xml-parser";
import { parseApexClassFile, ApexClassInfo } from "./apexParser";
import { AiManager } from "./AIProvider/AiManager";
// import { CopilotProvider } from "./AIProvider/copilotProvider";
// import { GoogleAiProvider } from "./AIProvider/googleAiProvider";
import { OpenAiProvider } from "./AIProvider/openAiProvider";
import path from "path";

export interface VfPageInfo {
    pageMeta: { label: string; apiVersion: string };
    standardController?: string;
    customController?: string;
    extensions?: string[];
    properties: any[];
    methods: any[];
    pageStructure: {
        forms: number;
        inputs: string[];
        buttons: string[];
    };
    overview: string;
    purpose: string;
    keyFunctions: string[];
    interactions: string[];
    actionSupports: any[];
    outputPanels: any[];
    pageBlocksAI: any[];
    dependencies: { objects: string[]; fields: string[]; components: string[] };
    scripts: any[];
}

export const aiManager = new AiManager([
    new OpenAiProvider(),
    // new GoogleAiProvider(),
    // new CopilotProvider(),
    // Maybe used in future
]);

/**
 * Extract Overview and Purpose from structured comment at top of the page
 */
function extractOverviewAndPurpose(content: string): { overview: string; purpose: string } {
    const commentMatch = content.match(/<!--([\s\S]*?)-->/);
    let overview = "No overview found.";
    let purpose = "No purpose found.";

    if (commentMatch) {
        const comment = commentMatch[1];
        const overviewMatch = comment.match(/Overview:\s*(.*)/i);
        const purposeMatch = comment.match(/Purpose:\s*(.*)/i);

        if (overviewMatch) overview = overviewMatch[1].trim();
        if (purposeMatch) purpose = purposeMatch[1].trim();
    }

    return { overview, purpose };
}

/**
 * Parse Visualforce page content and meta, returning a VfPageInfo
 */
export async function parseVfPage(content: string, metaXml: string, apexDir: string, filePath?: string): Promise<VfPageInfo> {
    const parser = new XMLParser({ ignoreAttributes: false });
    let meta: any = {};
    if (metaXml) {
        try {
            meta = parser.parse(metaXml)?.ApexPage ?? {};
        } catch { }
    }

    const pageName = filePath ? path.basename(filePath, ".page") : "Unknown";

    // Parse <apex:page ...> to get controllers
    const pageTagMatch = content.match(/<apex:page\s+([^>]+)>/i);
    let standardController, customController, extensions: string[] = [];
    if (pageTagMatch) {
        const attrs = pageTagMatch[1];
        const scMatch = attrs.match(/standardController="([^"]+)"/);
        const ccMatch = attrs.match(/controller="([^"]+)"/);
        const exMatch = attrs.match(/extensions="([^"]+)"/);
        if (scMatch) standardController = scMatch[1];
        if (ccMatch) customController = ccMatch[1];
        if (exMatch) extensions = exMatch[1].split(",").map(s => s.trim());
    }

    // Extract overview & purpose
    const commentData = extractOverviewAndPurpose(content);

    // Use AI generation
    let overview = "";
    let purpose = "";
    // Try AI first
    const aiResult = await aiManager.generateOverviewPurpose(pageName, content);
    overview = aiResult.overview?.trim() || "";
    purpose = aiResult.purpose?.trim() || "";


    // Fallback: if AI failed or returned empty, use .page comments
    if (!overview) overview = commentData.overview;
    if (!purpose) purpose = commentData.purpose;

    // Parse Apex classes
    const allClasses: ApexClassInfo[] = [];
    if (customController) {
        const customClass = parseApexClassFile(apexDir, customController);
        if (customClass) allClasses.push(customClass);
    }
    if (extensions) {
        extensions.forEach(ext => {
            const extClass = parseApexClassFile(apexDir, ext);
            if (extClass) allClasses.push(extClass);
        });
    }

    // Merge properties and methods from all classes
    const properties = allClasses.flatMap(c => [...c.properties, ...c.innerClasses.flatMap(ic => ic.properties)]);
    const methods = allClasses.flatMap(c => [...c.methods, ...c.innerClasses.flatMap(ic => ic.methods)]);

    // Detect page structure
    const formsMatch = content.match(/<apex:form\b/gi) || [];
    const inputMatches = [...(content.matchAll(/<apex:(inputField|inputText|inputTextarea|selectList|inputCheckbox)[^>]*value="([^"]+)"/gi) || [])];
    const buttonMatches = [...(content.matchAll(/<apex:(commandButton|commandLink|button)[^>]*action="([^"]+)"/gi) || [])];

    const pageStructure = {
        forms: formsMatch.length,
        inputs: inputMatches.map(m => m[2]),
        buttons: buttonMatches.map(m => m[2]),
    };

    // AJAX actionSupports
    const actionSupports = [...(content.matchAll(/<apex:actionSupport\s+([^>]+)>/gi) || [])].map(m => {
        const attrs = m[1];
        const reRenderMatch = attrs.match(/reRender="([^"]+)"/);
        const actionMatch = attrs.match(/action="([^"]+)"/);
        const eventMatch = attrs.match(/event="([^"]+)"/);
        const statusMatch = attrs.match(/status="([^"]+)"/);
        return {
            event: eventMatch?.[1] ?? "",
            reRender: reRenderMatch?.[1],
            action: actionMatch?.[1],
            status: statusMatch?.[1],
            parent: "",
            parentId: "",
        };
    });

    // Detect outputPanels
    const outputPanels = [...(content.matchAll(/<apex:outputPanel\s+id="([^"]+)"([^>]*)>/gi) || [])].map(m => {
        const id = m[1];
        const attrs = m[2];
        const layoutMatch = attrs.match(/layout="([^"]+)"/i);
        const layout = layoutMatch?.[1] ?? "block (default)";

        const fullOutputPanelMatch = content.match(new RegExp(`<apex:outputPanel\\s+id="${id}"[^>]*>([\\s\\S]*?)<\\/apex:outputPanel>`, 'i'));
        let innerContent = fullOutputPanelMatch?.[1]?.trim() || '';

        let contentPreview = innerContent.replace(/\s+/g, ' ');
        contentPreview = contentPreview.replace(/<apex:[^>]+>/g, '').replace(/<\/[^>]+>/g, '').trim(); // Remove VF and HTML tags
        contentPreview = contentPreview.substring(0, 150) + (contentPreview.length > 150 ? '...' : ''); // Truncate
        contentPreview = contentPreview || 'No content detected within the panel.';


        return {
            id: id,
            layout: layout,
            contentPreview: contentPreview,
        };
    });

    // Scripts
    const scripts = [...(content.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [])].map(m => ({
        type: "inline",
        value: m[1],
    }));

    // Dependencies
    const detectedObjects: Set<string> = new Set();
    const detectedFields: Set<string> = new Set();

    if (standardController) {
        detectedObjects.add(standardController);
    }

    if (customController) {
        detectedObjects.add(customController);
    }
    if (extensions) {
        extensions.forEach(ext => detectedObjects.add(ext));
    }

    const bindingRegex = /\{!(\$?[A-Z][A-Za-z0-9_]*)(?:\.(\w+))?(?:\.(\w+))?(?:\.(\w+))?\}/g;
    let bindingMatch;
    while ((bindingMatch = bindingRegex.exec(content)) !== null) {
        const fullBindingPath = bindingMatch[1];
        detectedFields.add(fullBindingPath);
        const parts = fullBindingPath.split('.');
        const rootIdentifier = parts[0];

        if (rootIdentifier) {
            if (rootIdentifier.startsWith('$')) {
                // Handle global variables as special objects or categories
                if (rootIdentifier === '$User') {
                    detectedObjects.add('User');
                } else if (rootIdentifier === '$CurrentPage') {
                    detectedObjects.add('CurrentPageContext');
                }
            } else {
                if (rootIdentifier[0] && rootIdentifier[0].toUpperCase() === rootIdentifier[0]) {
                    detectedObjects.add(rootIdentifier);
                }
            }
        }
    }

    if (standardController && content.includes(`value="{!${standardController.toLowerCase()}.Contacts}"`)) {
        detectedObjects.add('Contact');
    }

    const customComponentMatches = [...(content.matchAll(/<c:([A-Za-z0-9_]+)/g) || [])].map(m => m[1]);

    // PageBlocks for output
    const pageBlocks = [...(content.matchAll(/<apex:pageBlock\s+([^>]+)>/gi) || [])].map(m => {
        const attrs = m[1];
        const titleMatch = attrs.match(/title="([^"]+)"/i);
        return {
            title: titleMatch?.[1] ?? "N/A",
            // Add other relevant attributes like `id`, `mode`, etc.
        };
    });

    // remove duplicates
    const uniqueProperties = Array.from(new Set(properties.map(p => JSON.stringify(p)))).map(s => JSON.parse(s));
    const uniqueMethods = Array.from(new Set(methods.map(m => JSON.stringify({ name: m.name, parameters: m.parameters, type: m.type })))).map(s => JSON.parse(s));


    return {
        pageMeta: {
            label: meta.label ?? "N/A",
            apiVersion: meta.apiVersion ?? "N/A",
        },
        standardController,
        customController,
        extensions,
        properties,
        methods,
        pageStructure,
        overview,
        purpose,
        keyFunctions: [],
        interactions: [],
        actionSupports,
        outputPanels,
        pageBlocksAI: pageBlocks,
        dependencies: {
            objects: Array.from(detectedObjects),
            fields: Array.from(detectedFields),
            components: Array.from(new Set(customComponentMatches)),
        },
        scripts,
    };
}