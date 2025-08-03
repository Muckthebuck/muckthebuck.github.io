import React, { useState, useEffect } from 'react';
import Graph from './components/Graph';
import ProjectPanel from './components/ProjectPanel';
import projectsData from './data/projects.json';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import { getTagColorScale } from './utils/colorUtils';
import Intro from './components/Intro';

const App: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag); // Deselect if clicked again
  };

  const allTags = Array.from(
  new Set(projectsData.flatMap(project => project.tags))
  );
  const tagColorScale = getTagColorScale(allTags);

    
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
          <div className="projects-section">
            <div className="graph-container">
              <Graph
                projects={projectsData}
                selectedTag={selectedTag}
                onTagClick={handleTagClick}
                tagColorScale={tagColorScale}
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
          <h2>Publications</h2>
          <p>Coming soon!</p>
        </section>
        <section id="contact">
          <h2>Contact</h2>
          <p>Feel free to reach out via email or social media.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};
// const App: React.FC = () => {
//   const [selectedTag, setSelectedTag] = useState<string | null>(null);
//   const [projects, setProjects] = useState(projectsData);

//   const handleTagClick = (tag: string) => {
//     setSelectedTag(tag);
//   };

//   useEffect(() => {
//     if (selectedTag) {
//       const filteredProjects = projectsData.filter(project =>
//         project.tags.includes(selectedTag)
//       );
//       setProjects(filteredProjects);
//     } else {
//       setProjects(projectsData);
//     }
//   }, [selectedTag]);

//   return (
//     <div className="app">
//       <Graph projects={projects} onTagClick={handleTagClick} />
//       <ProjectPanel projects={projects} selectedTag={selectedTag} />
//     </div>
//   );
// };

export default App;