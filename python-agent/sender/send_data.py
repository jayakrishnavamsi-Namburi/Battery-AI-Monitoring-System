import requests
import time

from collector.battery_collector import get_battery_data
from config.settings import API_URL, JWT_TOKEN, SEND_INTERVAL


def send_battery_data():

    while True:

        data = get_battery_data()

        try:

            response = requests.post(
                API_URL,
                json=data,
                headers={
                    "Authorization": JWT_TOKEN
                }
            )

            print("Data sent successfully")
            print(data)

        except Exception as e:

            print("Error sending data:", e)

        time.sleep(SEND_INTERVAL)