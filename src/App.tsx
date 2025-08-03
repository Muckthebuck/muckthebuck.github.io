import React, { useMemo, useState } from 'react';
import Graph from './components/Graph';
import ProjectPanel from './components/ProjectPanel';
import projectsData from './data/projects.json';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import { getTagColorScale } from './utils/colorUtils';
import Intro from './components/Intro';
import './App.css';
import Publications from './components/Publications';

const App: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showLanguages, setShowLanguages] = useState(true);
  const [minDegreeFilter, setMinDegreeFilter] = useState(0);


  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag); // Deselect if clicked again
  };

  const allTags = Array.from(
  new Set(projectsData.flatMap(project => project.tags))
  );
  const tagColorScale = useMemo(() => getTagColorScale(allTags), [allTags]);

  const filteredProjects = selectedTag
    ? projectsData.filter(project => project.tags.includes(selectedTag))
    : projectsData;


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
                  Min Degree: {minDegreeFilter}
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={minDegreeFilter}
                    onChange={e => setMinDegreeFilter(Number(e.target.value))}
                    style={{ marginLeft: 10 }}
                  />
                </label>
              <Graph
                projects={projectsData}
                selectedTag={selectedTag}
                onTagClick={handleTagClick}
                tagColorScale={tagColorScale}
                showLanguages={showLanguages}
                minDegreeFilter={minDegreeFilter}
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