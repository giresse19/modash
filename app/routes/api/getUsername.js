const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require('../../models/User')

const services = require("../../services/profile");

// @route POST api/analyze/username
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
       await services.profile(req, res, name);      
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
