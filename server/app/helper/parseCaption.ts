const parseCaption = async (array: any[]) => {
  const newArray = [...array];

  interface output {
    tags: any;
  }

  const result: output = {
    tags: [],
  };

  const hash: any = /\B#[a-z][a-z0-9._-]*\b/gi;
  const mention: any = /\B@[a-z][a-z0-9._-]*\b/gi;

  for (let el of newArray) {
    result.tags.push(el.caption.match(hash), el.caption.match(mention));
  }
  const merged = [].concat(...result.tags);
  return merged;
};

const captionMode = async (array:  any[]) => {
  const newArr = await parseCaption([...array]);

  if (newArr.length == 0) return null;
  const popular_tags = {};
  for (let i = 0; i < newArr.length; i++) {
    let el = newArr[i] !== null ? newArr[i].replace(/\./g, '') : null;
    if (popular_tags[el] == null) popular_tags[el] = 1;
    else popular_tags[el]++;
  }
  return popular_tags;
};

module.exports = {
  captionMode,
  parseCaption,
};
