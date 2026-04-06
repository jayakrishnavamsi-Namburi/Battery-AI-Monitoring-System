import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib
import os

print("Loading dataset...")

data = pd.read_csv("dataset/battery_data.csv")

print(data.head())

# Features
X = data[["batteryLevel","cpuUsage","charging","drainRate"]]

# Target
y = data["batteryHealth"]

print("Splitting dataset...")

X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2)

print("Training model...")

model = LinearRegression()

model.fit(X_train,y_train)

# create models folder if missing
os.makedirs("models",exist_ok=True)

joblib.dump(model,"models/battery_model.pkl")

print("Model trained successfully!")
print("Model saved at models/battery_model.pkl")