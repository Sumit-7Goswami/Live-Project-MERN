 
const Url = require("../models/Url");
const generateShortCode = require("../utils/generateShortCode");
const { Log } = require("../../logging-middleware/logger");

const createShortUrl = async (req, res) => {
  const { url, validity, shortcode } = req.body;

  try {
    if (!url) {
      await Log("backend", "error", "handler", "Missing URL in request body");
      return res.status(400).json({ error: "URL is required" });
    }

    const shortCode = shortcode || generateShortCode();
    const exists = await Url.findOne({ shortCode });

    if (exists) {
      await Log("backend", "warn", "repository", `Shortcode ${shortCode} already exists`);
      return res.status(409).json({ error: "Shortcode already in use" });
    }

    const expiryDate = new Date(Date.now() + (validity || 30) * 60000);

    const newUrl = await Url.create({
      longUrl: url,
      shortCode,
      expiresAt: expiryDate,
    });

    await Log("backend", "info", "controller", `Shortened URL created for ${url}`);

    return res.status(201).json({
      shortLink: `http://localhost:5000/${shortCode}`,
      expiry: expiryDate.toISOString(),
    });
  } catch (err) {
    await Log("backend", "fatal", "handler", `Error creating short URL: ${err.message}`);
    return res.status(500).json({ error: "Server error" });
  }
};




const redirectToLongUrl = async (req, res) => {
  const { code } = req.params;

  try {
    const urlDoc = await Url.findOne({ shortCode: code });

    if (!urlDoc) {
          await Log("backend", "error", "repository", `Shortcode ${code} not found`);
          return res.status(404).json({ error: "Shortcode not found" });
      }
      
      if (new Date() > urlDoc.expiresAt) {
      await Log("backend", "warn", "handler", `Shortcode ${code} expired`);
      return res.status(410).json({ error: "Short URL expired" });
}

// Capture click info
const clickData = {
      timestamp: new Date(),
      referrer: req.get("Referrer") || "direct",
      location: req.ip, // basic IP, geo enhancement optional
};

urlDoc.clickCount += 1;
urlDoc.clicks.push(clickData);
    await urlDoc.save();
    
    await Log("backend", "info", "controller", `Redirected click for shortcode ${code}`);
    
    return res.redirect(urlDoc.longUrl);
} catch (err) {
      await Log("backend", "fatal", "handler", `Redirection failed: ${err.message}`);
      return res.status(500).json({ error: "Server error" });
}
};






const getUrlStats = async (req, res) => {
  const { code } = req.params;

  try {
    const urlDoc = await Url.findOne({ shortCode: code });

    if (!urlDoc) {
      await Log("backend", "error", "repository", `Stats requested for non-existent code: ${code}`);
      return res.status(404).json({ error: "Shortcode not found" });
    }

    await Log("backend", "info", "controller", `Stats returned for shortcode: ${code}`);

    return res.json({
      originalUrl: urlDoc.longUrl,
      createdAt: urlDoc.createdAt,
      expiresAt: urlDoc.expiresAt,
      totalClicks: urlDoc.clickCount,
      clickDetails: urlDoc.clicks,
    });
  } catch (err) {
    await Log("backend", "fatal", "handler", `Failed to get stats: ${err.message}`);
    return res.status(500).json({ error: "Server error" });
  }
};




module.exports = { createShortUrl , redirectToLongUrl , getUrlStats  };