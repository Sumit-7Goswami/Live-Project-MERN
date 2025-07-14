const express = require("express");
const router = express.Router();
const { createShortUrl , redirectToLongUrl , getUrlStats } = require("../controllers/urlController");


router.post("/shorturls", createShortUrl);
router.get("/:code", redirectToLongUrl);
router.get("/shorturls/:code", getUrlStats);

router.get("/"  , (req,res)=> {
      res.send("Welcome to the URL Shortener API , go ahead");
})

router.get("/test", (req, res) => {
  res.json({ message: " Test route working!" });
});

module.exports = router;
