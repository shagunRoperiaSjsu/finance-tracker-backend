const arimaService = require("../services/arimaService");

const getArimaPrediction = async (req, res) => {
  const { steps } = req.query;

  try {
    const forecast = await arimaService.getArimaForecast(steps);
    res.json(forecast);
  } catch (error) {
    console.error("Error in ARIMA prediction:", error);
    res.status(500).json({ error: "Error making ARIMA prediction" });
  }
};

module.exports = { getArimaPrediction };
