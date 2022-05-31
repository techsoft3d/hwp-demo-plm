const Image_Path = "/images";
const Model_Path = "/CAD-models";
const Model_Data_Path = "/model-data";

let base_path = import.meta.env.BASE_URL;
if (base_path.charAt(base_path.length - 1) == "/") {
  base_path = base_path.substring(0, base_path.length - 1);
}

/**
 * The Base_Path will always end with no "/"
 */
const Base_Path = base_path;

/**
 * The path can not have file name starting with "_"
 * @param {string} path 
 * @returns 
 */
const sanitizePath = (path) => {
  let files = path.split("/");
  let result = "";
  for (let i = 0; i < files.length; i++) {
    while (files[i].charAt(0) == "_") {
      files[i] = files[i].substring(1);
    }
    if (i == files.length - 1) {
      result += files[i];
    } else {
      result += files[i] + "/";
    }
  }
  return result;
};

/**
 * Path should start with no "/"
 */
const getImageUrl = (imagePath) => {
  let sanitizedPath = sanitizePath(imagePath);
  return `${Base_Path}${Image_Path}/${sanitizedPath}`;
};

const getModelUrl = (modelPath) => {
  let sanitizedPath = sanitizePath(modelPath);
  return `${Base_Path}${Model_Path}/${sanitizedPath}`;
};

const getModelDataUrl = (modelDataPath) => {
  let sanitizedPath = sanitizePath(modelDataPath);
  return `${Base_Path}${Model_Data_Path}/${sanitizedPath}`;
};

export {
  Image_Path,
  Model_Path,
  Model_Data_Path,
  Base_Path,
  getImageUrl,
  getModelUrl,
  getModelDataUrl
};