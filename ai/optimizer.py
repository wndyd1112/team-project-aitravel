import math
from typing import List, Tuple
from schemas import TravelRequest, Location, PreferenceWeights

class CSPOptimizer:
    def __init__(self, request: TravelRequest):
        self.request = request
        self.candidates = request.candidate_locations
        self.weights = request.weights

    def calculate_preference_score(self, location: Location) -> float:
        """
        [PPT 4p 반영] 카테고리별 취향 가중치를 반영한 점수 계산
        - 맛집(food): food_score
        - 관광(attraction): attraction_score
        - 카페(cafe): cafe_score
        """
        category_map = {
            "food": self.weights.food_score,
            "attraction": self.weights.attraction_score,
            "cafe": self.weights.cafe_score
        }
        # 기본 가중치 적용 (기본값 3.0)
        base_weight = category_map.get(location.category.lower(), 3.0)
        return float(base_weight)

    def filter_and_rank_by_csp(self) -> List[Tuple[Location, float]]:
        """
        [CSP 1단계] 하드 제약조건 필터링 + 선호도 점수 정렬
        - 1. 예산 제한 초과 장소 제외
        - 2. 선호도 점수 높은 순으로 상위 후보지 추출
        """
        valid_candidates = []
        current_budget_limit = self.request.max_budget

        for loc in self.candidates:
            # 1. 예산 제약조건 검사
            if loc.cost > current_budget_limit:
                continue

            # 2. 취향 가중치 기반 점수 계산
            score = self.calculate_preference_score(loc)
            valid_candidates.append((loc, score))

        # 점수가 높은 순으로 정렬
        valid_candidates.sort(key=lambda x: x[1], reverse=True)
        return valid_candidates