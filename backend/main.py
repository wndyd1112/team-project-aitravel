from fastapi import FastAPI

app = FastAPI()

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class TripRequest(BaseModel):
    region: str
    days: int
    preference: str


@app.post("/trips")
def create_trip(trip: TripRequest):
    return {
        "region": trip.region,
        "days": trip.days,
        "preference": trip.preference
    }
@app.get("/")
def home():
    return {"message": "AI Travel Backend"}
