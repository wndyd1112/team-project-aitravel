import os
import requests
from dotenv import load_dotenv


load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))
api_key = os.getenv("TOUR_API_KEY")


def get_places(destination, style):
    region_code, sigungu_code = find_location_codes(destination)
    style_filter = get_style_filter(style)

    if region_code is None:
        return []

    if style_filter is None:
        return []

    url = "https://apis.data.go.kr/B551011/KorService2/areaBasedList2"

    params = {
        "serviceKey": api_key,
        "numOfRows": 10,
        "pageNo": 1,
        "MobileOS": "ETC",
        "MobileApp": "AITravel",
        "_type": "json",
        "arrange": "C",
        "contentTypeId": style_filter["content_type"],
        "lDongRegnCd": region_code
    }

    if "cat1" in style_filter:
        params["cat1"] = style_filter["cat1"]

    # 시군구 코드가 여러 개인 경우도 처리
    if isinstance(sigungu_code, list):
        sigungu_codes = sigungu_code
    else:
        sigungu_codes = [sigungu_code]

    # 관광처럼 cat2가 여러 개인 경우도 처리
    cat2_filter = style_filter.get("cat2")

    if isinstance(cat2_filter, list):
        cat2_codes = cat2_filter
    else:
        cat2_codes = [cat2_filter]

    all_items = []

    for sigungu in sigungu_codes:
        for cat2 in cat2_codes:
            request_params = params.copy()

            if sigungu:
                request_params["lDongSignguCd"] = sigungu

            if cat2:
                request_params["cat2"] = cat2

            print("요청 지역:", request_params.get("lDongRegnCd"),
                  "시군구:", request_params.get("lDongSignguCd"))

            response = requests.get(
                url,
                params=request_params,
                timeout=15
            )
            response.raise_for_status()

            data = response.json()

            items = (
                data.get("response", {})
                    .get("body", {})
                    .get("items", {})
            )

            if isinstance(items, dict):
                items = items.get("item", [])

            if isinstance(items, dict):
                items = [items]

            if isinstance(items, list):
                all_items.extend(items)

    places = []
    seen = set()

    for place in all_items:
        place_id = place.get("contentid")

        if place_id and place_id in seen:
            continue

        if place_id:
            seen.add(place_id)

        cleaned_place = {
            "name": place.get("title"),
            "address": place.get("addr1"),
            "latitude": place.get("mapy"),
            "longitude": place.get("mapx"),
            "image": place.get("firstimage")
        }

        places.append(cleaned_place)

    return places

def get_region_codes():
      url = "https://apis.data.go.kr/B551011/KorService2/ldongCode2"

      params = {
        "serviceKey": api_key,
        "numOfRows": 50,
        "pageNo": 1,
        "MobileOS": "ETC",
        "MobileApp": "AITravel",
        "_type": "json"
      }

      response = requests.get(url, params=params)
      return response.json()

def find_region_code(destination):
    data = get_region_codes()

    items = data["response"]["body"]["items"]["item"]

    for region in items:
        if destination in region["name"]:
            return region["code"]

    return None

def get_style_filter(style):
    style_map = {
        "맛집": {"content_type": 39},
        "역사": {
               "content_type": 12,
               "cat1": "A02",
               "cat2": "A0201"
               },
        "문화": {"content_type": 14},
        "액티비티": {"content_type": 28},
        "자연": {"content_type": 12, "cat1": "A01"},
        "관광": {
                 "content_type": 12,
                 "cat1": "A02",
                 "cat2": ["A0202", "A0203", "A0204", "A0205"]
                }
    }

    return style_map.get(style)

def get_sigungu_codes(region_code):
    url = "https://apis.data.go.kr/B551011/KorService2/ldongCode2"

    params = {
        "serviceKey": api_key,
        "numOfRows": 300,
        "pageNo": 1,
        "MobileOS": "ETC",
        "MobileApp": "AITravel",
        "_type": "json",
        "lDongRegnCd": region_code
    }

    response = requests.get(url, params=params)
    return response.json()

def find_sigungu_code(destination, region_code):
    data = get_sigungu_codes(region_code)

    items = data["response"]["body"]["items"]["item"]

    for sigungu in items:
        if destination in sigungu["name"]:
            return sigungu["code"]

    return None

def find_location_codes(destination):
    # 광주광역시 예외 처리
    if destination in ["광주", "광주광역시"]:
        return "12", ["210", "240", "270", "300", "330"]

    # 경기도 광주처럼 상위 지역까지 입력한 경우
    parts = destination.split()

    if len(parts) >= 2:
        region_name = parts[0]
        sigungu_name = parts[1]

        region_code = find_region_code(region_name)

        if region_code:
            sigungu_code = find_sigungu_code(sigungu_name, region_code)

            if sigungu_code:
                return region_code, sigungu_code

    region_data = get_region_codes()
    regions = region_data["response"]["body"]["items"]["item"]

    # 서울, 부산처럼 시·도 자체를 입력한 경우
    for region in regions:
        if destination in region["name"]:
            return region["code"], None

    # 여수, 경주, 강릉처럼 시·군·구를 입력한 경우
    for region in regions:
        sigungu_code = find_sigungu_code(destination, region["code"])

        if sigungu_code:
            return region["code"], sigungu_code

    return None, None