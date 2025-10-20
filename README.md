# Visualforce AI Documentation Generator (TypeScript)

Turn your Salesforce Visualforce code into instant, AI-powered documentation — now fully built with TypeScript for modern development workflows.

A powerful TypeScript-based tool that automatically generates clean, Markdown-formatted documentation for Salesforce Visualforce pages and Apex controllers.  

Perfect for Salesforce developers, consultants, and companies maintaining legacy Visualforce systems who want to save time, improve maintainability, and modernize their codebase.

## 🚀 Features & Benefits

- Extracts Visualforce components such as `<apex:page>`, `<apex:form>`, `<apex:inputField>`, and `<apex:commandButton>`
- Detects controllers, extensions, and `recordSetVar` references
- Parses Apex classes for methods and properties
- ⚡ Enhanced extraction of `<apex:pageBlock>`, `<apex:pageBlockSection>`, and `<apex:pageBlockSectionItem>`
- Generates clean, developer-friendly Markdown files using Handlebars templates
- AI-powered overview and purpose generation for each Visualforce page
- Fallback to inline comments if AI generation fails
- Instantly generate accurate Visualforce documentation
- Improve project maintainability and team collaboration
- Keep your documentation always in sync with your Apex code
- 💡 Helps older companies with legacy Visualforce code understand, maintain, and modernize their Salesforce projects faster

## 🧩 Why Use This Tool?

If you’re a Salesforce developer or consultant, this tool helps you:

- Instantly generate accurate Visualforce documentation
- Improve project maintainability and team collaboration
- Keep your documentation always in sync with your Apex code

## 🛠️ Installation

```bash
git clone https://github.com/M-A-Gharr/visualforce-ai-doc-generator.git
cd visualforce-ai-doc-generator
npm install
```

## ▶️ Usage

Before running the generator, you need to set up your environment variables and connect it to your Salesforce project.

### Step 1: Add the Tool to Your Salesforce Project

Simply copy or clone this repository inside your Salesforce project workspace (for example, alongside your force-app or src folder).

Your Salesforce project might look like this:
```bash
my-salesforce-project/
├── force-app/
│   ├── main/
│   │   ├── default/
│   │   │   ├── pages/
│   │   │   │   └── MyPage.page
│   │   │   └── classes/
│   │   │       └── MyController.cls
├── visualforce-ai-doc-generator/
│   ├── generateVfDocs.ts
│   └── ...
└── package.json

```
### Step 2: Add Your AI API Keys

Copy the example environment file:
```bash
cp .env.example .env
```
Open .env and replace the placeholder values with your actual API keys:
```bash
OPENAI_API_KEY=sk-your-openai-key-here
```
### Step 3: Run the Documentation Generator

From the project root (or inside the visualforce-ai-doc-generator folder), execute:
```bash
npx ts-node generateVfDocs.ts
```
The generator will automatically scan your Salesforce Visualforce and Apex files, then output Markdown documentation in the /docs folder.

Example output:
```bash
/docs
 ├── VisualforcePages.md
 ├── ApexClasses.md
 └── Summary.md
```
If AI keys are invalid or missing, the tool will gracefully fall back to comment-based documentation.

## 🌍 Keywords

Salesforce, Visualforce, Apex, Documentation Generator, Markdown, TypeScript, Node.js, Salesforce Developer Tool

## 💡 Technologies Used

Node.js

TypeScript

Handlebars.js

Salesforce Visualforce

Apex

OpenAI, Copilot, Google AI Studio

## 🙌 Acknowledgements

This project was inspired by Cloudity and the ideas shared by TAHA BASRI.
Special thanks to the SFDX-Hardis team for their open-source contributions to the Salesforce developer community.

## 🤝 Contributing

Contributions, feedback, and suggestions are welcome!
If you’re part of the SFDX-Hardis or Cloudity teams and want to integrate or extend this project, feel free to open an issue or pull request.

## 👤 Author

Mohamed Amine GHARRAB - https://github.com/M-A-Gharr/visualforce-ai-doc-generator-ts