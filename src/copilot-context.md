# 🎯 Project Context: Interactive Portfolio with Tag Graph

This is a modular, React + TypeScript portfolio site that visualizes projects using a **tag-based graph**. Users can click tags (nodes) to view associated projects.

---

## 🗂️ Folder Structure & Purpose

```
portfolio-site/
├── public/
│   └── index.html                # HTML template for React root
├── src/
│   ├── assets/                   # Static assets (e.g., logos, images)
│   ├── components/
│   │   ├── Graph.tsx             # Renders interactive tag graph (e.g., using D3.js or vis-network)
│   │   ├── ProjectPanel.tsx      # Shows list of projects filtered by selected tag
│   ├── data/
│   │   └── projects.json         # Flat array of project objects with title, tags, description, etc.
│   ├── utils/
│   │   └── graphUtils.ts         # Converts project/tag data into graph-friendly nodes + links
│   ├── App.tsx                   # Main app layout; connects graph and project panel
│   ├── index.tsx                 # Entry point
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧱 Data Format (`projects.json`)

```json
[
  {
    "id": "p1",
    "title": "Graph Portfolio",
    "description": "Visual portfolio using interactive tags and bubbles.",
    "tags": ["React", "D3", "Visualization"],
    "link": "https://github.com/yourname/graph-portfolio"
  }
]
```

---

## ⚙️ Graph Behavior

* Tags are nodes; edges connect tags that co-occur in at least one project
* Clicking a tag node filters the project list to show relevant projects
* The graph layout is dynamic (force-directed, etc.)
* Projects are not nodes — they are shown in `ProjectPanel` on tag click

---

## 👨‍💻 Copilot Prompt Hints

Copilot should:

* Autocomplete graph logic in `graphUtils.ts`
* Suggest React hooks and event handlers for node clicks in `Graph.tsx`
* Filter and display projects by selected tag in `ProjectPanel.tsx`
* Autogenerate types/interfaces from `projects.json`
* Recommend responsive layout/styling in `App.tsx`

---

## 📝 Optional Enhancements

* Animate node selection
* Add tag frequency (size = # of projects)
* Tooltip or modal for project preview
* Export filtered project list (as JSON or Markdown)
* Implement search/filter functionality for tags