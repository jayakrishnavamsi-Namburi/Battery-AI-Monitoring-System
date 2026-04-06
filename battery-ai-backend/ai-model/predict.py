# import sys
# import json
# import numpy as np
# import joblib
# import os
# import traceback

# # 🔥 Reduce TensorFlow logs
# os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
# os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

# from tensorflow.keras.models import load_model

# try:
#     # ================= PATH SETUP =================
#     BASE_DIR = os.path.dirname(os.path.abspath(__file__))

#     model_path = os.path.join(BASE_DIR, "models", "lstm_battery_model.h5")
#     scaler_path = os.path.join(BASE_DIR, "models", "scaler.pkl")

#     print("MODEL PATH:", model_path)
#     print("SCALER PATH:", scaler_path)

#     # ================= LOAD MODEL + SCALER =================
#     model = load_model(model_path, compile=False)
#     scaler = joblib.load(scaler_path)

#     print("Scaler type:", type(scaler))

#     # ================= INPUT =================
#     if len(sys.argv) < 5:
#         raise Exception("Missing input arguments")

#     battery = float(sys.argv[1])
#     cpu = float(sys.argv[2])
#     charging = int(sys.argv[3])
#     drain = float(sys.argv[4])

#     print("Inputs:", battery, cpu, charging, drain)

#     # ================= CREATE SEQUENCE =================
#     sequence_length = 5

#     # create sequence like training
#     sequence = np.array([battery] * sequence_length, dtype=float).reshape(-1, 1)

#     print("Sequence shape:", sequence.shape)

#     # ================= SCALE =================
#     scaled_seq = scaler.transform(sequence)

#     print("Scaled shape:", scaled_seq.shape)

#     # ================= RESHAPE FOR LSTM =================
#     X = scaled_seq.reshape(1, sequence_length, 1)

#     print("Model input shape:", X.shape)

#     # ================= PREDICTION =================
#     pred_scaled = model.predict(X, verbose=0)

#     print("Prediction scaled:", pred_scaled)

#     # ================= INVERSE SCALE =================
#     prediction = scaler.inverse_transform(pred_scaled)[0][0]

#     print("Final prediction:", prediction)

#     # ================= METRICS =================
#     confidence = float(np.clip(100 - abs(prediction - battery), 80, 99))

#     safe_drain = drain if drain > 0 else 0.1
#     remaining_life = int(prediction / safe_drain)

#     degradation_rate = float(drain)
#     cycle_count = int((100 - battery) * 3)

#     # ================= FINAL OUTPUT =================
#     print(json.dumps({
#         "prediction": round(float(prediction), 2),
#         "confidence": round(confidence, 2),
#         "remainingLife": f"{remaining_life} Months",
#         "degradationRate": round(degradation_rate, 2),
#         "cycleCount": cycle_count
#     }))

# except Exception as e:
#     print(json.dumps({
#         "error": str(e),
#         "trace": traceback.format_exc()
#     }))




import sys
import json
import numpy as np
import joblib
import os
import traceback

# 🔥 Reduce TensorFlow logs
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

from tensorflow.keras.models import load_model

try:
    # ================= PATH SETUP =================
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))

    model_path = os.path.join(BASE_DIR, "models", "lstm_battery_model.h5")
    scaler_path = os.path.join(BASE_DIR, "models", "scaler.pkl")

    print("MODEL PATH:", model_path, file=sys.stderr)
    print("SCALER PATH:", scaler_path, file=sys.stderr)

    # ================= LOAD MODEL + SCALER =================
    model = load_model(model_path, compile=False)
    scaler = joblib.load(scaler_path)

    print("Scaler type:", type(scaler), file=sys.stderr)

    # ================= INPUT =================
    if len(sys.argv) < 5:
        raise Exception("Missing input arguments")

    battery = float(sys.argv[1])
    cpu = float(sys.argv[2])
    charging = int(sys.argv[3])
    drain = float(sys.argv[4])

    print("Inputs:", battery, cpu, charging, drain, file=sys.stderr)

    # ================= CREATE SEQUENCE =================
    sequence_length = 5

    sequence = np.array([battery] * sequence_length, dtype=float).reshape(-1, 1)

    print("Sequence shape:", sequence.shape, file=sys.stderr)

    # ================= SCALE =================
    scaled_seq = scaler.transform(sequence)

    print("Scaled shape:", scaled_seq.shape, file=sys.stderr)

    # ================= RESHAPE FOR LSTM =================
    X = scaled_seq.reshape(1, sequence_length, 1)

    print("Model input shape:", X.shape, file=sys.stderr)

    # ================= PREDICTION =================
    pred_scaled = model.predict(X, verbose=0)

    print("Prediction scaled:", pred_scaled, file=sys.stderr)

    # ================= INVERSE SCALE =================
    prediction = scaler.inverse_transform(pred_scaled)[0][0]

    print("Final prediction:", prediction, file=sys.stderr)

    # ================= METRICS =================
    confidence = float(np.clip(100 - abs(prediction - battery), 80, 99))

    safe_drain = drain if drain > 0 else 0.1
    remaining_life = int(prediction / safe_drain)

    degradation_rate = float(drain)
    cycle_count = int((100 - battery) * 3)

    # ================= FINAL OUTPUT (ONLY JSON) =================
    print(json.dumps({
        "prediction": round(float(prediction), 2),
        "confidence": round(confidence, 2),
        "remainingLife": f"{remaining_life} Months",
        "degradationRate": round(degradation_rate, 2),
        "cycleCount": cycle_count
    }))

except Exception as e:
    print(json.dumps({
        "error": str(e),
        "trace": traceback.format_exc()
    }))