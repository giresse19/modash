const vision = require("@google-cloud/vision");
const config = require("../../config/config.ts");
const axios = require('axios');

const getProfile = async (name) => {
  try {
    const result = await axios.get(
      `${config.instagram.IG_BASE_URL}/${name}/?__a=1`
    );
    return result;
  } catch (e) {
    console.error(e);
  }
};

const getImageInsights = async (array) => {

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  const newArr = [...array];
  const obj = { labels: [], brands: [] };

  for (let el of newArr) {
    let [result] = await client.labelDetection(el.media_url);
    let [logo] = await client.logoDetection(el.media_url); 
    result.labelAnnotations.forEach((label) =>  obj.labels.push(label.description));
    logo.logoAnnotations.forEach((logo) => obj.brands.push(logo.description));
  }
  return obj;
};

module.exports = {
  getProfile,
  getImageInsights,
};
