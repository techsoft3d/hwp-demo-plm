import assemblies from "../data/assemblies.json";
import users from "../data/users.json";
import { getAllChildren } from "./node-utilities";

const Model_Data_Path = "/src/model-data";

function getAssembly(projectNumber) {
  let result = null;
  assemblies.forEach(assembly => {
    if (assembly.projectNumber == projectNumber) {
      result = assembly;
    }
  });

  return result;
}

function getUser(userId) {
  let result = null;
  users.forEach(user => {
    if (user.id == userId) {
      result = user;
    }
  });

  return result;
}

/**
 * Construct the structure for a project.
 * @param {string} projectNumber
 * @return {object} structure
 */
async function loadStructure(projectNumber) {
  const assembly = getAssembly(projectNumber);
  let masterAssembly = assembly.assemblyFile;

  // Parse the xml
  let xml = await import(
    /* @vite-ignore */
    `${Model_Data_Path}/${masterAssembly.replace(" ", "-")}.xml?raw`
  );

  xml = xml.default;


  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(xml, "text/xml");

  let structure = [];
  let x = xmlDoc.getElementsByTagName("ProductOccurence");
  for (let i = 0; i < x.length; i++) {
    let file_name = "";
    let thumb_file = "";
    let _modelBrowserName = "";
    if (x[i].getAttribute("FilePath") != null) {
      file_name = x[i]
        .getAttribute("FilePath")
        .split("\\")
        .pop()
        .split("/")
        .pop();
      thumb_file =
        masterAssembly.replace(" ", "_") +
        "/" +
        file_name.replace(" ", "_") +
        ".png";
      _modelBrowserName = x[i].getAttribute("Name");
    }

    const id = parseInt(x[i].getAttribute("Id"));
    const _fileSize = Math.round(
      parseInt(x[i].getAttribute("FileSize")) / 1024
    );
    const _partNumber = x[i].getAttribute("PartNumber");

    structure[id] = {
      children: [],
      child_objects: [],
      parents: [],
      name: file_name,
      thumb: thumb_file,
      modelBrowserName: _modelBrowserName,
      filesize: _fileSize,
      partnumber: _partNumber,
    };

    if (x[i].getAttribute("Children") != null) {
      structure[id].children = x[i]
        .getAttribute("Children")
        .split(" ")
        .map(function (item) {
          return parseInt(item, 10);
        });
    } else if (x[i].getAttribute("InstanceRef") != null) {
      structure[id].children.push(
        parseInt(x[i].getAttribute("InstanceRef"), 10)
      );
    } else {
      structure[id].children = null;
    }
  }

  return structure;
}

/**
 * Construct the complete note list for a project
 * @param {string} projectNumber
 * @param {object} structure
 * @return {object[]} completeNodeList, the first element in the list is always the root.
 */
function loadCompleteNoteList(projectNumber, structure) {
  const assembly = getAssembly(projectNumber);

  let completeNodeList = [];
  let masterAssembly = assembly.assemblyFile;

  // find the root node
  let root = {};
  const searchName = masterAssembly;
  let found = false;
  for (let i = 0; i < structure.length && !found; i++) {
    if (structure[i].name == searchName) {
      root = structure[i];
    }
  }

  completeNodeList.push(root);

  getAllChildren(structure, root).forEach(function (node) {
    completeNodeList.push(node);
  });

  return completeNodeList;
}

export { assemblies, users, getAssembly, getUser, loadStructure, loadCompleteNoteList };

