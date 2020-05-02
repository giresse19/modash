const vision = require("@google-cloud/vision");
const IgConfig = require("../../config/config.ts");
const axios = require("axios");

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

// @desc: Get media insights for label and logo from google vision API.
// API allows batch request,
// However,response from such request can only be stored in google cloud storage.
// Hence, for this task, opted to go with single request per media item.
const getImageInsights = async (array: any) => {
  const newArr = [...array];
  const obj = {
    labels: [{ description: String, score: String }],
    brands: [{ description: String, score: String }],
  };

  for (let el of newArr) {
    let [result] = await client.labelDetection(el.media_url);
    let [logo] = await client.logoDetection(el.media_url);

    result.labelAnnotations.forEach((label: { score: any; description: any }) =>
      obj.labels.push({
        score: label.score,
        description: label.description,
      })
    );
    
    logo.logoAnnotations.forEach((logo: { description: any; score: any }) =>
      obj.brands.push({
        description: logo.description,
        score: logo.score,
      })
    );
  }
  return obj;
};

const getBatchImage = async (imageRequest:any[]) => {

  const outputUri: string = "";

  // Set where to store the results for the images that will be annotated.
  const outputConfig = {
    gcsDestination: {
      uri: outputUri,
    },
    batchSize: 2, // max number of responses to output in each JSON file
  };

  // Add each image request object to the batch request and add the output config.
  const request = {
    requests: imageRequest,
    outputConfig,
  };

  // Make the asynchronous batch request.
  const [operation] = await client.asyncBatchAnnotateImages(request);

  // Wait for the operation to complete
  const [filesResponse] = await operation.promise();

  // The output is written to GCS with the provided output_uri as prefix
  const destinationUri = filesResponse.outputConfig.gcsDestination.uri;
  console.log(`Output written to GCS with prefix: ${destinationUri}`);
};

module.exports = {
  getProfile,
  getImageInsights,
  getBatchImage,
};
