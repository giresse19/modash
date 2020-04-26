const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const services = require('../../services/services')

// @route POST api/analyze
// @desc request profile to analyze
// @access Public
router.post(
  "/",
  [check("name", "name is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    try {   
      
      // TODO: call services.profile here, to get IG profile info
      services.profile();

      res.send(name);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
