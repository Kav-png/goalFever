const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Enable JSON parsing middleware

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Handle nearby places request and proxy to LocationIQ API
app.get("/api/nearby", async (req, res) => {
  try {
    const { lat, lon, tag, radius } = req.query;
    const locationIQApiKey = "pk.84fa4f2c5c78c4870f780ed7fbca5704"; // Replace with your LocationIQ API key

    const apiUrl = `https://us1.locationiq.com/v1/nearby?key=${locationIQApiKey}&lat=${lat}&lon=${lon}&tag=${tag}&radius=${radius}&format=json`;
    const response = await axios.get(apiUrl);

    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Handle autocomplete requests and proxy to LocationIQ Autocomplete API
app.get("/api/autocomplete", async (req, res) => {
  try {
    const { q } = req.query;
    const locationIQApiKey = "pk.84fa4f2c5c78c4870f780ed7fbca5704"; // Replace with your LocationIQ API key

    const apiUrl = `https://api.locationiq.com/v1/autocomplete?key=${locationIQApiKey}&q=${q}`;
    const response = await axios.get(apiUrl);

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
