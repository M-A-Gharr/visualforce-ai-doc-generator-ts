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
 * Extracts Javadoc-style comments preceding a code element.
 * Assumes the comment immediately precedes the code.
 */
function extractJavadocDescription(codeBlock: string, startIndex: number): string | undefined {
  // Look backwards from startIndex for a Javadoc-style comment
  const precedingContent = codeBlock.substring(0, startIndex);
  const javadocMatch = precedingContent.match(/\/\*\*([\s\S]*?)\*\/\s*$/);

  if (javadocMatch && javadocMatch[1]) {
    let description = javadocMatch[1]
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('*'))
      .map(line => line.substring(1).trim())
      .filter(line => !line.startsWith('@'))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    return description || undefined;
  }
  return undefined;
}

/**
 * Helper to find the matching closing brace for an opening brace.
 * @param code The full code string.
 * @param startIndex The index of the opening brace.
 * @returns The index of the matching closing brace, or -1 if not found.
 */
function findMatchingBrace(code: string, startIndex: number): number {
  let braceCount = 1;
  for (let i = startIndex + 1; i < code.length; i++) {
    if (code[i] === '{') {
      braceCount++;
    } else if (code[i] === '}') {
      braceCount--;
    }
    if (braceCount === 0) {
      return i;
    }
  }
  return -1; // No matching brace found
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
  const propertyRegex = /(\/\*\*[\s\S]*?\*\/)?\s*(@AuraEnabled\s*)?(public|private|protected|global)\s+(static\s+)?(final\s+)?([\w<>,\s]+)\s+(\w+)\s*(\{[^}]*\})?;/g;
  let propMatch;
  while ((propMatch = propertyRegex.exec(content)) !== null) {
    const [
      ,
      javadocComment,
      aura,
      visibility,
      staticMod,
      finalMod,
      type,
      name
    ] = propMatch;

    if (!name) continue;

    const modifiers = [];
    if (staticMod) modifiers.push("static");
    if (finalMod) modifiers.push("final");
    if (aura) modifiers.push("AuraEnabled");

    let descriptionAI: string | undefined;
    if (javadocComment) {
      descriptionAI = extractJavadocDescription(propMatch[0], javadocComment.length);
    }

    result.properties.push({
      name,
      type: type.trim(),
      visibility: visibility ?? "public",
      modifiers,
      descriptionAI,
    });
  }

  // Detect methods
  const methodRegex = /(\/\*\*[\s\S]*?\*\/)?\s*(@AuraEnabled\s*)?(public|private|protected|global)\s+(static\s+)?(virtual|override|abstract\s+)?([\w<>,\[\]]+)\s+(\w+)\s*\(([^)]*)\)/g;
  let methodMatch;
  while ((methodMatch = methodRegex.exec(content)) !== null) {
    const [
      ,
      javadocComment,
      aura,
      visibility,
      staticMod,
      methodMod,
      type,
      name,
      params
    ] = methodMatch;

    if (!name) continue;

    const modifiers = [];
    if (staticMod) modifiers.push("static");
    if (aura) modifiers.push("AuraEnabled");
    if (methodMod) modifiers.push(methodMod.trim()); // e.g., virtual, override

    let descriptionAI: string | undefined;
    if (javadocComment) {
      descriptionAI = extractJavadocDescription(methodMatch[0], javadocComment.length);
    }

    result.methods.push({
      name,
      type: type.trim(),
      parameters: params.trim(),
      visibility: visibility ?? "public",
      modifiers,
      descriptionAI,
    });
  }

  // Detect inner classes recursively

  const classDeclarationRegex = /(?<vis>public|private|protected|global)\s+(?<stat>static\s+)?class\s+(?<name>\w+)\s*{/g; // Find class declarations
  let classDeclMatch;
  const innerClassContents: { name: string; content: string }[] = [];
  let currentIndex = 0;

  const innerClassDeclOnlyRegex = /(public|private|protected|global)\s+(static\s+)?class\s+(\w+)\s*(?={)/g; // Matches up to the opening brace
  let innerDeclMatch;
  const processedRanges: Array<{ start: number, end: number }> = [];

  while ((innerDeclMatch = innerClassDeclOnlyRegex.exec(content)) !== null) {
    const innerClassName = innerDeclMatch[3];
    const classBodyStart = innerDeclMatch.index + innerDeclMatch[0].length - 1;
    if (content[classBodyStart] === '{') {
      const classBodyEnd = findMatchingBrace(content, classBodyStart);
      if (classBodyEnd !== -1) {
        const innerClassFullContent = content.substring(innerDeclMatch.index, classBodyEnd + 1);
        if (innerClassName === result.className && innerDeclMatch.index === content.indexOf(`class ${result.className}`)) {
          // This is the declaration of the class we're currently parsing, not an inner class.
          continue; // Skip the outer class declaration itself if it gets matched
        }
        const innerInfo = parseApexClass(innerClassFullContent);
        innerInfo.className = innerClassName;
        result.innerClasses.push(innerInfo);
        processedRanges.push({ start: innerDeclMatch.index, end: classBodyEnd + 1 });
      }
    }
  }
  result.properties = result.properties.filter(prop => {
    // Find the index of this property in the original content
    const propIndex = content.indexOf(` ${prop.name} `);
    if (propIndex === -1) return true;

    // Check if this property falls within any of the inner class ranges
    return !processedRanges.some(range => propIndex >= range.start && propIndex < range.end);
  });

  result.methods = result.methods.filter(method => {
    const methodIndex = content.indexOf(` ${method.name}(`);
    if (methodIndex === -1) return true;

    return !processedRanges.some(range => methodIndex >= range.start && methodIndex < range.end);
  });

  return result;
}

/**
 * Parse an Apex class from a file path
 */
export function parseApexClassFile(apexDir: string, className: string): ApexClassInfo | null {
  const filePath = path.join(apexDir, `${className}.cls`);
  if (!fs.existsSync(filePath)) {
    console.warn(`Apex class file not found: ${filePath}`);
    return null;
  }
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return parseApexClass(content);
  } catch (error) {
    console.error(`Error parsing Apex class ${className} from ${filePath}:`, error);
    return null;
  }
}