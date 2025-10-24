import fs from "fs";
import path from "path";

export interface ApexProperty {
    name: string;
    type: string;
    visibility: string;
    modifiers?: string[];
    description?: string;
}

export interface ApexMethod {
    name: string;
    type: string;
    visibility: string;
    parameters?: string;
    signature?: string;
    modifiers?: string[];
    description?: string;
    body?: string;
}

export interface ApexClassInfo {
    name: string;
    properties: ApexProperty[];
    methods: ApexMethod[];
    innerClasses: ApexClassInfo[];
}

/**
 * Reads and parses an Apex class file (.cls or .cps)
 */
export function parseApexClassFile(apexDir: string, className: string): ApexClassInfo | null {
    try {
        const possibleFiles = [
            path.join(apexDir, `${className}.cls`),
            path.join(apexDir, `${className}.cps`),
        ];

        const filePath = possibleFiles.find((f) => fs.existsSync(f));
        if (!filePath) {
            console.warn(`⚠️ No Apex file found for class: ${className}`);
            return null;
        }

        const content = fs.readFileSync(filePath, "utf8");
        return parseApexClassContent(content, className);
    } catch (err: any) {
        console.error(`❌ Error parsing Apex class ${className}: ${err.message}`);
        return null;
    }
}

/**
 * Parses Apex class content and extracts properties, methods, and inner classes
 */
export function parseApexClassContent(content: string, className: string): ApexClassInfo {
    const info: ApexClassInfo = {
        name: className,
        properties: [],
        methods: [],
        innerClasses: [],
    };

    // --- Extract Javadoc-style properties ---
    const propertyRegex =
        /\b(public|private|protected|global)\s+([\w<>]+)\s+(\w+)\s*\{\s*get;\s*set;\s*\}/g;
    let propMatch;
    while ((propMatch = propertyRegex.exec(content)) !== null) {
        info.properties.push({
            visibility: propMatch[1],
            type: propMatch[2],
            name: propMatch[3],
            modifiers: [],
        });
    }

    // --- Extract Javadoc-style methods ---
    const methodRegex =
        /\b(public|private|protected|global)\s+([\w<>]+)\s+(\w+)\s*\(([^)]*)\)\s*\{/g;
    let methodMatch;
    while ((methodMatch = methodRegex.exec(content)) !== null) {
        const modifiers: string[] = [];
        if (content.slice(0, methodMatch.index).match(/\bstatic\b/g)) {
            modifiers.push("static");
        }
        info.methods.push({
            visibility: methodMatch[1],
            type: methodMatch[2],
            name: methodMatch[3],
            parameters: methodMatch[4]?.trim() || "",
            modifiers,
        });
    }

    // --- Detect and recursively parse inner classes ---
    const innerRegex = /class\s+([\w_]+)\s*\{([\s\S]*?)\}/g;
    let innerMatch;
    while ((innerMatch = innerRegex.exec(content)) !== null) {
        const innerName = innerMatch[1];
        const innerBody = innerMatch[2];
        const innerParsed = parseApexClassContent(innerBody, innerName);
        info.innerClasses.push(innerParsed);
    }

    return info;
}