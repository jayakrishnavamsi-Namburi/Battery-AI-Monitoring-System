import psutil
from utils.process_filter import get_top_processes


def get_battery_data():

    battery = psutil.sensors_battery()

    if battery:

        battery_percent = battery.percent
        charging = battery.power_plugged
        time_left = battery.secsleft

    else:

        battery_percent = None
        charging = False
        time_left = None

    cpu_usage = psutil.cpu_percent(interval=1)

    running_apps = get_top_processes()

    data = {
        "batteryLevel": battery_percent,
        "charging": charging,
        "dischargingTime": time_left,
        "cpuUsage": cpu_usage,
        "runningApps": running_apps
    }

    return data