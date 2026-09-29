import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Utensils,
  Landmark,
  Trees,
  Coffee,
  Trash2,
  Plus,
} from "lucide-react";

const samplePlan = [
  {
    day: "DAY 1",
    date: "10월 3일",
    places: [
      {
        time: "09:00",
        name: "부산 카페거리",
        description: "여행을 시작하며 여유롭게 아침을 즐겨보세요.",
        type: "카페",
        icon: Coffee,
      },
      {
        time: "11:00",
        name: "해운대 해수욕장",
        description: "부산을 대표하는 바다를 산책해보세요.",
        type: "관광",
        icon: Landmark,
      },
      {
        time: "13:00",
        name: "해운대 맛집",
        description: "부산의 대표적인 음식을 즐겨보세요.",
        type: "맛집",
        icon: Utensils,
      },
      {
        time: "15:30",
        name: "동백섬",
        description: "바다를 따라 산책하며 자연을 즐겨보세요.",
        type: "자연",
        icon: Trees,
      },
    ],
  },
  {
    day: "DAY 2",
    date: "10월 4일",
    places: [
      {
        time: "09:30",
        name: "감천문화마을",
        description: "알록달록한 골목과 부산의 풍경을 만나보세요.",
        type: "관광",
        icon: Landmark,
      },
      {
        time: "12:00",
        name: "남포동 맛집",
        description: "부산의 다양한 먹거리를 즐겨보세요.",
        type: "맛집",
        icon: Utensils,
      },
      {
        time: "14:00",
        name: "BIFF 광장",
        description: "부산의 영화와 문화를 느껴보세요.",
        type: "관광",
        icon: Landmark,
      },
      {
        time: "17:00",
        name: "용두산공원",
        description: "부산 시내의 풍경을 감상해보세요.",
        type: "자연",
        icon: Trees,
      },
    ],
  },
  {
    day: "DAY 3",
    date: "10월 5일",
    places: [
      {
        time: "09:30",
        name: "광안리 카페",
        description: "광안대교를 바라보며 여유로운 시간을 보내세요.",
        type: "카페",
        icon: Coffee,
      },
      {
        time: "11:30",
        name: "광안리 해변",
        description: "마지막 날 부산의 바다를 즐겨보세요.",
        type: "자연",
        icon: Trees,
      },
      {
        time: "13:00",
        name: "부산 대표 맛집",
        description: "여행의 마지막 식사를 즐겨보세요.",
        type: "맛집",
        icon: Utensils,
      },
    ],
  },
];

