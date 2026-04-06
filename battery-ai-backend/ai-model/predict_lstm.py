import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"

import numpy as np
import pandas as pd
import joblib

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from sklearn.preprocessing import MinMaxScaler

# ================= PATH SETUP =================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

dataset_path = os.path.join(BASE_DIR, "dataset", "battery_data.csv")
model_path = os.path.join(BASE_DIR, "models", "lstm_battery_model.h5")
scaler_path = os.path.join(BASE_DIR, "models", "battery_scaler.pkl")

# ================= LOAD DATA =================
data = pd.read_csv(dataset_path)

if "batteryLevel" not in data.columns:
    raise Exception("❌ 'batteryLevel' column not found in dataset")

battery = data["batteryLevel"].values.reshape(-1, 1)

# ================= SCALING =================
scaler = MinMaxScaler()
battery_scaled = scaler.fit_transform(battery)

# Save scaler (IMPORTANT)
joblib.dump(scaler, scaler_path)

print("✅ Scaler saved at:", scaler_path)

# ================= CREATE SEQUENCES =================
def create_sequences(data, seq_length=5):
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data[i:i + seq_length])
        y.append(data[i + seq_length])
    return np.array(X), np.array(y)

sequence_length = 5
X, y = create_sequences(battery_scaled, sequence_length)

print("📊 Dataset shape:", X.shape, y.shape)

# ================= BUILD MODEL =================
model = Sequential([
    LSTM(64, return_sequences=True, input_shape=(sequence_length, 1)),
    Dropout(0.2),

    LSTM(32),
    Dropout(0.2),

    Dense(16, activation="relu"),
    Dense(1)
])

model.compile(
    optimizer="adam",
    loss="mean_squared_error"
)

# ================= TRAIN =================
print("🚀 Training started...")
history = model.fit(
    X, y,
    epochs=20,
    batch_size=16,
    verbose=1
)

# ================= SAVE MODEL =================
model.save(model_path)

print("✅ Model saved at:", model_path)
print("🎉 Training completed successfully!")