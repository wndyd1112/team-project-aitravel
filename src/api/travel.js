const API_URL = "http://10.23.244.156:8000/trips";

export async function createTravelPlan(travelData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(travelData),
  });

  if (!response.ok) {
    throw new Error("여행 일정 생성에 실패했습니다.");
  }

  return await response.json();
}