# Project Title: Interactive Portfolio with Tag Graph

## Overview
This project is a modular React + TypeScript portfolio website that visualizes projects using a tag-based graph. Users can interact with tags to filter and view associated projects.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Data Format](#data-format)
- [Graph Behavior](#graph-behavior)
- [Contributing](#contributing)
- [License](#license)

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourname/portfolio-site.git
   ```
2. Navigate to the project directory:
   ```
   cd portfolio-site
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
To start the development server, run:
```
npm start
```
Open your browser and navigate to `http://localhost:3000` to view the application.

## Folder Structure
```
portfolio-site/
├── public/
│   └── index.html                # HTML template for React root
├── src/
│   ├── assets/                   # Static assets (e.g., logos, images)
│   ├── components/
│   │   ├── Graph.tsx             # Renders interactive tag graph
│   │   ├── ProjectPanel.tsx      # Shows list of projects filtered by selected tag
│   ├── data/
│   │   └── projects.json         # Project data
│   ├── utils/
│   │   └── graphUtils.ts         # Utility functions for graph visualization
│   ├── App.tsx                   # Main app layout
│   ├── index.tsx                 # Entry point
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

## Data Format
The project data is stored in `src/data/projects.json` and follows this structure:
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

## Graph Behavior
- Tags are represented as nodes, and edges connect tags that co-occur in at least one project.
- Clicking a tag filters the project list to show relevant projects.
- The graph layout is dynamic and responsive.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.