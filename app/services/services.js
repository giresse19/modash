const config = require("../../config/config");
const graph = require("fbgraph");

const App = require("../models/App");
const db = require("../../config/db");

graph.setVersion("6.0");

// for securing calls to FB API. Should incase our access_token is compromised
graph.setAppSecret(config.instagram.client_secret);

module.exports = {
  authApp: (req, res) => {
    const requestTokenBody = {
      client_id: config.instagram.client_id,
      client_secret: config.instagram.client_secret,
      redirect_uri: config.instagram.redirect_uri,
      code: req.query.code,
    };

    graph.authorize(requestTokenBody, (err, facebookRes) => {
      try {
        const { access_token } = facebookRes;
        
        // get long-lived(~60days) access_token, suppose to short-lived.(~1hr)..
        // minimise call to API
        graph.extendAccessToken(
          {
            access_token: access_token,
            client_id: config.instagram.client_id,
            client_secret: config.instagram.client_secret,
          },
          (err, facebookRes) => {
            try {
              const { access_token } = facebookRes;
              graph.setAccessToken(access_token);

              // get FB page account ID
              graph.get("me/accounts", (err, res) => {
                const { id } = res.data[0];
                let app_fbPage_id = id;

                try {
                  // get IG app ID
                  graph.get(
                    `${app_fbPage_id}?fields=instagram_business_account`,
                    async (err, res) => {
                      const { id } = res["instagram_business_account"];
                      let app_ig_id = id;
                      let app_access_token = access_token;

                      app = new App({
                        app_ig_id,
                        app_fbPage_id,
                        app_access_token,
                      });

                      app.save();
                    }
                  );
                } catch {
                  console.log(err);
                }
              });

              res.redirect("/");
            } catch {
              console.log(err);
            }
          }
        );
      } catch {
        console.log("request  error...:", err.message);
      }
    });
  },

  profile: async () => {

    username = "theaveryschrader";
    access_token = await db.getAccessToken();    
    app_id = await db.getAppId();
    
    graph.setAccessToken(access_token);

    console.log("username: ", username, "access_token: ", access_token, "app_id", app_id)
    graph.get(
      `${app_id}?fields=business_discovery.username(${username})`,
      async (err, res) => {
        try {
          const { id } = res["business_discovery"];
          let user_ig_id = id;
          console.log("user ID",user_ig_id);
        } catch {
          console.log("request error...:", err.message);
        }
      }
    );
  },

};
