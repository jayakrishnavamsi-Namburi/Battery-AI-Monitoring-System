# train_model.py

import pandas as pd
import numpy as np

from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
import joblib

data = pd.read_csv("dataset/battery_data.csv")

battery = data["batteryLevel"].values.reshape(-1,1)

scaler = MinMaxScaler()
battery_scaled = scaler.fit_transform(battery)

# Save scaler (IMPORTANT 🔥)
joblib.dump(scaler, "models/scaler.pkl")

X, y = [], []
sequence_length = 5

for i in range(sequence_length, len(battery_scaled)):
    X.append(battery_scaled[i-sequence_length:i])
    y.append(battery_scaled[i])

X = np.array(X)
y = np.array(y)

model = Sequential([
    LSTM(50, return_sequences=True, input_shape=(X.shape[1],1)),
    LSTM(50),
    Dense(1)
])

model.compile(optimizer="adam", loss="mse")

print("Training LSTM model...")

model.fit(X, y, epochs=30, batch_size=8)

model.save("models/lstm_battery_model.h5")

print("Model + scaler saved ✅")