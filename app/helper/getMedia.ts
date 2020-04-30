const getMedia = (array) => {
  const media = [];
  const newArray = [...array];

  for (let el of newArray) {
    const obj = {
      media_url: String,
      timestamp: String,
      comments_count: Number,
      like_count: Number,
      id: String,
      children: [],
    };
    obj.media_url = el.node.display_url;
    obj.timestamp = el.node.taken_at_timestamp;
    obj.comments_count = el.node.edge_media_to_comment.count;
    obj.like_count = el.node.edge_liked_by.count;
    obj.id = el.node.id;
    if (el.node.edge_sidecar_to_children)
      obj.children = el.node.edge_sidecar_to_children.edges;

    media.push(obj);
  }
  return media;
};

module.exports = getMedia;
