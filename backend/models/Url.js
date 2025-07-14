
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({

      longUrl: {
            type: String,
            required: true
      },
      shortCode: {
            type: String,
            required: true,
            unique: true
      },
      createdAt: {
            type: Date,
            default: Date.now
      },
      expiresAt: {
            type: Date,
            required: true
      },
      clickCount: {
            type: Number,
            default: 0
      },
      clicks: [
            {
                  timestamp: { type: Date, default: Date.now },
                  referrer: String,
                  location: String,
            },
      ],
});

module.exports = mongoose.model("Url", urlSchema);
