import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { generateGraphData, GraphNode, GraphLink} from '../utils/graphUtils';
import { Project } from '../types/Project';

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 800;
interface GraphProps {
  projects: Project[];
  selectedTag: string | null;
  onTagClick: (tag: string) => void;
  tagColorScale: d3.ScaleOrdinal<string, string>;
  showLanguages: boolean;
  minDegreeFilter: number; // Optional filter for minimum degree 
}
const Graph: React.FC<GraphProps> = ({ projects, selectedTag, onTagClick, tagColorScale, showLanguages, minDegreeFilter }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const graphData = generateGraphData(projects);
    // Language tag list (lowercase)
    const languageTags = new Set([
      'javascript', 'typescript', 'python', 'c', 'c++', 'rust', 'go', 'java',
      'c#', 'html', 'css', 'shell', 'kotlin', 'swift', 'php', 'ruby', 'matlab'
    ]);

    if (!showLanguages) {
      graphData.nodes = graphData.nodes.filter(n => !languageTags.has(n.tag.toLowerCase()));
      
      const nodeIds = new Set(graphData.nodes.map(n => n.id));

      graphData.links = graphData.links.filter(link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        return nodeIds.has(sourceId) && nodeIds.has(targetId);
      });
    }
    // Filter nodes by minDegreeFilter
    graphData.nodes = graphData.nodes.filter(n => (n.degree ?? 0) >= minDegreeFilter);

    const validNodeIds = new Set(graphData.nodes.map(n => n.id));
    graphData.links = graphData.links.filter(link => {
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
      const targetId = typeof link.target === 'object' ? link.target.id : link.target;
      return validNodeIds.has(sourceId) && validNodeIds.has(targetId);
    });

    const degrees = graphData.nodes.map(n => n.degree ?? 0);
    const minDegree = Math.min(...degrees);
    const maxDegree = Math.max(...degrees);
    // Node size scale: maps degree to radius between 10 and 32
    const radiusScale = d3.scaleLinear()
      .domain([minDegree, maxDegree])
      .range([10, 32]);


    svg.selectAll('*').remove();

    // Set up initial SVG size
    svg.attr('width', '100%').attr('height', 'min(60vw, 800px)');

    // Find neighbors for highlighting
    const neighborSet = new Set<string>();
    if (selectedTag) {
      neighborSet.add(selectedTag);
      graphData.links.forEach(link => {
        if (link.source === selectedTag) neighborSet.add(link.target as string);
        if (link.target === selectedTag) neighborSet.add(link.source as string);
      });
    }

    // D3 simulation
    const simulation = d3
      .forceSimulation<GraphNode>(graphData.nodes)
      .force(
        'link',
        d3
          .forceLink<GraphNode, GraphLink>(graphData.links)
          .id((d: GraphNode) => d.id)
          .distance(180)
      )
      .force('charge', d3.forceManyBody().strength(-130))
      .force('center', d3.forceCenter(DEFAULT_WIDTH / 2, DEFAULT_HEIGHT / 2));

    const link = svg
      .append('g')
      .selectAll('line')
      .data(graphData.links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', (d: GraphLink) =>
        selectedTag && !(neighborSet.has(d.source as string) && neighborSet.has(d.target as string))
          ? 0.1
          : 0.6
      );

    const node = svg
      .append('g')
      .selectAll('circle')
      .data(graphData.nodes)
      .enter()
      .append('circle')
      .attr('r', (d: GraphNode) => {
          if (selectedTag) {
            return neighborSet.has(d.id)
              ? radiusScale(d.degree ?? 0)
              : 8; // Small for non-neighbors
          }
          return radiusScale(d.degree ?? 0);
        })
      .attr('fill', (d: GraphNode) =>
        selectedTag
          ? neighborSet.has(d.id)
            ? tagColorScale(d.tag)
            : '#bbb'
          : tagColorScale(d.tag)
      )
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .style('opacity', (d: GraphNode) =>
        selectedTag
          ? neighborSet.has(d.id)
            ? 1
            : 0.3
          : 1
      )
      .on('click', (_event: MouseEvent, d: GraphNode) => onTagClick(d.tag));

    // Add labels
    const label = svg
      .append('g')
      .selectAll('text')
      .data(graphData.nodes)
      .enter()
      .append('text')
      .text((d: GraphNode) => d.tag)
      .attr('font-size', '12px')
      .attr('text-anchor', 'middle')
      .attr('pointer-events', 'none')
      .attr('fill', '#333');

    // Dynamically fit content after simulation ends
    simulation.on('end', () => {
      // Compute bounding box of all nodes
      const xs = graphData.nodes.map(n => n.x ?? 0);
      const ys = graphData.nodes.map(n => n.y ?? 0);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);

      // Add padding
      const padding = 40;
      const viewBox = [
        minX - padding,
        minY - padding,
        maxX - minX + 2 * padding,
        maxY - minY + 2 * padding
      ].join(' ');

      svg.attr('viewBox', viewBox);
    });

    simulation.on('tick', () => {
      link
        .attr('x1', (d: GraphLink) => (typeof d.source === 'object' ? d.source.x : 0)!)
        .attr('y1', (d: GraphLink) => (typeof d.source === 'object' ? d.source.y : 0)!)
        .attr('x2', (d: GraphLink) => (typeof d.target === 'object' ? d.target.x : 0)!)
        .attr('y2', (d: GraphLink) => (typeof d.target === 'object' ? d.target.y : 0)!);

      node
        .attr('cx', (d: GraphNode) => d.x!)
        .attr('cy', (d: GraphNode) => d.y!);

      label
        .attr('x', (d: GraphNode) => d.x!)
        .attr('y', (d: GraphNode) => (d.y ?? 0) - 15);
    });

    (simulation.force('link') as d3.ForceLink<GraphNode, GraphLink>).links(graphData.links);
  }, [projects, selectedTag, onTagClick, tagColorScale, showLanguages, minDegreeFilter]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 600" // This is important for responsive scaling
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: '100%',
        height: 'auto',
        aspectRatio: '4 / 3',
        maxWidth: '100%',
        minHeight: '300px',
        display: 'block',
        margin: '0 auto',
      }}
    />
  );
};

export default Graph;