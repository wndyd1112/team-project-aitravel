import {
  Clock3,
  MapPin,
  Footprints,
  Bus,
  Car,
  Train,
  Map,
  ArrowDown,
  CalendarDays,
} from "lucide-react"

const confirmedPlan = [
  {
    day: "DAY 1",
    date: "10월 9일",
    places: [
      {
        time: "09:00",
        name: "부산 카페거리",
        type: "카페",
        description: "여유롭게 아침을 시작해보세요.",
      },
      {
        time: "11:00",
        name: "해운대 해수욕장",
        type: "관광",
        description: "부산을 대표하는 바다를 산책해보세요.",
        move: {
          type: "walk",
          label: "도보",
          duration: "12분",
          distance: "850m",
        },
      },
      {
        time: "13:00",
        name: "해운대 맛집",
        type: "맛집",
        description: "부산의 대표적인 음식을 즐겨보세요.",
        move: {
          type: "transit",
          label: "대중교통",
          duration: "18분",
          distance: "3.2km",
        },
      },
      {
        time: "15:30",
        name: "동백섬",
        type: "자연",
        description: "바다를 따라 산책하며 자연을 즐겨보세요.",
        move: {
          type: "walk",
          label: "도보",
          duration: "7분",
          distance: "500m",
        },
      },
    ],
  },
  {
    day: "DAY 2",
    date: "10월 10일",
    places: [
      {
        time: "09:00",
        name: "감천문화마을",
        type: "관광",
        description: "알록달록한 골목과 부산의 풍경을 만나보세요.",
      },
      {
        time: "12:00",
        name: "남포동 맛집",
        type: "맛집",
        description: "부산의 다양한 먹거리를 즐겨보세요.",
        move: {
          type: "transit",
          label: "대중교통",
          duration: "22분",
          distance: "4.1km",
        },
      },
      {
        time: "14:00",
        name: "BIFF 광장",
        type: "관광",
        description: "부산의 영화와 문화를 느껴보세요.",
        move: {
          type: "walk",
          label: "도보",
          duration: "5분",
          distance: "350m",
        },
      },
      {
        time: "17:00",
        name: "용두산공원",
        type: "자연",
        description: "부산 시내의 풍경을 감상해보세요.",
        move: {
          type: "walk",
          label: "도보",
          duration: "10분",
          distance: "700m",
        },
      },
    ],
  },
  {
    day: "DAY 3",
    date: "10월 11일",
    places: [
      {
        time: "09:00",
        name: "광안리 카페",
        type: "카페",
        description: "광안대교를 바라보며 여유로운 시간을 보내세요.",
      },
      {
        time: "11:30",
        name: "광안리 해변",
        type: "자연",
        description: "부산의 바다를 즐겨보세요.",
        move: {
          type: "walk",
          label: "도보",
          duration: "8분",
          distance: "600m",
        },
      },
      {
        time: "13:00",
        name: "부산 대표 맛집",
        type: "맛집",
        description: "여행의 마지막 식사를 즐겨보세요.",
        move: {
          type: "transit",
          label: "대중교통",
          duration: "15분",
          distance: "2.8km",
        },
      },
    ],
  },
]

function getTransportIcon(type) {
  if (type === "walk") {
    return <Footprints size={17} />
  }

  if (type === "transit") {
    return <Bus size={17} />
  }

  if (type === "train") {
    return <Train size={17} />
  }

  return <Car size={17} />
}

function getTransportStyle(type) {
  if (type === "walk") {
    return "bg-green-50 text-green-600"
  }

  if (type === "transit") {
    return "bg-blue-50 text-blue-600"
  }

  return "bg-gray-100 text-gray-600"
}

function getTotalMinutes(day) {
  return day.places.reduce((total, place) => {
    if (!place.move) {
      return total
    }

    const minutes = parseInt(place.move.duration)

    return total + minutes
  }, 0)
}

function getTransportTotal(day, type) {
  return day.places.reduce((total, place) => {
    if (!place.move || place.move.type !== type) {
      return total
    }

    return total + parseInt(place.move.duration)
  }, 0)
}

