from fastapi import FastAPI
from schemas import TravelRequest
from optimizer import CSPOptimizer

app = FastAPI(title="AI Travel Planner Optimization Engine")

@app.get("/")
def read_root():
    return {"message": "AI 여행 일정 최적화 서버가 정상 가동 중입니다."}

@app.post("/api/v1/optimize")
def optimize_itinerary(request: TravelRequest):
    # CSP 엔진 가동
    csp_engine = CSPOptimizer(request)
    ranked_locations = csp_engine.filter_and_rank_by_csp()
    
    # 정렬된 장소 목록 추출
    recommended_list = [
        {
            "id": loc.id,
            "name": loc.name,
            "category": loc.category,
            "preference_score": score,
            "cost": loc.cost
        }
        for loc, score in ranked_locations
    ]

    return {
        "status": "SUCCESS",
        "message": f"총 {len(recommended_list)}개의 후보지가 취향 가중치 및 제약조건에 맞춰 추천되었습니다.",
        "user_weights": request.weights,
        "recommendations": recommended_list
    }