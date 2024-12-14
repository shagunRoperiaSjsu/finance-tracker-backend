# arima_predictor.py
import pickle
import sys
import json
import warnings

# Suppress the specific warnings
warnings.filterwarnings("ignore", category=UserWarning)
warnings.filterwarnings("ignore", category=FutureWarning)


def get_prediction(steps=1):
    with open("./services/arima_model.pkl", "rb") as file:
        model = pickle.load(file)

    forecast = model.get_forecast(steps=steps)
    return forecast.predicted_mean.tolist()


if __name__ == "__main__":
    steps = int(sys.argv[1]) if len(sys.argv) > 1 else 12
    result = get_prediction(steps)
    print(json.dumps(result))
