import { Project } from '../types/Project';

export interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  tag: string;
  projectCount: number;
  x?: number;
  y?: number;
  degree?: number;
}

export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
}



export function generateGraphData(projects: Project[]): { nodes: GraphNode[]; links: GraphLink[] } {
  const tagCount: { [key: string]: number } = {};
  const links: GraphLink[] = [];
  const degreeCount: { [key: string]: number } = {};

  // Count occurrences of each tag
  projects.forEach(project => {
    project.tags.forEach((tag: string) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  // Create links and count degrees
  const tagPairs = new Set<string>();
  projects.forEach(project => {
    project.tags.forEach((tag1: string, i: number) => {
      project.tags.forEach((tag2: string, j: number) => {
        if (i < j) {
          const key = [tag1, tag2].sort().join('|');
          if (!tagPairs.has(key)) {
            links.push({ source: tag1, target: tag2 });
            tagPairs.add(key);
            degreeCount[tag1] = (degreeCount[tag1] || 0) + 1;
            degreeCount[tag2] = (degreeCount[tag2] || 0) + 1;
          }
        }
      });
    });
  });

  // Create nodes with degree
  const nodes: GraphNode[] = Object.keys(tagCount).map((tag: string) => ({
    id: tag,
    tag: tag,
    projectCount: tagCount[tag],
    degree: degreeCount[tag] || 0,
  }));

  return { nodes, links };
}