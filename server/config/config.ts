const in_base_url = "https://www.instagram.com";
const in_media_url = "https://www.instagram.com/media/"

const db_user = "bob123",
  db_password = "bob123",
  db_uri =
    "mongodb+srv://" +
    db_user +
    ":" +
    db_password +
    "@cluster0-vaw00.mongodb.net/test?retryWrites=true&w=majority";

module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
  db: {
    uri: db_uri,
  },
  instagram: {
    IG_BASE_URL: in_base_url,
    IG_MEDIA_URL: in_media_url,    
  },
};
