from fastapi import FastAPI
from pydantic import BaseModel

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
