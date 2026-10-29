import os
import requests
from dotenv import load_dotenv

load_dotenv()

ODSAY_API_KEY = os.getenv("ODSAY_API_KEY")
def get_transit_route(sx, sy, ex, ey):
    url = "https://api.odsay.com/v1/api/searchPubTransPathT"

    params = {
        "apiKey": ODSAY_API_KEY,
        "SX": sx,
        "SY": sy, #출발지 경도, 위도
        "EX": ex,
        "EY": ey, #도착지 경도,위도
        "OPT": 0
    }

    response = requests.get(url, params=params)
    data = response.json()
    print("ODsay 응답:", data)

    route = data["result"]["path"][0]["info"]

    return {
        "totalTime": route["totalTime"],
        "totalWalk": route["totalWalk"],
        "payment": route["payment"],
        "busTransitCount": route["busTransitCount"],
        "subwayTransitCount": route["subwayTransitCount"]
}