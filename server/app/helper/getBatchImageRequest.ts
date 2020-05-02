const getBatchImageRequest = (array: any[]) => {
  const newArray = [...array];
  const features: any[] = [{ type: "LABEL_DETECTION" }];

  const result: any[] = [];

  interface requestLayout {
    image: {
      source: {
        imageUri: string;
      };
    };
    features: any[];
  }
  
  for (let el of newArray) {
    const obj: requestLayout = {
      image: {
        source: {
          imageUri: "",
        },
      },
      features: features,
    };
    obj.image.source.imageUri = el.media_url;

    result.push(obj);
  }
  return result;
};

module.exports = getBatchImageRequest;
