from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, Field

class TransportMode(str, Enum):
    WALK = "walk"
    CAR = "car"
    PUBLIC = "public"

class Location(BaseModel):
    id: str
    name: str
    lat: float
    lng: float
    category: str  # 예: "food", "attraction", "cafe"
    visit_duration: int  # 권장 체류 시간 (분 단위)
    open_time: int = 0   # 영업 시작 시간 (09:00 -> 540)
    close_time: int = 1440  # 영업 종료 시간 (21:00 -> 1260)
    cost: int = 0

class PreferenceWeights(BaseModel):
    food_score: int = Field(default=5, ge=1, le=5)       # 맛집 선호도 (1~5)
    attraction_score: int = Field(default=4, ge=1, le=5) # 관광 선호도 (1~5)
    cafe_score: int = Field(default=5, ge=1, le=5)       # 카페 선호도 (1~5)

class TravelRequest(BaseModel):
    start_location: Location
    end_location: Optional[Location] = None
    candidate_locations: List[Location]
    start_time: int = 540   # 일정 시작 (09:00 -> 540분)
    end_time: int = 1260   # 일정 종료 (21:00 -> 1260분)
    transport_mode: TransportMode = TransportMode.PUBLIC
    max_budget: int = 500000  # 예산 제한
    weights: PreferenceWeights