export default function Result({ travelData, onBack }) {
  // 수정 모드
  const [isEditing, setIsEditing] = useState(false);

  // 여행 일정
  const [plan, setPlan] = useState(samplePlan);

  // =========================================
  // 일정 수정
  // =========================================

  const handleChange = (dayIndex, placeIndex, field, value) => {
    setPlan((currentPlan) =>
      currentPlan.map((day, dIndex) => {
        if (dIndex !== dayIndex) {
          return day;
        }

        return {
          ...day,
          places: day.places.map((place, pIndex) => {
            if (pIndex !== placeIndex) {
              return place;
            }

            return {
              ...place,
              [field]: value,
            };
          }),
        };
      })
    );
  };

  // =========================================
  // 일정 삭제
  // =========================================

  const handleDelete = (dayIndex, placeIndex) => {
    setPlan((currentPlan) =>
      currentPlan.map((day, dIndex) => {
        if (dIndex !== dayIndex) {
          return day;
        }

        return {
          ...day,
          places: day.places.filter(
            (_, pIndex) => pIndex !== placeIndex
          ),
        };
      })
    );
  };

  // =========================================
  // 일정 추가
  // =========================================

  const handleAdd = (dayIndex) => {
    setPlan((currentPlan) =>
      currentPlan.map((day, dIndex) => {
        if (dIndex !== dayIndex) {
          return day;
        }

        return {
          ...day,
          places: [
            ...day.places,
            {
              time: "18:00",
              name: "새로운 일정",
              description: "새로운 일정을 입력해주세요.",
              type: "관광",
              icon: Landmark,
            },
          ],
        };
      })
    );
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-sky-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* ========================================= */}
        {/* 상단 */}
        {/* ========================================= */}

        <div className="mb-8">

          <button
            onClick={onBack}
            className="mb-5 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            <ArrowLeft size={18} />
            다시 설정하기
          </button>

          <div className="rounded-3xl bg-white p-8 shadow-lg">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div>

                <p className="mb-2 text-sm font-semibold text-sky-500">
                  YOUR TRAVEL PLAN
                </p>

                <h1 className="text-3xl font-bold text-gray-900">
                  {travelData?.destination || "여행"} 여행 계획
                </h1>

                <p className="mt-3 text-gray-500">
                  당신의 여행 스타일을 바탕으로 추천한 여행 일정입니다.
                </p>

              </div>

              {/* 날짜 */}
              <div className="flex flex-wrap gap-3">

                <div className="flex items-center gap-2 rounded-xl bg-sky-50 px-4 py-3 text-sm text-gray-700">

                  <CalendarDays
                    size={18}
                    className="text-sky-500"
                  />

                  {travelData?.startDate
                    ? travelData.startDate.toLocaleDateString()
                    : "출발일"}

                  {" ~ "}

                  {travelData?.endDate
                    ? travelData.endDate.toLocaleDateString()
                    : "도착일"}

                </div>

                <div className="rounded-xl bg-sky-50 px-4 py-3 text-sm font-medium text-gray-700">
                  {travelData?.startDate && travelData?.endDate
                    ? `${Math.ceil(
                        (travelData.endDate - travelData.startDate) /
                          (1000 * 60 * 60 * 24)
                      )}박 ${
                        Math.ceil(
                          (travelData.endDate - travelData.startDate) /
                            (1000 * 60 * 60 * 24)
                        ) + 1
                      }일`
                    : "여행 기간"}
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* ========================================= */}
        {/* 내가 선택한 여행 조건 */}
        {/* ========================================= */}

        <div className="mb-8 rounded-3xl bg-white p-7 shadow-lg">

          <p className="text-sm font-semibold text-sky-500">
            MY TRAVEL CONDITIONS
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            내가 선택한 여행 조건
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">

            {/* 여행지 */}
            <div className="rounded-2xl bg-sky-50 p-5">

              <p className="text-sm text-gray-500">
                여행지
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {travelData?.destination || "입력하지 않음"}
              </p>

            </div>

            {/* 여행 기간 */}
            <div className="rounded-2xl bg-sky-50 p-5">

              <p className="text-sm text-gray-500">
                여행 기간
              </p>

              <p className="mt-1 font-semibold text-gray-900">

                {travelData?.startDate
                  ? travelData.startDate.toLocaleDateString()
                  : "출발일"}

                {" ~ "}

                {travelData?.endDate
                  ? travelData.endDate.toLocaleDateString()
                  : "도착일"}

              </p>

            </div>

            {/* 여행 스타일 */}
            <div className="rounded-2xl bg-sky-50 p-5">

              <p className="text-sm text-gray-500">
                선호하는 여행
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {travelData?.styles?.length > 0
                  ? travelData.styles.join(", ")
                  : "선택하지 않음"}
              </p>

            </div>

            {/* 선호하지 않는 여행 */}
            <div className="rounded-2xl bg-sky-50 p-5">

              <p className="text-sm text-gray-500">
                선호하지 않는 여행
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {travelData?.disliked || "없음"}
              </p>

            </div>

            {/* 이동수단 */}
            <div className="rounded-2xl bg-sky-50 p-5">

              <p className="text-sm text-gray-500">
                이동수단
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {travelData?.transport || "선택하지 않음"}
              </p>

            </div>

            {/* 여행 인원 */}
            <div className="rounded-2xl bg-sky-50 p-5">

              <p className="text-sm text-gray-500">
                여행 인원
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {travelData?.people
                  ? `${travelData.people}명`
                  : "입력하지 않음"}
              </p>

            </div>

            {/* 예산 */}
            <div className="rounded-2xl bg-sky-50 p-5 sm:col-span-2">

              <p className="text-sm text-gray-500">
                여행 예산
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {travelData?.budget || "선택하지 않음"}
              </p>

            </div>

          </div>
        </div>

        {/* ========================================= */}
        {/* 추천 설명 */}
        {/* ========================================= */}

        <div className="mb-8 rounded-3xl bg-sky-500 p-7 text-white shadow-lg">

          <p className="text-sm font-semibold text-sky-100">
            AI TRAVEL RECOMMENDATION
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            맛집과 자연을 중심으로 여행 일정을 구성했어요.
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-sky-50">
            입력하신 여행 조건을 바탕으로 이동 시간을 고려하면서
            주요 관광지와 맛집을 적절하게 배치한 일정입니다.
            실제 AI 추천 데이터가 연결되면 이 부분도 자동으로 변경됩니다.
          </p>

        </div>

        {/* ========================================= */}
        {/* 일정 */}
        {/* ========================================= */}

        <div className="space-y-8">

          {plan.map((day, dayIndex) => (

            <section
              key={day.day}
              className="rounded-3xl bg-white p-7 shadow-lg"
            >

              {/* DAY 제목 */}

              <div className="mb-6 flex items-center justify-between">

                <div>

                  <p className="text-sm font-bold text-sky-500">
                    {day.day}
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-gray-900">
                    {day.date}
                  </h2>

                </div>

                <div className="rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-600">
                  {day.places.length}개의 일정
                </div>

              </div>

              {/* 일정 목록 */}

              <div className="space-y-4">

                {day.places.map((place, placeIndex) => {

                  const Icon = place.icon;

                  return (

                    <div
                      key={`${day.day}-${placeIndex}`}
                      className="rounded-2xl border border-gray-100 p-5 transition hover:border-sky-200 hover:bg-sky-50/50"
                    >

                      <div className="flex gap-4">

                        {/* 시간 */}

                        <div className="w-24 shrink-0 pt-1">

                          <div className="flex items-center gap-1 text-sm font-bold text-gray-900">

                            <Clock3
                              size={15}
                              className="text-sky-500"
                            />

                            {isEditing ? (

                              <input
                                type="time"
                                value={place.time}
                                onChange={(e) =>
                                  handleChange(
                                    dayIndex,
                                    placeIndex,
                                    "time",
                                    e.target.value
                                  )
                                }
                                className="rounded-lg border border-gray-200 px-2 py-1 text-sm outline-none focus:border-sky-500"
                              />

                            ) : (

                              place.time

                            )}

                          </div>

                        </div>

                        {/* 아이콘 */}

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">

                          <Icon size={22} />

                        </div>

                        {/* 내용 */}

                        <div className="min-w-0 flex-1">

                          <div className="flex flex-wrap items-center gap-2">

                            {/* 장소 이름 */}

                            {isEditing ? (

                              <input
                                type="text"
                                value={place.name}
                                onChange={(e) =>
                                  handleChange(
                                    dayIndex,
                                    placeIndex,
                                    "name",
                                    e.target.value
                                  )
                                }
                                className="w-full max-w-md rounded-lg border border-gray-200 px-3 py-2 text-lg font-bold text-gray-900 outline-none focus:border-sky-500"
                              />

                            ) : (

                              <h3 className="text-lg font-bold text-gray-900">
                                {place.name}
                              </h3>

                            )}

                            {/* 종류 */}

                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                              {place.type}
                            </span>

                          </div>

                          {/* 설명 */}

                          {isEditing ? (

                            <textarea
                              value={place.description}
                              onChange={(e) =>
                                handleChange(
                                  dayIndex,
                                  placeIndex,
                                  "description",
                                  e.target.value
                                )
                              }
                              rows={2}
                              className="mt-3 w-full resize-none rounded-lg border border-gray-200 p-3 text-sm text-gray-700 outline-none focus:border-sky-500"
                            />

                          ) : (

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                              {place.description}
                            </p>

                          )}

                          {/* 위치 */}

                          <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">

                            <MapPin size={14} />

                            {travelData?.destination || "여행지"}

                          </div>

                          {/* 삭제 */}

                          {isEditing && (

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(dayIndex, placeIndex)
                              }
                              className="mt-4 flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-100"
                            >
                              <Trash2 size={14} />
                              일정 삭제
                            </button>

                          )}

                        </div>

                      </div>

                    </div>

                  );

                })}

              </div>

              {/* 일정 추가 */}

              {isEditing && (

                <button
                  type="button"
                  onClick={() => handleAdd(dayIndex)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-sky-300 py-3 text-sm font-semibold text-sky-500 transition hover:bg-sky-50"
                >
                  <Plus size={18} />
                  일정 추가
                </button>

              )}

            </section>

          ))}

        </div>

        {/* ========================================= */}
        {/* 하단 버튼 */}
        {/* ========================================= */}

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          {/* 다시 만들기 */}

          <button
            type="button"
            onClick={onBack}
            className="rounded-2xl bg-gray-900 px-8 py-4 text-sm font-bold text-white transition hover:bg-gray-800"
          >
            여행 계획 다시 만들기
          </button>

          {/* 수정하기 / 수정 완료 */}

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="rounded-2xl bg-white px-8 py-4 text-sm font-bold text-gray-900 ring-1 ring-gray-300 transition hover:bg-gray-100"
          >
            {isEditing ? "수정 완료" : "여행 계획 수정하기"}
          </button>

          {/* 확정하기 */}

          <button
            type="button"
            onClick={() => alert("여행 계획이 확정되었습니다!")}
            className="rounded-2xl bg-sky-500 px-8 py-4 text-sm font-bold text-white transition hover:bg-sky-600"
          >
            여행 계획 확정하기
          </button>

        </div>

      </div>
    </main>
  );
}