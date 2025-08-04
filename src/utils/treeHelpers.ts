interface TreeNode {
  name: string;
  projectCount: number;
  children?: TreeNode[];
}

/**
 * Recursively transform tagHierarchy into a TreeNode structure,
 * accumulating project counts and filtering out zero-count nodes.
 *
 * @param hierarchy - the nested tagHierarchy object
 * @param projectTagCounts - map of tag to project count
 * @returns TreeNode or null if no projects in subtree
 */
export function buildTreeFromHierarchy(
  hierarchy: Record<string, any>,
  projectTagCounts: Record<string, number>
): TreeNode | null {

  // Recursive helper
  function helper(node: any, nodeName: string): TreeNode | null {
    let projectCount = 0;
    let children: TreeNode[] = [];

    const value = node[nodeName];
    if (!value) return null;

    if (Array.isArray(value)) {
      // Leaves (tags)
      for (const tag of value) {
        const count = projectTagCounts[tag] || 0;
        if (count > 0) {
          projectCount += count;
          children.push({ name: tag, projectCount: count });
        }
      }
    } else if (typeof value === 'object') {
      // Inner node with children
      for (const childName in value) {
        const childNode = helper(value, childName);
        if (childNode) {
          projectCount += childNode.projectCount;
          children.push(childNode);
        }
      }
    }

    if (projectCount === 0 && children.length === 0) {
      return null; // no projects here
    }

    return {
      name: nodeName,
      projectCount,
      children: children.length > 0 ? children : undefined,
    };
  }

  // The top-level can have multiple root keys, so combine them under a root node:
  const roots: TreeNode[] = [];

  for (const rootName in hierarchy) {
    const rootNode = helper(hierarchy, rootName);
    if (rootNode) roots.push(rootNode);
  }

  // If only one root, return it; else wrap in a common "Root" node
  if (roots.length === 1) return roots[0];
  return {
    name: 'Root',
    projectCount: roots.reduce((sum, r) => sum + r.projectCount, 0),
    children: roots,
  };
}
