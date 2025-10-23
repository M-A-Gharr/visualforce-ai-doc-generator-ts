import fs from "fs-extra";
import path from "path";
import Handlebars from "handlebars";
import { parseVfPage } from "./vfParser";
import { CacheManager } from "./utils/cacheManager";
import { AiManager } from "./AIProvider/AiManager";
import { OpenAiProvider } from "./AIProvider/openAiProvider";
import { VfPageInfo } from "./utils/types";

export async function generateVisualforceDocs(projectRoot: string, outputDir: string) {
  console.log("🎬 Starting Visualforce documentation generation...");

  // === PATHS
  const pagesDir = path.join(projectRoot, "force-app", "main", "default", "pages");
  const apexDir = path.join(projectRoot, "force-app", "main", "default", "classes");
  const templatePath = path.join(projectRoot, "templates", "visualforce-page.hbs");
  const cacheFilePath = path.join(projectRoot, "cache", "ai_cache.json");

  // === CHECKS
  if (!fs.existsSync(pagesDir)) {
    console.log(`❌ No pages directory found at ${pagesDir}`);
    return;
  }

  const files = await fs.readdir(pagesDir);
  const pageFiles = files.filter(f => f.endsWith(".page"));
  if (pageFiles.length === 0) {
    console.log("❌ No Visualforce pages found.");
    return;
  }

  await fs.ensureDir(outputDir);

  // === TEMPLATE SETUP
  const templateContent = await fs.readFile(templatePath, "utf-8");
  const template = Handlebars.compile(templateContent, { noEscape: true });

  // === HANDLEBARS HELPERS
  Handlebars.registerHelper("join", function (arr: string[], sep: string) {
    return arr?.join(sep);
  });

  // === INIT MANAGERS
  const aiManager = new AiManager([new OpenAiProvider()]);
  const cacheManager = new CacheManager(cacheFilePath);

  console.log(`📂 Found ${pageFiles.length} Visualforce pages.`);

  // === MAIN LOOP
  for (const file of pageFiles) {
    const filePath = path.join(pagesDir, file);
    const content = await fs.readFile(filePath, "utf-8");
    const pageName = path.basename(file, ".page");

    console.log(`\n📄 Processing: ${pageName}...`);

    // --- META XML
    const metaFile = path.join(pagesDir, file.replace(/\.page$/, ".page-meta.xml"));
    let metaXml = "";
    if (await fs.pathExists(metaFile)) metaXml = await fs.readFile(metaFile, "utf-8");

    // --- PARSE PAGE
    const pageInfo: VfPageInfo = await parseVfPage(content, metaXml, apexDir, filePath);

    // --- OVERVIEW & PURPOSE (CACHE)
    const overviewKey = `overview_${pageName}`;
    const cachedOverview = cacheManager.get(overviewKey);
    let overviewPurpose;

    if (cachedOverview) {
      console.log(`✅ Using cached overview/purpose for ${pageName}`);
      overviewPurpose = cachedOverview;
    } else {
      console.log(`🤖 Generating AI overview/purpose for ${pageName}...`);
      overviewPurpose = await aiManager.generateOverviewPurpose(pageName, content);
      cacheManager.set(overviewKey, overviewPurpose);
    }

    pageInfo.overview = overviewPurpose.overview || "";
    pageInfo.purpose = overviewPurpose.purpose || "";

    // --- MEMBER DESCRIPTIONS (CACHE)
    const membersKey = `members_${pageName}`;
    const cachedMembers = cacheManager.get(membersKey);

    if (cachedMembers) {
      console.log(`✅ Using cached AI member descriptions for ${pageName}`);
      pageInfo.properties.forEach(p => {
        if (cachedMembers.properties[p.name]) p.descriptionAI = cachedMembers.properties[p.name];
      });
      pageInfo.methods.forEach(m => {
        if (cachedMembers.methods[m.name]) m.descriptionAI = cachedMembers.methods[m.name];
      });
    } else {
      if (aiManager.hasMemberGenerator) {
        console.log(`🤖 Enriching member descriptions for ${pageName}...`);
        await aiManager.enrichMembersWithDescriptions(pageName, pageInfo.properties, pageInfo.methods);
        cacheManager.set(membersKey, {
          properties: Object.fromEntries(pageInfo.properties.map(p => [p.name, p.descriptionAI])),
          methods: Object.fromEntries(pageInfo.methods.map(m => [m.name, m.descriptionAI])),
        });
      }
    }

    // --- WRITE MARKDOWN
    const mdFile = path.join(outputDir, `${pageName}.md`);
    const mdContent = template(pageInfo);

    await fs.writeFile(mdFile, mdContent, "utf-8");
    console.log(`✅ Wrote ${mdFile}`);
  }

  // === SAVE CACHE
  cacheManager.save();
  console.log("\n💾 Cache saved successfully.");
  console.log("✨ Visualforce documentation generation complete!");
}

// === CLI EXECUTION
if (require.main === module) {
  const projectRoot = process.cwd();
  const out = path.join(projectRoot, "docs", "vfpages");

  generateVisualforceDocs(projectRoot, out).catch(err => {
    console.error("❌ Error generating VF docs:", err);
    process.exit(1);
  });
}