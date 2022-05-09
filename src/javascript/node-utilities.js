// Helper Functions
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

function getAllAncestors(node, structure) {
  this.currentNode = node;
  this.currentNodeList = getAllChildren(structure, node);
  this.viewInfo = true;
  var path = [];

  var findNode = function (name, currentNode, path) {
    var found = false;
    for (var i = 0; i < currentNode.child_objects.length; i++) {
      if (currentNode.child_objects[i].name === name) {
        path.push(currentNode);
        found = true;
      }
      else if (currentNode.child_objects[i].child_objects != null && currentNode.child_objects[i].child_objects.length > 0) {
        path.push(currentNode);
        if (!findNode(name, currentNode.child_objects[i], path)) {
          path.pop();
        }

      }
    }
    return found;
  }
  findNode(node.name, root, path);

  this.usedInNodeList = path;
}

export { getAllChildren, getAllAncestors };
