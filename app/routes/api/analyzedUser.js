const express = require("express");
const router = express.Router();
const config = require('../../../config/config');


// @route GET auth
// @desc request to get auth from FB API
// access public
router.get("/", async (req, res) => {
  if (!req.query.code) {   
  try {
    res.redirect(config.instagram.fb_auth_url);

    //checks whether a user denied the app facebook login/permissions
    if (!req.query.error) { 
      res.redirect(config.instagram.fb_auth_url);
    } else {  //req.query.error == 'access_denied'
      res.send('access denied');
    }
  } catch (err) {
      console.log(err.message);    
  }
}
});


module.exports = router;
