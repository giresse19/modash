const vision = require("@google-cloud/vision");
const IgConfig = require("../../config/config.ts");
const axios = require("axios");
const helper = require("./parseCaption");

// Instantiates a client
const client = new vision.ImageAnnotatorClient();

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

// faster than using javascript's array methods such as filter or reduce
const distinct = (arr: any[], key: string) => {
  const newArr: any = [...arr];
  const distinct: any = [];
  const isPresent: any = {};

  for (let item of newArr) {
    if (!isPresent[item[key]]) {
      distinct.push(item);
      isPresent[item[key]] = 1;
    }
  }
  return distinct;
};

// @desc: Get media insights for label and logo from google vision API.
// API allows batch request,
// However,response from such request can only be stored in google cloud storage.
// Hence, for this task, opted to go with single request per media item.

const getImageInsights = async (array: any) => {
  const newArr = [...array];

  interface output {
    labels: insight[];
    brands: insight[];
  }

  interface insight {
    description: string;
    score: number;
  }

  const result: output = {
    labels: [],
    brands: [],
  };

  const objArray = await Promise.all(
    newArr.map((el) => {
      return new Promise(async (resolve, reject) => {
        const obj: output = {
          labels: [],
          brands: [],
        };

        let [result] = await client.labelDetection(el.media_url);
        let [logo] = await client.logoDetection(el.media_url);

        result.labelAnnotations.forEach(
          (label: { score: number; description: string }) =>
            obj.labels.push({
              score: label.score,
              description: label.description,
            })
        );

        logo.logoAnnotations.forEach(
          (logo: { description: string; score: number }) =>
            obj.brands.push({
              description: logo.description,
              score: logo.score,
            })
        );

        resolve(obj);
      });
    })
  );

  // get object of arrays
  objArray.forEach((obj: { labels: any; brands: any }) => {
    result.labels.push(...obj.labels);
    result.brands.push(...obj.brands);
  });

  const newLabel = distinct(result.labels, "description")
    .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
    .filter(
      (el: { description: string }) =>
        el.description !== "null" || typeof el !== "undefined"
    );

  const newBrands = distinct(result.brands, "description")
    .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
    .filter(
      (el: { description: string }) =>
        el.description !== "null" || typeof el !== "undefined"
    );

  result.labels = helper.getMaxTags(newLabel, 5);

  result.brands = helper.getMaxTags(newBrands, 5);

  return result;
};

module.exports = {
  getProfile,
  getImageInsights,
};
