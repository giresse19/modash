const in_client_id = '932558367177775',
    in_client_secret = 'b7057e31f4298e7cca3613bd294de09b',
    in_redirect_uri = 'https://localhost:3000/auth',
    in_scope='user_profile,user_media',
    in_auth_url = 'https://api.instagram.com/oauth/authorize/?client_id='
                  + in_client_id + '&redirect_uri='
                  + in_redirect_uri + '&scope='
                  + in_scope + '&response_type=code';

const db_user = 'bob123',
    db_password = 'bob123',
    db_uri = 'mongodb+srv://'
             + db_user + ':'
             + db_password + '@cluster0-vaw00.mongodb.net/test?retryWrites=true&w=majority';

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    uri: db_uri
  },
  instagram: {
    client_id: in_client_id,
    client_secret: in_client_secret,
    auth_url: in_auth_url
  }
};