export default function Confirmed({
  travelData,
  onBack,
}) {
  const destination =
    travelData?.destination || "부산"

  const startDate =
    travelData?.startDate
      ? new Date(travelData.startDate)
      : new Date("2026-10-09")

  const endDate =
    travelData?.endDate
      ? new Date(travelData.endDate)
      : new Date("2026-10-15")

  const formatDate = (date) => {
    if (Number.isNaN(date.getTime())) {
      return ""
    }

    return `${date.getMonth() + 1}월 ${date.getDate()}일`
  }

  const nightCount = Math.max(
    0,
    Math.round(
      (endDate.getTime() - startDate.getTime()) /
        (1000 * 60 * 60 * 24)
    )
  )

  const dayCount = nightCount + 1

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-sky-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">

        {/* 제목 */}

        <div className="mb-10 text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-3xl">
            🎉
          </div>

          <p className="mb-2 text-sm font-semibold text-sky-500">
            TRIP CONFIRMED
          </p>

          <h2 className="text-4xl font-bold text-gray-900">
            여행 계획이 확정됐어요!
          </h2>

          <p className="mt-3 text-gray-500">
            이제 즐거운 여행을 시작해보세요.
          </p>
        </div>

        {/* 여행 정보 */}

        <div className="mb-8 rounded-3xl bg-white p-7 shadow-lg">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="flex items-center gap-2">
                <MapPin
                  size={20}
                  className="text-sky-500"
                />

                <h3 className="text-2xl font-bold text-gray-900">
                  {destination}
                </h3>
              </div>

              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <CalendarDays size={16} />

                {formatDate(startDate)}
                {" ~ "}
                {formatDate(endDate)}

                <span className="font-semibold text-gray-700">
                  ({nightCount}박 {dayCount}일)
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-sky-50 px-5 py-4 text-center">
              <p className="text-xs font-semibold text-gray-400">
                여행 기간
              </p>

              <p className="mt-1 text-xl font-bold text-sky-600">
                {nightCount}박 {dayCount}일
              </p>
            </div>

          </div>
        </div>

        {/* 일정 */}

        <div className="space-y-8">

          {confirmedPlan.map((day) => {

            const totalMinutes =
              getTotalMinutes(day)

            const walkMinutes =
              getTransportTotal(day, "walk")

            const transitMinutes =
              getTransportTotal(day, "transit")

            return (
              <section
                key={day.day}
                className="rounded-3xl bg-white p-7 shadow-lg"
              >

                {/* 날짜 */}

                <div className="mb-7 flex items-center justify-between">

                  <div>
                    <p className="text-sm font-bold text-sky-500">
                      {day.day}
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-gray-900">
                      {day.date}
                    </h3>
                  </div>

                  <div className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600">
                    {day.places.length}개 일정
                  </div>

                </div>

                {/* 타임라인 */}

                <div className="space-y-0">

                  {day.places.map(
                    (place, index) => (
                      <div key={`${day.day}-${place.time}-${index}`}>

                        {/* 장소 */}

                        <div className="flex gap-4">

                          <div className="w-16 shrink-0 pt-1 text-sm font-bold text-gray-900">
                            <div className="flex items-center gap-1">
                              <Clock3
                                size={14}
                                className="text-sky-500"
                              />

                              {place.time}
                            </div>
                          </div>

                          <div className="relative flex flex-1 gap-4 pb-5">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                              <MapPin size={20} />
                            </div>

                            <div>
                              <div className="flex flex-wrap items-center gap-2">

                                <h4 className="font-bold text-gray-900">
                                  {place.name}
                                </h4>

                                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-500">
                                  {place.type}
                                </span>

                              </div>

                              <p className="mt-1 text-sm text-gray-500">
                                {place.description}
                              </p>

                            </div>
                          </div>

                        </div>

                        {/* 이동 정보 */}

                        {place.move && (
                          <div className="ml-16 flex items-center gap-3 pb-5">

                            <div className="h-8 border-l-2 border-dashed border-gray-200" />

                            <div
                              className={`flex flex-1 items-center justify-between rounded-xl px-4 py-3 ${getTransportStyle(
                                place.move.type
                              )}`}
                            >

                              <div className="flex items-center gap-2">

                                {getTransportIcon(
                                  place.move.type
                                )}

                                <span className="text-sm font-semibold">
                                  {place.move.label}
                                </span>

                              </div>

                              <div className="text-right">

                                <p className="text-sm font-bold">
                                  {place.move.duration}
                                </p>

                                <p className="text-xs opacity-70">
                                  {place.move.distance}
                                </p>

                              </div>

                            </div>

                            <ArrowDown
                              size={15}
                              className="text-gray-300"
                            />

                          </div>
                        )}

                      </div>
                    )
                  )}

                </div>

                {/* 하루 이동 요약 */}

                <div className="mt-3 border-t border-gray-100 pt-5">

                  <div className="mb-3 flex items-center justify-between">

                    <h4 className="font-bold text-gray-900">
                      오늘의 이동
                    </h4>

                    <span className="text-sm font-semibold text-gray-500">
                      총 {totalMinutes}분
                    </span>

                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">

                    <div className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-3">

                      <div className="flex items-center gap-2 text-green-600">
                        <Footprints size={18} />

                        <span className="text-sm font-semibold">
                          도보
                        </span>
                      </div>

                      <span className="text-sm font-bold text-green-700">
                        {walkMinutes}분
                      </span>

                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3">

                      <div className="flex items-center gap-2 text-blue-600">
                        <Bus size={18} />

                        <span className="text-sm font-semibold">
                          대중교통
                        </span>
                      </div>

                      <span className="text-sm font-bold text-blue-700">
                        {transitMinutes}분
                      </span>

                    </div>

                  </div>

                </div>

                {/* 지도 버튼 */}

                <button
                  type="button"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-sky-200 py-3 text-sm font-semibold text-sky-600 transition hover:bg-sky-50"
                >
                  <Map size={18} />
                  지도에서 오늘 일정 보기
                </button>

              </section>
            )
          })}

        </div>

        {/* 하단 안내 */}

        <div className="mt-8 rounded-3xl bg-gray-900 p-7 text-center text-white">

          <p className="text-lg font-bold">
            즐거운 여행 되세요! ✈️
          </p>

          <p className="mt-2 text-sm text-gray-400">
            이동 시간과 경로는 실제 교통 상황에 따라 달라질 수 있습니다.
          </p>

        </div>

        {/* 돌아가기 */}

        <div className="mt-8 flex justify-center">

          <button
            type="button"
            onClick={onBack}
            className="rounded-2xl bg-white px-8 py-4 text-sm font-bold text-gray-700 ring-1 ring-gray-300 transition hover:bg-gray-100"
          >
            여행 계획 다시 보기
          </button>

        </div>

      </div>
    </main>
  )
}