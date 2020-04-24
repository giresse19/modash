const express = require("express");
const router = express.Router();
const config = require('../../../config/config')
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route GET api/analyze
// @desc request profile to analyze
// access public
router.get("/", async (req, res) => {
  try {
    res.redirect(config.instagram.auth_url);
  } catch (err) {
      console.err(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/analyze
// @desc request profile to analyze
// @access Public
router.post(
  "/",
  [check("username", "Account username is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username } = req.body;

    try {
      // see if user exist
      let user = await User.findOne({ username });

      // this will be changed later....
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User exist" }] });
      }
   
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
