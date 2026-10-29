import os
import requests
from dotenv import load_dotenv

load_dotenv()

NAVER_CLIENT_ID = os.getenv("NAVER_CLIENT_ID")
NAVER_CLIENT_SECRET = os.getenv("NAVER_CLIENT_SECRET")


def get_car_route(sx, sy, ex, ey):
    url = "https://maps.apigw.ntruss.com/map-direction/v1/driving"

    headers = {
        "x-ncp-apigw-api-key-id": NAVER_CLIENT_ID,
        "x-ncp-apigw-api-key": NAVER_CLIENT_SECRET
    }

    params = {
        "start": f"{sx},{sy}",
        "goal": f"{ex},{ey}",
        "option": "trafast"
    }

    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()

    data = response.json()
    route = data["route"]["trafast"][0]["summary"]

    return {
        "distance": f'{route["distance"] / 1000:.2f} km',
        "duration": f'{route["duration"] / 60000:.1f} 분',
        "tollFare": f'{route["tollFare"]} 원'
    }