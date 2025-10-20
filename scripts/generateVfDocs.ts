import fs from "fs-extra";
import path from "path";
import "dotenv/config";
import Handlebars from "handlebars";
import { parseVfPage, VfPageInfo } from "./vfParser";

export async function generateVisualforceDocs(projectRoot: string, outputDir: string) {
  console.log("🎬 Starting Visualforce documentation generation...");

  const pagesDir = path.join(projectRoot, "force-app", "main", "default", "pages");
  if (!fs.existsSync(pagesDir)) return console.log(`No pages directory found at ${pagesDir}`);

  const files = await fs.readdir(pagesDir);
  const pageFiles = files.filter(f => f.endsWith(".page"));
  if (pageFiles.length === 0) return console.log("No Visualforce pages found.");

  await fs.ensureDir(outputDir);

  const templatePath = path.join(projectRoot, "templates", "visualforce-page.hbs");
  const templateContent = await fs.readFile(templatePath, "utf-8");
  const template = Handlebars.compile(templateContent, { noEscape: true });

  const apexDir = path.join(projectRoot, "force-app", "main", "default", "classes");

  // Register helper for joins
  Handlebars.registerHelper("join", function (arr: string[], sep: string) {
    return arr?.join(sep);
  });

  for (const file of pageFiles) {
    const filePath = path.join(pagesDir, file);
    const content = await fs.readFile(filePath, "utf-8");

    const metaFile = path.join(pagesDir, file.replace(/\.page$/, ".page-meta.xml"));
    let metaXml = "";
    if (await fs.pathExists(metaFile)) metaXml = await fs.readFile(metaFile, "utf-8");

    const pageInfo: VfPageInfo = await parseVfPage(content, metaXml, apexDir, filePath);
    const mdFile = path.join(outputDir, `${path.basename(file, ".page")}.md`);

    const mdContent = template({
      pageName: path.basename(file, ".page"),
      pageMeta: pageInfo.pageMeta,
      standardController: pageInfo.standardController,
      customController: pageInfo.customController,
      extensions: pageInfo.extensions,
      properties: pageInfo.properties,
      methods: pageInfo.methods,
      pageStructure: pageInfo.pageStructure,
      overview: pageInfo.overview,
      purpose: pageInfo.purpose,
      keyFunctions: pageInfo.keyFunctions,
      interactions: pageInfo.interactions,
      actionSupports: pageInfo.actionSupports,
      outputPanels: pageInfo.outputPanels,
      pageBlocksAI: pageInfo.pageBlocksAI,
      dependencies: pageInfo.dependencies,
      scripts: pageInfo.scripts,
    });

    await fs.writeFile(mdFile, mdContent, "utf-8");
    console.log(`✅ Wrote ${mdFile}`);
  }

  console.log(`✨ Visualforce documentation generated into ${outputDir}`);
}

// Run standalone
if (require.main === module) {
  const projectRoot = process.cwd();
  const out = path.join(projectRoot, "docs", "vfpages");
  generateVisualforceDocs(projectRoot, out).catch(err => {
    console.error("Error generating VF docs:", err);
    process.exit(1);
  });
}