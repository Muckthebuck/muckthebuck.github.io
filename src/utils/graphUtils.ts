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
// import { tagHierarchy as _tags } from './tagHierarchy';
// export interface GraphNode extends d3.SimulationNodeDatum {
//   id: string;
//   tag: string;
//   projectCount: number;
//   x?: number;
//   y?: number;
//   degree?: number;
//   type?: 'tag' | 'hierarchy';
// }

// export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
//   source: string | GraphNode;
//   target: string | GraphNode;
//   type: 'hierarchy' | 'project';
// }

// export function generateGraphData(
//   projects: Project[],
//   tagHierarchy?: Record<string, any>
// ): { nodes: GraphNode[]; links: GraphLink[] } {
//   // Use provided hierarchy or default to the imported one
//   tagHierarchy = tagHierarchy || _tags;
//   const projectTagCounts: Record<string, number> = {};
//   const tagToParent = new Map<string, string>();
//   const nodesMap = new Map<string, GraphNode>();
//   const links: GraphLink[] = [];
//   const tagPairs = new Set<string>();

//   const visibleTags = new Set<string>();
//   const visibleHierarchy = new Set<string>();

//   // Step 1: Count tag usage
//   projects.forEach(project => {
//     project.tags.forEach(tag => {
//       projectTagCounts[tag] = (projectTagCounts[tag] || 0) + 1;
//     });
//   });

//   // Step 2: Recursive hierarchy construction
//   function walkHierarchy(tree: any, parent: string | null = null) {
//     for (const key in tree) {
//       const value = tree[key];

//       if (!nodesMap.has(key)) {
//         nodesMap.set(key, {
//           id: key,
//           tag: key,
//           projectCount: 0,
//           degree: 0,
//           type: 'hierarchy',
//         });
//       }

//       if (parent) {
//         links.push({ source: parent, target: key, type: 'hierarchy' });
//       }

//       if (Array.isArray(value)) {
//         value.forEach((leaf: string) => {
//           tagToParent.set(leaf, key);

//           const count = projectTagCounts[leaf] || 0;

//           if (count > 0) {
//             visibleTags.add(leaf);
//             visibleHierarchy.add(key);
//           }

//           nodesMap.set(leaf, {
//             id: leaf,
//             tag: leaf,
//             projectCount: count,
//             degree: 0,
//             type: 'tag',
//           });

//           links.push({ source: key, target: leaf, type: 'hierarchy' });

//           nodesMap.get(key)!.projectCount += count;
//         });
//       } else if (typeof value === 'object') {
//         walkHierarchy(value, key);
//       }
//     }
//   }

//   walkHierarchy(tagHierarchy);

//   // Step 3: Add project-based cross-links
//   projects.forEach(project => {
//     const tags = project.tags;

//     for (let i = 0; i < tags.length; i++) {
//       for (let j = i + 1; j < tags.length; j++) {
//         const t1 = tags[i];
//         const t2 = tags[j];
//         const key = `${t1}|${t2}`;
//         const rev = `${t2}|${t1}`;

//         if (!tagPairs.has(key) && !tagPairs.has(rev)) {
//           if (nodesMap.has(t1) && nodesMap.has(t2)) {
//             links.push({ source: t1, target: t2, type: 'project' });
//             tagPairs.add(key);

//             visibleTags.add(t1);
//             visibleTags.add(t2);
//           }
//         }
//       }
//     }
//   });

//   // Step 4: Bubble up visibility to parent nodes
//   function markAncestors(tag: string) {
//     let current = tagToParent.get(tag);
//     while (current) {
//       visibleHierarchy.add(current);
//       current = tagToParent.get(current);
//     }
//   }

//   visibleTags.forEach(markAncestors);

//   const finalNodes = Array.from(nodesMap.values()).filter(
//     n => visibleTags.has(n.id) || visibleHierarchy.has(n.id)
//   );

//   const visibleNodeIds = new Set(finalNodes.map(n => n.id));

//   const finalLinks = links.filter(link => {
//     const source = typeof link.source === 'string' ? link.source : link.source.id;
//     const target = typeof link.target === 'string' ? link.target : link.target.id;
//     return visibleNodeIds.has(source) && visibleNodeIds.has(target);
//   });

//   // Degree counts
//   finalLinks.forEach(link => {
//     const source = typeof link.source === 'string' ? link.source : link.source.id;
//     const target = typeof link.target === 'string' ? link.target : link.target.id;
//     if (nodesMap.has(source)) nodesMap.get(source)!.degree! += 1;
//     if (nodesMap.has(target)) nodesMap.get(target)!.degree! += 1;
//   });

//   return {
//     nodes: finalNodes,
//     links: finalLinks,
//   };
// }
