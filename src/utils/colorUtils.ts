import * as d3 from 'd3';

export const getTagColorScale = (tags: string[]) =>
  d3.scaleOrdinal(d3.schemeCategory10).domain(tags);