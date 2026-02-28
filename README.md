# AI & Data Engineer Portfolio

A modern, fast, and dark-themed portfolio built for AI Engineers and Data Engineers.
Built with Astro, Tailwind CSS, TypeScript, and Framer Motion.

## 🚀 Features
- **Astro Content Collections:** Type-safe markdown/mdx parsing for projects.
- **Islands Architecture:** Interactive React components only where needed (filtering, animations).
- **Tailwind CSS Elements:** Custom dark theme palette specifically chosen for readability and contrast.
- **Framer Motion Elements:** Tasteful micro-interactions, scroll reveals, and responsive layout filtering.
- **Performance:** Perfect Lighthouse scores expected. Zero heavy JavaScript bundles on static pages.

## 💻 Project Setup & Development

### Prerequisites
- Node.js (v18+)
- npm

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Building for Production
```bash
npm run build
```

---

## 📝 How to Add a New Project

The portfolio is primarily content-driven. You do not need to touch the code to add a new case study.
All projects live in `src/content/projects/`.

1. Create a new `.md` or `.mdx` file in `src/content/projects/` (e.g., `my-new-project.mdx`).
2. Add the required frontmatter YAML at the top of the file. Here is the schema:

```yaml
---
title: "Project Title"
slug: "clean-url-slug"
date: "2024-06-01T00:00:00.000Z"
featured: true                     # Set to true to highlight the project
tags: ["AI", "Python", "React"]    # Used for filtering on the Projects page
role: "AI Engineer"
stack: ["LangChain", "FastAPI"]
summary: "A brief 1-2 sentence summary of the project."
problem: "What was the core problem you were trying to solve?"
approach: "How did you solve it?"
results: "What was the measurable impact?"
links:
  github: "https://github.com/..." # Optional
  demo: "https://demo.example.com" # Optional
  paper: "https://arxiv.org/..."   # Optional
---

## Deep Dive Details
Write your long-form markdown content here. It will be rendered at the bottom of the project page. You can use standard markdown syntax!
```

3. The site will automatically type-check this frontmatter and add it to the `/projects` list, fully integrated into the search and filter React Island.

## 🛠 Changing Skills

The skills displayed on the `/about` page are controlled by a simple JSON file.
Edit `src/content/skills.json`:

```json
{
  "aiml": ["PyTorch", "TensorFlow"],
  "data": ["Pandas", "Spark"],
  "tools": ["Docker", "Git"],
  "cloud": ["AWS", "GCP"]
}
```
