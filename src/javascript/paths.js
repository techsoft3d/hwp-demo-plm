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
 * Path should start with no "/"
 */
const getImageUrl = (imagePath) => {
  return `${Base_Path}${Image_Path}/${imagePath}`;
};

const getModelUrl = (modelPath) => {
  return `${Base_Path}${Model_Path}/${modelPath}`;
};

const getModelDataUrl = (modelDataPath) => {
  return `${Base_Path}${Model_Data_Path}/${modelDataPath}`;
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