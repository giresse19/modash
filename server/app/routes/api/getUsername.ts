const router = express.Router();
const { check, validationResult } = require("express-validator");

const service = require("../../services/profile.ts");

// @route POST api/analyze/username
// @desc request profile to analyze
// @access Public
router.post(
  "/",
  [check("name", "name is required").not().isEmpty()],
  async (req:any, res:any) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;

    try {
       await service.profile(req, res, name);      
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
