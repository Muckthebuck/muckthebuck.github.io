import React, { useMemo, useState } from 'react';
import Graph from './components/Graph';
import ProjectPanel from './components/ProjectPanel';
import projectsData from './data/projects.json';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import { getTagColorScale } from './utils/colorUtils';
import Intro from './components/Intro';
import { hierarchy, type TagNode } from './utils/tagHierarchy'; // import hierarchy & types
import './App.css';
import Publications from './components/Publications';

// Copy your collapseTag, buildParentMap, buildTagSet functions here or import them if you modularized
function buildParentMap(hierarchy: TagNode): Map<string, string | null> {
  const parentMap = new Map<string, string | null>();
  function dfs(node: TagNode, parent: string | null) {
    Object.entries(node).forEach(([tag, children]) => {
      parentMap.set(tag, parent);
      dfs(children, tag);
    });
  }
  dfs(hierarchy, null);
  return parentMap;
}

function buildTagSet(hierarchy: TagNode): Set<string> {
  const set = new Set<string>();
  function dfs(node: TagNode) {
    Object.entries(node).forEach(([tag, children]) => {
      set.add(tag);
      dfs(children);
    });
  }
  dfs(hierarchy);
  return set;
}

function hasChildren(tag: string, hierarchy: TagNode): boolean {
  function dfs(node: TagNode): boolean {
    if (tag in node) {
      return Object.keys(node[tag]).length > 0;
    }
    for (const child of Object.values(node)) {
      if (dfs(child)) return true;
    }
    return false;
  }
  return dfs(hierarchy);
}

function getLevel(tag: string, parentMap: Map<string, string | null>): number {
  let level = 0;
  let current = tag;
  while (parentMap.get(current)) {
    current = parentMap.get(current)!;
    level++;
  }
  return level;
}

function collapseTag(
  tag: string,
  parentMap: Map<string, string | null>,
  maxLevel: number,
  hierarchy: TagNode,
  tagSet: Set<string>,
): string {
  if (!tagSet.has(tag)) {
    return tag;
  }

  let current = tag;
  let level = getLevel(tag, parentMap);

  while (
    (level > maxLevel) ||
    (level >= maxLevel && !hasChildren(current, hierarchy))
  ) {
    if (!parentMap.get(current)) break;
    current = parentMap.get(current)!;
    level--;
  }

  return current;
}

const App: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showLanguages, setShowLanguages] = useState(true);
  const [maxHierarchyLevel, setMaxHierarchyLevel] = useState(0);

  const parentMap = useMemo(() => buildParentMap(hierarchy), []);
  const tagSet = useMemo(() => buildTagSet(hierarchy), []);

  const handleTagClick = (tag: string | null) => {
  setSelectedTag(tag === selectedTag ? null : tag);
  };


  const allTags = useMemo(() => Array.from(new Set(projectsData.flatMap(p => p.tags))), []);

  const tagColorScale = useMemo(() => getTagColorScale(allTags), [allTags]);

  const filteredProjects = useMemo(() => {
    if (!selectedTag) return projectsData;

    return projectsData.filter(project => {
      // Filter project if any of its tags collapse to selectedTag
      return project.tags.some(tag =>
        collapseTag(tag, parentMap, maxHierarchyLevel, hierarchy, tagSet) === selectedTag
      );
    });
  }, [selectedTag, projectsData, parentMap, maxHierarchyLevel, hierarchy, tagSet]);

  return (
    <div className="app">
      <TopBar />
      <main>
        <section id="home">
          <Intro />
        </section>
        <section id="projects">
          <div className="projects-header">
            <h1>Projects</h1>
            <p>Explore my work below — filter by clicking a <strong>graph node</strong>.</p>
            <div className="graph-tip">
              💡 <strong>Tip:</strong> Click a node in the graph to show projects with shared topics.
            </div>
          </div>
          <div className="projects-section">
            <div className="graph-container">
              <button onClick={() => setShowLanguages(prev => !prev)}>
                {showLanguages ? 'Hide Languages' : 'Show Languages'}
              </button>
              <label style={{ marginLeft: 20 }}>
                Depth: {maxHierarchyLevel}
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={maxHierarchyLevel}
                  onChange={e => setMaxHierarchyLevel(Number(e.target.value))}
                  style={{ marginLeft: 10 }}
                />
              </label>
              <Graph
                projects={projectsData}
                selectedTag={selectedTag}
                onTagClick={handleTagClick}
                onReset={() => setSelectedTag(null)}
                tagColorScale={tagColorScale}
                showLanguages={showLanguages}
                maxHierarchyLevel={maxHierarchyLevel}
              />
            </div>
            <div className="project-panel-container">
              <ProjectPanel
                projects={filteredProjects}
                selectedTag={selectedTag}
                tagColorScale={tagColorScale}
              />
            </div>
          </div>
        </section>
        <section id="publications">
          <div className="publications-header">
            <h1>Publications</h1>
            <Publications />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
