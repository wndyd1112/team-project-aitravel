from fastapi import FastAPI
from schemas import TravelRequest, OptimizationResponse, ScheduledItem
from optimizer import CSPOptimizer

app = FastAPI(title="AI Travel Planner Optimization Engine")

@app.get("/")
def read_root():
    return {"message": "AI 여행 일정 최적화 서버가 정상 가동 중입니다."}

@app.post("/api/v1/optimize", response_model=OptimizationResponse)
def optimize_itinerary(request: TravelRequest):
    csp_engine = CSPOptimizer(request)
    ranked_locations = csp_engine.filter_and_rank_by_csp()
    
    timeline = []
    current_time_min = 9 * 60  # 09:00 시작 (분 환산)
    
    for loc, score in ranked_locations:
        hour = current_time_min // 60
        minute = current_time_min % 60
        arrival_str = f"{hour:02d}:{minute:02d}"
        
        wait_time = csp_engine.calculate_wait_time(loc.rank, hour)
        stay_time = csp_engine.get_stay_duration(loc.category)
        rating = csp_engine.calculate_rating(loc.rank)
        
        dept_time_min = current_time_min + wait_time + stay_time
        d_hour = dept_time_min // 60
        d_minute = dept_time_min % 60
        departure_str = f"{d_hour:02d}:{d_minute:02d}"
        
        timeline.append(ScheduledItem(
            location_id=loc.id,
            location_name=loc.name,
            category=loc.category,
            arrival_time=arrival_str,
            wait_time_min=wait_time,
            stay_duration_min=stay_time,
            departure_time=departure_str,
            estimated_rating=rating
        ))
        current_time_min = dept_time_min + 15  # 이동시간 기본 15분 가정
        
    return OptimizationResponse(
        status="SUCCESS",
        total_duration_min=current_time_min - (9 * 60),
        timeline=timeline
    )