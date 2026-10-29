from fastapi import FastAPI
from pydantic import BaseModel
from backend.tour_api import get_places, get_region_codes
from backend.odsay_api import get_transit_route
from backend.tour_rank_api import get_rank_places
import os
from dotenv import load_dotenv
from backend.naver_directions import get_car_route
load_dotenv()

ODSAY_API_KEY = os.getenv("ODSAY_API_KEY")

app = FastAPI()


class TripRequest(BaseModel):
    destination: str
    startDate: str
    endDate: str
    styles: list[str]
    disliked: str
    transport: str
    people: int
    budget: int


@app.post("/trips")
def create_trip(trip: TripRequest):
    return {
        "destination": trip.destination,
        "startDate": trip.startDate,
        "endDate": trip.endDate,
        "styles": trip.styles,
        "disliked": trip.disliked,
        "transport": trip.transport,
        "people": trip.people,
        "budget": trip.budget
    }
@app.get("/")
def home():
    return {"message": "AI Travel Backend"}

@app.get("/places")
def places(destination: str, style: str):
    return get_places(destination, style)

@app.get("/transit")
def transit(sx: float, sy: float, ex: float, ey: float):
    return get_transit_route(sx, sy, ex, ey)

@app.get("/places-transit")
def places_transit(sx: float, sy: float):
    places = get_places()

    end = places[0]

    route = get_transit_route(
        sx,
        sy,
        end["longitude"],
        end["latitude"]
    )

    return {
        "start": "사용자 위치",
        "end": end["name"],
        "transit": route
    }

@app.get("/rank")
def rank(base_ym: str, area_cd: str, signgu_cd: str):
    return get_rank_places(base_ym, area_cd, signgu_cd)

@app.get("/region-codes")
def region_codes():
    return get_region_codes()

@app.get("/car-route")
def car_route(sx: float, sy: float, ex: float, ey: float):
    return get_car_route(sx, sy, ex, ey)


@app.get("/places-car-route")
def places_car_route(destination: str, style: str):
    places = get_places(destination, style)

    if len(places) < 2:
        return {"message": "장소가 2개 미만입니다.", "places": places}

    start = places[0]
    end = places[1]

    route = get_car_route(
        float(start["longitude"]),
        float(start["latitude"]),
        float(end["longitude"]),
        float(end["latitude"])
    )

    return {
        "places": [start, end],
        "carRoute": route
    }


@app.post("/places-by-styles")
def places_by_styles(trip: TripRequest):
    results = []

    for priority, style in enumerate(trip.styles, start=1):
        places = get_places(trip.destination, style)

        results.append({
            "priority": priority,
            "style": style,
            "places": places
        })

    return {
        "destination": trip.destination,
        "disliked": trip.disliked,
        "results": results
    }

