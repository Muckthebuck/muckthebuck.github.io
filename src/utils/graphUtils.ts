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


// import { Project } from '../types/Project';
// import { tagHierarchy } from './tagHierarchy';

// export interface GraphNode extends d3.SimulationNodeDatum {
//   id: string;
//   tag: string;
//   projectCount: number;
//   hierarchyLevel?: number;
//   degree?: number;
// }

// export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
//   source: string | GraphNode;
//   target: string | GraphNode;
// }

// export function generateGraphData(projects: Project[]): { nodes: GraphNode[]; links: GraphLink[] } {
//   const tagCount: Record<string, number> = {};
//   const nodesMap: Map<string, GraphNode> = new Map();
//   const links: GraphLink[] = [];

//   // Count tags from projects
//   for (const project of projects) {
//     for (const tag of project.tags) {
//       tagCount[tag] = (tagCount[tag] || 0) + 1;
//     }
//   }

//   // Flatten hierarchy into parent-child edges and assign levels
//   const visited = new Set<string>();
//   const queue: { tag: string; level: number }[] = [];

//   for (const root in tagHierarchy) {
//     queue.push({ tag: root, level: 1 });
//   }

//   while (queue.length) {
//     const { tag, level } = queue.shift()!;

//     if (visited.has(tag)) continue;
//     visited.add(tag);

//     if (!nodesMap.has(tag)) {
//       nodesMap.set(tag, {
//         id: tag,
//         tag,
//         projectCount: tagCount[tag] || 0,
//         hierarchyLevel: level,
//         degree: 0,
//       });
//     }

//     const children = tagHierarchy[tag] || [];
//     for (const child of children) {
//       // Create child node if not present
//       if (!nodesMap.has(child)) {
//         nodesMap.set(child, {
//           id: child,
//           tag: child,
//           projectCount: tagCount[child] || 0,
//           hierarchyLevel: level + 1,
//           degree: 0,
//         });
//       }

//       links.push({ source: tag, target: child });

//       queue.push({ tag: child, level: level + 1 });
//     }
//   }

//   // Add nodes that were in projects but not in hierarchy
//   for (const tag of Object.keys(tagCount)) {
//     if (!nodesMap.has(tag)) {
//       nodesMap.set(tag, {
//         id: tag,
//         tag,
//         projectCount: tagCount[tag],
//         hierarchyLevel: 5, // fallback level
//         degree: 0,
//       });
//     }
//   }

//   // Compute degree
//   for (const link of links) {
//     const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
//     const targetId = typeof link.target === 'string' ? link.target : link.target.id;
//     nodesMap.get(sourceId)!.degree! += 1;
//     nodesMap.get(targetId)!.degree! += 1;
//   }

//   return {
//     nodes: Array.from(nodesMap.values()),
//     links,
//   };
// }
