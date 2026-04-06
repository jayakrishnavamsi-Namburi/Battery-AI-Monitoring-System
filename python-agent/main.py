# from sender.send_data import send_battery_data


# def start_agent():

#     print("===================================")
#     print(" AI Battery Monitoring Agent Started")
#     print("===================================")

#     send_battery_data()


# if __name__ == "__main__":
#     start_agent()





import time
from sender.send_data import send_battery_data
from config.settings import SEND_INTERVAL


def start_agent():
    print("===================================")
    print(" AI Battery Monitoring Agent Started 🚀")
    print("===================================")

    try:
        while True:
            try:
                response, data = send_battery_data()

                print("✅ Data sent successfully")
                print("Data:", data)
                print("Status:", response.status_code)

            except Exception as e:
                print("❌ Error sending data:", str(e))

            print(f"⏳ Waiting {SEND_INTERVAL} seconds...\n")
            time.sleep(SEND_INTERVAL)

    except KeyboardInterrupt:
        print("\n🛑 Agent stopped manually")


if __name__ == "__main__":
    start_agent()