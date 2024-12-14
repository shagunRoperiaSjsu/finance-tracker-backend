const { spawn } = require("child_process");

function getArimaForecast(steps = 12) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python3", [
      "./services/arime_predictor.py",
      steps.toString(),
    ]);

    let result = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        reject(`Process exited with code ${code}`);
      } else {
        try {
          const predictions = JSON.parse(result);
          resolve(predictions);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
}

module.exports = { getArimaForecast };
