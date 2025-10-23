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
    const propRegex =
        /\/\*\*([\s\S]*?)\*\/\s*(public|global|private|protected)\s+([\w<>\[\]]+)\s+([\w_]+)\s*;/g;
    let propMatch;
    while ((propMatch = propRegex.exec(content)) !== null) {
        const [, comment, visibility, type, name] = propMatch;
        info.properties.push({
            name,
            type,
            visibility,
            description: comment?.replace(/\*/g, "").trim() || "",
        });
    }

    // --- Extract Javadoc-style methods ---
    const methodRegex =
        /\/\*\*([\s\S]*?)\*\/\s*(public|global|private|protected)\s+([\w<>\[\]]+)\s+([\w_]+)\s*\(([^)]*)\)\s*\{/g;
    let methodMatch;
    while ((methodMatch = methodRegex.exec(content)) !== null) {
        const [, comment, visibility, type, name, params] = methodMatch;
        info.methods.push({
            name,
            type,
            visibility,
            parameters: params.trim(),
            signature: `${name}(${params})`,
            description: comment?.replace(/\*/g, "").trim() || "",
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