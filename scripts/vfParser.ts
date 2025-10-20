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
    if (customController) allClasses.push(parseApexClassFile(apexDir, customController));
    if (extensions) extensions.forEach(ext => allClasses.push(parseApexClassFile(apexDir, ext)));

    // Merge properties and methods from all classes
    const properties = allClasses.flatMap(c => [...c.properties, ...c.innerClasses.flatMap(ic => ic.properties)]);
    const methods = allClasses.flatMap(c => [...c.methods, ...c.innerClasses.flatMap(ic => ic.methods)]);

    // Detect page structure
    const formsMatch = content.match(/<apex:form\b/gi) || [];
    const inputMatches = [...(content.matchAll(/<apex:(inputField|inputText|inputTextarea|selectList)[^>]*value="([^"]+)"/gi) || [])];
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
            parent: "", // could add parent id if needed
            parentId: "",
        };
    });

    // Detect outputPanels
    const outputPanels = [...(content.matchAll(/<apex:outputPanel\s+id="([^"]+)"/gi) || [])].map(m => ({
        id: m[1],
        layout: "", // optional parsing
        contentPreview: "",
    }));

    // Scripts
    const scripts = [...(content.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [])].map(m => ({
        type: "inline",
        value: m[1],
    }));

    // Dependencies
    const objectMatches = [...(content.matchAll(/\{!([A-Z][A-Za-z0-9_]+)\./g) || [])].map(m => m[1]);
    const fieldMatches = [...(content.matchAll(/\{![A-Z][A-Za-z0-9_]+\.(\w+)/g) || [])].map(m => m[1]);

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
        pageBlocksAI: [],
        dependencies: { objects: Array.from(new Set(objectMatches)), fields: Array.from(new Set(fieldMatches)), components: [] },
        scripts,
    };
}