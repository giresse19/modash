const graph = require("fbgraph");
graph.setVersion("6.0");

const in_client_id = "220615279223892",
  in_client_secret = "427ac57eee31154d0fb90765265ec1ff",
  in_redirect_uri = "https://380ceb2e.ngrok.io/auth",
  in_graph_base_url = "https://graph.facebook.com",
  fb_authUrl = graph.getOauthUrl({
    client_id: in_client_id,
    redirect_uri: in_redirect_uri,
    scope: "instagram_basic,instagram_manage_insights,pages_show_list",
  });

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
  env : process.env.NODE_ENV || 'development',
  db: {
    uri: db_uri,
  },
  instagram: {
    client_id: in_client_id,
    client_secret: in_client_secret,   
    redirect_uri: in_redirect_uri,      
    fb_base_url: in_graph_base_url,
    fb_auth_url: fb_authUrl,
  },
};
