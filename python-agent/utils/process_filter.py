import psutil

def get_top_processes(limit=5):

    processes = []

    for proc in psutil.process_iter(['pid','name','cpu_percent']):
        try:
            cpu = proc.info['cpu_percent']

            if cpu is not None:
                processes.append(proc.info)

        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue

    processes.sort(key=lambda x: x['cpu_percent'], reverse=True)

    top_processes = []

    for p in processes[:limit]:
        top_processes.append(p['name'])

    return top_processes