import React, { useMemo, useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import * as d3 from 'd3-force';
import { Project } from '../types/Project';
import { hierarchy, type TagNode } from '../utils/tagHierarchy';

interface Node {
  id: string;
  val: number; // size of node
  color: string;
  x?: number;
  y?: number;
}

interface Link {
  source: string;
  target: string;
  dashed?: boolean;
}

interface GraphProps {
  projects: Project[];
  selectedTag: string | null;
  onTagClick: (tag: string | null) => void;
  tagColorScale: (tag: string) => string;
  showLanguages: boolean;
  maxHierarchyLevel: number;
  onReset: () => void;
}


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
  tagSet: Set<string>
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

function getChildren(tag: string, hierarchy: TagNode): string[] {
  let children: string[] = [];
  function dfs(node: TagNode) {
    if (tag in node) {
      children = Object.keys(node[tag]);
      return true;
    }
    for (const childNode of Object.values(node)) {
      if (dfs(childNode)) return true;
    }
    return false;
  }
  dfs(hierarchy);
  return children;
}

const Graph: React.FC<GraphProps> = ({
  projects,
  selectedTag,
  onTagClick,
  tagColorScale,
  showLanguages,
  maxHierarchyLevel,
  onReset
}) => {
  const graphRef = useRef<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!graphRef.current) return;
      var padding = 200; // default padding
      if (containerRef.current) {
        padding = Math.min(containerRef.current.clientWidth, containerRef.current.clientHeight) * 0.3;
      }
      const timeout = setTimeout(() => {
      graphRef.current.zoomToFit(400, padding); // duration ms, padding px
    }, 100);

    return () => clearTimeout(timeout);
  }, []); // empty dependency: only runs once on mount


  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const languageTags = useMemo(
    () =>
      new Set([
        'javascript',
        'typescript',
        'python',
        'c',
        'c++',
        'rust',
        'go',
        'java',
        'c#',
        'html',
        'css',
        'shell',
        'kotlin',
        'swift',
        'php',
        'ruby',
        'matlab',
      ]),
    []
  );

  const parentMap = useMemo(() => buildParentMap(hierarchy), []);
  const tagSet = useMemo(() => buildTagSet(hierarchy), []);

  // Build nodes and links, filtering nodes that do not appear in projects
  const { nodes, links } = useMemo(() => {
    const tagCount = new Map<string, number>();

    projects.forEach(project => {
      const filteredTags = showLanguages
        ? project.tags
        : project.tags.filter(t => !languageTags.has(t.toLowerCase()));

      const collapsedTags = filteredTags.map(t =>
        collapseTag(t, parentMap, maxHierarchyLevel, hierarchy, tagSet)
      );

      let finalTags: string[] = [];

      collapsedTags.forEach(tag => {
        if (expandedNodes.has(tag)) {
          const children = getChildren(tag, hierarchy);
          if (children.length > 0) {
            finalTags.push(...children);
          } else {
            finalTags.push(tag);
          }
        } else {
          finalTags.push(tag);
        }
      });

      // Unique final tags only
      Array.from(new Set(finalTags)).forEach(tag => {
        tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
      });
    });

    // Only include nodes that have a count (i.e., appear in projects)
    const nodes: Node[] = Array.from(tagCount.entries()).map(([tag, count]) => ({
      id: tag,
      val: count,
      color: tagColorScale(tag) || '#888',
    }));

    // Build links based on co-occurrence of tags per project
    const linkMap = new Map<string, Link>();

    projects.forEach(project => {
      const filteredTags = showLanguages
        ? project.tags
        : project.tags.filter(t => !languageTags.has(t.toLowerCase()));

      const collapsedTags = filteredTags.map(t =>
        collapseTag(t, parentMap, maxHierarchyLevel, hierarchy, tagSet)
      );

      let finalTags: string[] = [];

      collapsedTags.forEach(tag => {
        if (expandedNodes.has(tag)) {
          const children = getChildren(tag, hierarchy);
          if (children.length > 0) {
            finalTags.push(...children);
          } else {
            finalTags.push(tag);
          }
        } else {
          finalTags.push(tag);
        }
      });

      const uniqueTags = Array.from(new Set(finalTags));

      for (let i = 0; i < uniqueTags.length; i++) {
        for (let j = i + 1; j < uniqueTags.length; j++) {
          const source = uniqueTags[i];
          const target = uniqueTags[j];
          const key = [source, target].sort().join('---');
          if (!linkMap.has(key)) {
            linkMap.set(key, { source, target });
          }
        }
      }
    });

    return { nodes, links: Array.from(linkMap.values()) };
  }, [
    projects,
    tagColorScale,
    showLanguages,
    languageTags,
    parentMap,
    tagSet,
    maxHierarchyLevel,
    expandedNodes,
  ]);

  // Highlight connected nodes of selected tag
  const highlightSet = useMemo(() => {
      if (!selectedTag) return null;

      const coTags = new Set<string>();
      coTags.add(selectedTag);

      projects.forEach(project => {
        const filteredTags = showLanguages
          ? project.tags
          : project.tags.filter(t => !languageTags.has(t.toLowerCase()));

        const collapsedTags = filteredTags.map(t =>
          collapseTag(t, parentMap, maxHierarchyLevel, hierarchy, tagSet)
        );

        let finalTags: string[] = [];

        collapsedTags.forEach(tag => {
          if (expandedNodes.has(tag)) {
            const children = getChildren(tag, hierarchy);
            if (children.length > 0) {
              finalTags.push(...children);
            } else {
              finalTags.push(tag);
            }
          } else {
            finalTags.push(tag);
          }
        });

        const uniqueTags = new Set(finalTags);
        if (uniqueTags.has(selectedTag)) {
          uniqueTags.forEach(tag => coTags.add(tag));
        }
      });

      return coTags;
    }, [
      selectedTag,
      projects,
      showLanguages,
      languageTags,
      parentMap,
      tagSet,
      maxHierarchyLevel,
      expandedNodes,
    ]);


  // Setup forces once graph ref and data ready
  useEffect(() => {
    if (!graphRef.current) return;

    const centerX = containerRef.current ? containerRef.current.clientWidth / 2 : 400;
    const centerY = containerRef.current ? containerRef.current.clientHeight / 2 : 300;

    graphRef.current.d3Force('charge', d3.forceManyBody().strength(-250));
    graphRef.current.d3Force('link', d3.forceLink().id((d: any) => d.id).distance(140).strength(1));
    graphRef.current.d3Force('center', d3.forceCenter(centerX, centerY));
    graphRef.current.d3Force(
      'collide',
      d3.forceCollide().radius((node: any) => Math.sqrt(node.val) * 7 + 15)
    );

    graphRef.current.d3ReheatSimulation();
  }, [nodes, links]);
  const getNodeRadius = (val: number) => Math.log(val + 1) * 10;

  return (
    <div ref={containerRef} style={{ position: 'relative', height: '100%' }}>
      {selectedTag && (
        <button
          onClick={() => {
            graphRef.current?.zoomToFit(400, 40); // duration ms, padding px
            onTagClick(null); // clear selection
            if (onReset) onReset(); // optional callback to parent
          }}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 10,
            padding: '6px 12px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Reset
        </button>
      )}
      <ForceGraph2D
        ref={graphRef}
        graphData={{ nodes, links }}
        nodeColor={node => node.color}
        nodeCanvasObject={(node: Node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 12 / globalScale;

          const isHighlighted = !highlightSet || highlightSet.has(node.id);
          ctx.fillStyle = isHighlighted ? node.color : '#ddd';
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, getNodeRadius(node.val), 0, 2 * Math.PI, false);

          ctx.fill();

          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = isHighlighted ? '#000' : '#bbb';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(label, node.x!, node.y! - Math.sqrt(node.val) * 6 - 5);
        }}
        linkWidth={link =>
          highlightSet && highlightSet.has(link.source as string) && highlightSet.has(link.target as string)
            ? 2
            : 1
        }
        linkColor={link =>
          highlightSet && highlightSet.has(link.source as string) && highlightSet.has(link.target as string)
            ? '#000'
            : '#ccc'
        }
        onNodeClick={(node: Node) => {
          onTagClick(node.id);
        }}
        cooldownTicks={100}
        width={containerRef.current?.clientWidth || 800}
        height={containerRef.current?.clientHeight || 600}
        backgroundColor="#f0f0f0"
      />
    </div>
  );
};

export default Graph;
