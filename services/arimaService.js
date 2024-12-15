const https = require('https');

const getArimaForecast = async (inputData) => {
  const requestData = { steps: inputData };
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'nzzd4gs86h.us-west-2.awsapprunner.com',  // Your Flask API URL
      port: 443,
      path: '/predict',  // The Flask API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(requestData)),
      },
    };

    const req = https.request(options, (res) => {
      // console.log(res);
      let data = '';

      // Collect data chunks
      res.on('data', (chunk) => {
        data += chunk;
      });

      // Resolve promise on end
      res.on('end', () => {
        try {
          // Parse the JSON response and return the forecast data
          const forecast = JSON.parse(data);
          // console.log(forecast);
          resolve(forecast); // You may further process the forecast here if needed
        } catch (error) {
          reject('Error parsing response: ' + error.message);
        }
      });
    });

    req.on('error', (error) => {
      reject('Error with HTTP request: ' + error.message);
    });

    // Write input data to the request body
    req.write(JSON.stringify(requestData));
    req.end(); // End the request
  });
};

module.exports = { getArimaForecast };
