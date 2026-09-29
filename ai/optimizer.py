from typing import List, Tuple
from schemas import TravelRequest, LocationInput

class CSPOptimizer:
    def __init__(self, request: TravelRequest):
        self.request = request

    def get_stay_duration(self, category: str) -> int:
        cat = category.upper()
        if "CAFE" in cat or "BAKERY" in cat:
            return 45
        elif "RESTAURANT" in cat or "FOOD" in cat:
            return 60
        elif "EXPERIENCE" in cat:
            return 120
        else:
            return 90

    def calculate_wait_time(self, rank: int, visit_hour: int) -> int:
        wait = 0
        if rank:
            if 1 <= rank <= 10:
                wait += 30
            elif 11 <= rank <= 20:
                wait += 20
            elif 21 <= rank <= 30:
                wait += 10
            elif 31 <= rank <= 50:
                wait += 5

        # 피크 타임 가중치 (점심: 12~13:30, 저녁: 17:30~19:30)
        if visit_hour in [12, 13, 17, 18, 19]:
            wait += 20
        return wait

    def calculate_rating(self, rank: int) -> float:
        if not rank:
            return 3.5
        if 1 <= rank <= 10:
            return 4.8
        elif 11 <= rank <= 30:
            return 4.5
        elif 31 <= rank <= 50:
            return 4.0
        return 3.5

    def filter_and_rank_by_csp(self) -> List[Tuple[LocationInput, float]]:
        # 제약 조건 만족 및 기본 순위 정렬
        ranked = []
        for loc in self.request.locations:
            score = 100.0 - (loc.rank if loc.rank else 51)
            ranked.append((loc, score))
        ranked.sort(key=lambda x: x[1], reverse=True)
        return ranked