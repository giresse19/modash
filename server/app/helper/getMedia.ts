const getMedia = (array: any[]) => {
  const newArray = [...array];

  interface mediaLayout {
    media_url: string;
    timestamp: string;
    comments_count: number;
    like_count: number;
    MediaEngagement: number;
    id: string;
    caption: string,
    children: any[];
  }

  interface output {
    media: any[];
    engagement: number;
    total_likes: number;
    like_count: number
  }

  const result: output = {
    media: [],
    engagement: 0,
    total_likes: 0,
    like_count: 0,
  };

  for (let el of newArray) {
    const obj: mediaLayout = {
      media_url: "",
      timestamp: "",
      comments_count: 0,
      like_count: 0,
      MediaEngagement: 0,
      id: "",
      caption: '',
      children: [],

    };

    obj.media_url = el.node.display_url;
    obj.timestamp = el.node.taken_at_timestamp;
    obj.comments_count = el.node.edge_media_to_comment.count;
    obj.like_count = el.node.edge_liked_by.count;
    obj.MediaEngagement = obj.comments_count + obj.like_count;
    obj.id = el.node.id;
    obj.caption = el.node.edge_media_to_caption.edges[0].node.text
    
    // Since, generally speaking number of media item isn't same as number of like count,
    // we need to count actual number of likes
    if (obj.like_count > 0) result.like_count = result.like_count + 1;

    if (el.node.edge_sidecar_to_children)
      obj.children = el.node.edge_sidecar_to_children.edges;

    result.engagement += obj.MediaEngagement;
     result.total_likes += obj.like_count;
    result.media.push(obj);
  }
  return result;
};

module.exports = getMedia;
