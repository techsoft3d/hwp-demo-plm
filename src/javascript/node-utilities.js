// Helper Functions
export const getAllChildren = function (structure, node) {
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
