/**
 * Returns all children of a node in the assembly.
 * @param {Array<Node>} structure 
 * @param {Node} node 
 * @return {Array<Node>} children
 */
function getAllChildren(structure, node) {
  let ret = [];
  if (node.children != null) {
    var k = 0;
    for (; k < node.children.length; k++) {
      let obj = ret.find((o) => o.name === structure[node.children[k]].name); // don't add it if it already exists
      if (obj === undefined) {
        ret.push(structure[node.children[k]]);
        if (
          structure[node.children[k]].children != null &&
          structure[node.children[k]].children.length > 1
        ) {
          ret = ret.concat(
            getAllChildren(structure, structure[node.children[k]])
          ); // need to see if there are duplicates here, do so at merge
        }
      }
    }
  }
  return ret;
};

/**
 * Returns all ancestors of a node in the assembly.
 * @param {Array<Node>} structure
 * @param {Node} node 
 */
function getAllAncestors(structure, node) {
  let path = [];

  /**
   * Find the node within the structure with the name. Construct the path along the way.
   * @param {string} name 
   * @param {Node} currentNode 
   * @param {Array<Node>} path 
   * @return {boolean} node found
   */
  const findNode = function (name, currentNode, path) {
    var found = false;
    if (!currentNode || !currentNode.children) {
      return false;
    }
    if (currentNode.name === name) {
      found = true;
      return found;
    }

    path.push(currentNode);
    for (var i = 0; i < currentNode.children.length && !found; i++) {
      found = findNode(name, structure[currentNode.children[i]], path)
    }

    if (!found) {
      path.pop();
    }

    return found;
  }
  findNode(node.name, structure[0], path);

  path = path.filter(node => {
    return node.partnumber != null;
  });

  return path;
}

export { getAllChildren, getAllAncestors };
