import pandas as pd
from pymongo import MongoClient

# Connect MongoDB Atlas
client = MongoClient("mongodb+srv://jayakrishnavamsinamburu143_db_user:T2Ro0NQ8dpgEod8c@battery-ai-backend.qcdegcf.mongodb.net/?appName=battery-ai-backend")

# Use correct database
db = client["test"]

# Check collections
print("Collections:", db.list_collection_names())

# Use collection name
collection = db["batterydatas"]

data = list(collection.find({}, {"_id":0}))

if not data:
    print("⚠ No data found in MongoDB")
else:
    df = pd.DataFrame(data)

    df.to_csv("dataset/battery_data.csv", index=False)

    print("Dataset created successfully")
    print("Records:", len(df))