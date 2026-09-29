from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class LocationInput(BaseModel):
    id: str = Field(..., description="장소 ID")
    name: str = Field(..., description="장소명")
    category: str = Field(..., description="카테고리 (RESTAURANT, CAFE, ATTRACTION, CAFE_BAKERY, EXPERIENCE 등)")
    latitude: float = Field(..., description="위도")
    longitude: float = Field(..., description="경도")
    rank: Optional[int] = Field(None, description="한국관광 데이터랩 맛집/관광지 순위 (1~50위, 없으면 None)")

class TravelRequest(BaseModel):
    start_time: str = Field("09:00", description="일정 시작 시각 (HH:MM)")
    travel_mode: str = Field("CAR", description="이동 수단: CAR, TRANSIT, WALK")
    weights: Dict[str, float] = Field(default_factory=dict, description="사용자 취향 가중치")
    locations: List[LocationInput] = Field(..., description="방문 후보 장소 목록")
    duration_matrix: Dict[str, Dict[str, int]] = Field(default_factory=dict, description="장소 간 이동시간 Matrix (분 단위)")

class ScheduledItem(BaseModel):
    location_id: str
    location_name: str
    category: str
    arrival_time: str
    wait_time_min: int
    stay_duration_min: int
    departure_time: str
    estimated_rating: float

class OptimizationResponse(BaseModel):
    status: str = "SUCCESS"
    total_duration_min: int
    timeline: List[ScheduledItem]