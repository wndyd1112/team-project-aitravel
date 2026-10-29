import os
import requests
from dotenv import load_dotenv

load_dotenv()

TOUR_RANK_API_KEY = os.getenv("TOUR_RANK_API_KEY")

def get_rank_places(base_ym, area_cd, signgu_cd):
    url = "https://apis.data.go.kr/B551011/TarRlteTarService1/areaBasedList1"

    params = {
        "serviceKey": TOUR_RANK_API_KEY,
        "pageNo": 1,
        "numOfRows": 50,
        "MobileOS": "ETC",
        "MobileApp": "AITravel",
        "baseYm": base_ym,
        "areaCd": area_cd,
        "signguCd": signgu_cd,
        "_type": "json"
    }

   
    response = requests.get(url, params=params)
    return response.json()