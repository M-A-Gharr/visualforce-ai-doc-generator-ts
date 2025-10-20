import fs from "fs";
import path from "path";

export interface ApexProperty {
  name: string;
  type: string;
  visibility: string;
  modifiers: string[];
  descriptionAI?: string;
}

export interface ApexMethod {
  name: string;
  type: string;
  parameters: string;
  visibility: string;
  modifiers: string[];
  descriptionAI?: string;
}

export interface ApexClassInfo {
  className: string;
  properties: ApexProperty[];
  methods: ApexMethod[];
  innerClasses: ApexClassInfo[];
}

/**
 * Parse a single Apex class content into properties, methods, and inner classes
 */
export function parseApexClass(content: string): ApexClassInfo {
  const classRegex = /(?<modifier>public|private|global)?\s*(?<sharing>with sharing|without sharing)?\s*class\s+(?<name>\w+)\s*{([\s\S]*?)^}/gm;
  
  const result: ApexClassInfo = {
    className: "Unknown",
    properties: [],
    methods: [],
    innerClasses: [],
  };

  const topLevelClassMatch = content.match(/(?<=class\s)\w+/);
  if (topLevelClassMatch) {
    result.className = topLevelClassMatch[0];
  }

  // Detect properties
  const propertyRegex = /(@AuraEnabled\s*)?(public|private|protected)\s+(static\s+)?([\w<>,\s]+)\s+(\w+)\s*(\{[^}]*\})?;/g;
  let propMatch;
  while ((propMatch = propertyRegex.exec(content)) !== null) {
    const [, aura, visibility, staticMod, type, name] = propMatch;
    const modifiers = [];
    if (staticMod) modifiers.push("static");
    if (aura) modifiers.push("AuraEnabled");

    result.properties.push({
      name,
      type: type.trim(),
      visibility: visibility ?? "public",
      modifiers,
    });
  }

  // Detect methods
  const methodRegex = /(@AuraEnabled\s*)?(public|private|protected)\s+(static\s+)?([\w<>,\[\]]+)\s+(\w+)\s*\(([^)]*)\)/g;
  let methodMatch;
  while ((methodMatch = methodRegex.exec(content)) !== null) {
    const [, aura, visibility, staticMod, type, name, params] = methodMatch;
    const modifiers = [];
    if (staticMod) modifiers.push("static");
    if (aura) modifiers.push("AuraEnabled");

    result.methods.push({
      name,
      type: type.trim(),
      parameters: params.trim(),
      visibility: visibility ?? "public",
      modifiers,
    });
  }

  // Detect inner classes recursively
  const innerClassRegex = /(public|private|protected)?\s*class\s+(\w+)\s*{([\s\S]*?)\n}/g;
  let innerMatch;
  while ((innerMatch = innerClassRegex.exec(content)) !== null) {
    const [, , innerName, innerBody] = innerMatch;
    const innerInfo = parseApexClass(innerBody);
    innerInfo.className = innerName;
    result.innerClasses.push(innerInfo);
  }

  return result;
}

/**
 * Parse an Apex class from a file path
 */
export function parseApexClassFile(apexDir: string, className: string): ApexClassInfo {
  const filePath = path.join(apexDir, `${className}.cls`);
  if (!fs.existsSync(filePath)) return { className, properties: [], methods: [], innerClasses: [] };
  const content = fs.readFileSync(filePath, "utf-8");
  return parseApexClass(content);
}
