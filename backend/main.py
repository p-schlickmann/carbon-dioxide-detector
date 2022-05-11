from typing import Optional

import requests
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    response = requests.get('http://172.20.10.12/')
    print(response.text)

    return {"Hello": "World"}


@app.post("/change-config")
def read_item():
    requests.post('http://172.20.10.12/', {"config1": True})
