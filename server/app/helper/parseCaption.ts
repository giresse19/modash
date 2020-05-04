const parseCaption = async (array: any[]) => {
  const newArray = [...array];

  interface output {
    hashtag: any;
    mention: any;
  }

  const result: output = {
    hashtag: [],
    mention: [],
  };

  const newResult: any = {
    mergedHashtags: [],
    mergedMentions: [],
  };

  const hash: any = /\B#[a-z][a-z0-9._-]*\b/gi;
  const ment: any = /\B@[a-z][a-z0-9._-]*\b/gi;

  for (let el of newArray) {
    result.hashtag.push(el.caption.match(hash));
    result.mention.push(el.caption.match(ment));
  }
  newResult.mergedHashtags = [].concat(...result.hashtag);
  newResult.mergedMentions = [].concat(...result.mention);
  return newResult;
};

const getObjectFromArray = (array: any, obj: any) => {
  const newArr = [...array];
  const newObj = { ...obj };
  const result: any = [];

  for (let i = 0; i < newArr.length; i++) {
    let el = newArr[i] !== null ? newArr[i].replace(/\./g, "") : null;
    if (newObj[el] == null) newObj[el] = 1;
    else newObj[el]++;
  }

  for (let el in newObj) {
    result.push({
      tag: el,
      count: newObj[el],
    });
  }
  return result;
};

const getMaxTags = function (item: string | any[], max: number) {
  const result: any = [];
  for (let i = 0; i < max && i < item.length; i++) {
    result.push(item[i]);
  }
  return result;
};

const captionMode = async (array: any[]) => {
  const { mergedHashtags, mergedMentions } = await parseCaption([...array]);

  const result: any = {
    hashtag: [],
    mention: [],
  };

  if (mergedHashtags.length == 0) return null;
  const popular_tags = {};

  result.hashtag = getObjectFromArray(mergedHashtags, popular_tags);
  result.mention = getObjectFromArray(mergedMentions, popular_tags);

  const newHash = result.hashtag
    .sort((a: { count: number }, b: { count: number }) => b.count - a.count)
    .filter((el: any) => el.tag !== "null");

  const newMention = result.mention
    .sort((a: { count: number }, b: { count: number }) => b.count - a.count)
    .filter((el: any) => el.tag !== "null");

  result.hashtag = getMaxTags(newHash, 5);

  result.mention = getMaxTags(newMention, 5);

  return result;
};

module.exports = {
  captionMode,
  parseCaption,
  getMaxTags,
};
