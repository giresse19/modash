const vision = require("@google-cloud/vision");
const IgConfig = require("../../config/config.ts");
const axios = require("axios");

const getProfile = async (name: string) => {
  try {
    const result = await axios.get(
      `${IgConfig.instagram.IG_BASE_URL}/${name}/?__a=1`
    );
    return result;
  } catch (e) {
    console.error(e);
  }
};

// @desc: Get media insights for label and logo from google vision API.
// API allows batch request,
// However,response from such request can only be stored in google cloud storage.
// Hence, for this task, opted to go with single request per media item.
const getImageInsights = async (array: any) => {
  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  const newArr = [...array];
  const obj = {
    labels: [{ description: String, score: String }],
    brands: [{ description: String, score: String }],
  };

  for (let el of newArr) {
    let [result] = await client.labelDetection(el.media_url);
    let [logo] = await client.logoDetection(el.media_url);
    result.labelAnnotations.forEach((label: { score: any; description: any; }) =>
      obj.labels.push({        
        score: label.score,
        description: label.description,
      })
    );
    logo.logoAnnotations.forEach((logo: { description: any; score: any; }) => obj.brands.push({
      description: logo.description,
      score: logo.score,
    }));
  }
  return obj;
};

module.exports = {
  getProfile,
  getImageInsights,
};
