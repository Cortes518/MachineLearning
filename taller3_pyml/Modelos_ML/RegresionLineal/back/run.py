import os
import subprocess
import sys

port = os.environ.get('PORT', '8000')
ports_to_listen = {8000, 8080}
if port.isdigit():
    ports_to_listen.add(int(port))

processes = []
port_list = sorted(list(ports_to_listen))
for p in port_list[:-1]:
    proc = subprocess.Popen([
        sys.executable, '-m', 'uvicorn', 'main:app',
        '--host', '0.0.0.0', '--port', str(p)
    ])
    processes.append(proc)

last_port = port_list[-1]
try:
    subprocess.run([
        sys.executable, '-m', 'uvicorn', 'main:app',
        '--host', '0.0.0.0', '--port', str(last_port)
    ])
finally:
    for proc in processes:
        proc.terminate()
