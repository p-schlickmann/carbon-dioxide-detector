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
    response = requests.get('http://172.20.10.12/')
    monoxide_level = float(response.text)
    save_monoxide_level(monoxide_level)
    return {
        "monoxide_level": monoxide_level,
        "status": classify_monoxide_level(monoxide_level)
    }


@app.get('/history')
def history():
    with DatabaseConnection('./data.db') as cursor:
        results = cursor.execute('SELECT * FROM history ORDER BY id DESC LIMIT 25').fetchall()
        return [{'level': result[1], 'saved_at': result[2]} for result in results]
