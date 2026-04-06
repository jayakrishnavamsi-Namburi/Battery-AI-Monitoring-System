from sender.send_data import send_battery_data


def start_agent():

    print("===================================")
    print(" AI Battery Monitoring Agent Started")
    print("===================================")

    send_battery_data()


if __name__ == "__main__":
    start_agent()