import requests
from fastapi import FastAPI

from db.conn import DatabaseConnection

app = FastAPI()


def classify_monoxide_level(level):
    if level < 1000:
        return 'green'
    elif 1500 > level >= 1000:
        return 'yellow'
    else:
        return 'red'


def save_monoxide_level(level):
    with DatabaseConnection('./data.db') as cursor:
        cursor.execute('INSERT INTO history (monoxide_level) values (?)', (level, ))


@app.get("/")
def read_root():
    response = requests.get('http://192.168.74.87/')
    monoxide_level = int(response.text)
    save_monoxide_level(monoxide_level)
    return {
        "monoxide_level": monoxide_level,
        "status": classify_monoxide_level(monoxide_level)
    }
