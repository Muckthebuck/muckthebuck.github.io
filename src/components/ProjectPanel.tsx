import React, { useState } from 'react';
import { Project } from '../types/Project';
import * as d3 from 'd3';
import { FaGithub } from 'react-icons/fa';
import { PiNewspaperClippingLight } from 'react-icons/pi';
import { IoIosLink } from "react-icons/io";
import './ProjectPanel.css';
import ReactMarkdown from 'react-markdown';

interface ProjectPanelProps {
  projects: Project[];
  selectedTag: string | null;
  tagColorScale: d3.ScaleOrdinal<string, string>;
}

const GitHubIcon = FaGithub as React.ElementType;
const PaperIcon = PiNewspaperClippingLight as React.ElementType;
const LinkIcon = IoIosLink as React.ElementType;

const ITEMS_PER_PAGE = 4; // adjust per screen size/responsiveness

const ProjectPanel: React.FC<ProjectPanelProps> = ({ projects, tagColorScale }) => {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const paginatedProjects = projects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <>
      <div className="project-gallery">
        {paginatedProjects.map((project) => (
          <div
            className="project-card"
            key={project.id}
            onMouseEnter={() => setHoveredProjectId(project.id)}
            onMouseLeave={() => setHoveredProjectId(null)}
            onClick={() => setSelectedProject(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
          >
            <div className="project-card-content">
              <h3 className="project-title">{project.title}</h3>
              <div className="project-tags">
                {project.tags.map(tag => (
                  <span
                    className="project-tag"
                    key={tag}
                    style={{ background: tagColorScale(tag) }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="project-description">{project.description}</div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            ◀ Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next ▶
          </button>
        </div>
      )}

      {selectedProject && (() => {
        const isLongDescription = selectedProject.fullDescription.length > 500;

        return (
          <div
            className="modal-overlay"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            <div
              className={`modal-content${isLongDescription ? '-long' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedProject.bannerImage ? (
                <img
                  src={selectedProject.bannerImage}
                  alt={`${selectedProject.title} banner`}
                  className="modal-banner-image"
                />
              ) : (
                <div className="modal-banner-placeholder" />
              )}
              <h2>{selectedProject.title}</h2>
              <div className="project-tags" style={{ marginBottom: '1rem' }}>
                {selectedProject.tags.map(tag => (
                  <span
                    className="project-tag"
                    key={tag}
                    style={{ background: tagColorScale(tag) }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="modal-links">
                {selectedProject.link && (
                  <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className='modal-link-button'>
                    <LinkIcon style={{ fontSize: '1.4rem' }} />
                    <span>Link</span>
                  </a>
                )}
                {selectedProject.githubLink && (
                  <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className='modal-link-button'>
                    <GitHubIcon style={{ fontSize: '1.4rem' }} />
                    <span>GitHub</span>
                  </a>
                )}
                {selectedProject.paperLink && (
                  <a href={selectedProject.paperLink} target="_blank" rel="noopener noreferrer" className='modal-link-button'>
                    <PaperIcon style={{ fontSize: '1.4rem' }} />
                    <span>Paper</span>
                  </a>
                )}
              </div>
              <ReactMarkdown>{selectedProject.fullDescription}</ReactMarkdown>
            </div>
          </div>
        );
      })()}
    </>
  );
};

export default ProjectPanel;
