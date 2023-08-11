const express = require("express");
const axios = require("axios");
const router = express.Router();

const BASE_URL = "https://us1.locationiq.com/v1/nearby";
const API_KEY = "pk.84fa4f2c5c78c4870f780ed7fbca5704 "; // Set your LocationIQ API key

router.get("/api/nearby", async (req, res) => {
  const { lat, lon, tag, radius } = req.query;

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        lat: lat,
        lon: lon,
        tag: tag,
        radius: radius,
        format: "json",
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

module.exports = router;
