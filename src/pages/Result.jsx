import { useState } from "react"

import {
  DndContext,
  closestCenter,
  useDroppable,
} from "@dnd-kit/core"

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"

import { CSS } from "@dnd-kit/utilities"

import {
  Clock3,
  MapPin,
  Coffee,
  Landmark,
  Utensils,
  Trees,
  Trash2,
  Plus,
  X,
} from "lucide-react"


// ------------------------------------
// 샘플 여행 일정
// ------------------------------------

const samplePlan = [
  {
    id: 1,
    date: "10월 3일",
    places: [
      {
        id: "place-1",
        time: "09:00",
        name: "부산 카페거리",
        description: "분위기 좋은 카페에서 여유롭게 아침을 시작해보세요.",
        category: "카페",
        icon: Coffee,
      },
      {
        id: "place-2",
        time: "11:00",
        name: "해운대 해수욕장",
        description: "부산을 대표하는 해변에서 바다를 즐겨보세요.",
        category: "관광",
        icon: Landmark,
      },
      {
        id: "place-3",
        time: "13:00",
        name: "해운대 맛집",
        description: "부산의 대표적인 음식과 맛집을 즐겨보세요.",
        category: "맛집",
        icon: Utensils,
      },
      {
        id: "place-4",
        time: "15:30",
        name: "동백섬",
        description: "해운대 주변의 아름다운 자연을 감상해보세요.",
        category: "자연",
        icon: Trees,
      },
    ],
  },
  {
    id: 2,
    date: "10월 4일",
    places: [
      {
        id: "place-5",
        time: "09:00",
        name: "감천문화마을",
        description: "알록달록한 골목길과 예쁜 풍경을 만나보세요.",
        category: "관광",
        icon: Landmark,
      },
      {
        id: "place-6",
        time: "12:00",
        name: "남포동 맛집",
        description: "남포동에서 부산의 다양한 음식을 즐겨보세요.",
        category: "맛집",
        icon: Utensils,
      },
      {
        id: "place-7",
        time: "14:00",
        name: "BIFF 광장",
        description: "부산의 대표적인 번화가를 둘러보세요.",
        category: "관광",
        icon: Landmark,
      },
      {
        id: "place-8",
        time: "17:00",
        name: "용두산공원",
        description: "부산 시내를 한눈에 볼 수 있는 공원입니다.",
        category: "자연",
        icon: Trees,
      },
    ],
  },
  {
    id: 3,
    date: "10월 5일",
    places: [
      {
        id: "place-9",
        time: "09:00",
        name: "광안리 카페",
        description: "광안대교를 바라보며 커피를 즐겨보세요.",
        category: "카페",
        icon: Coffee,
      },
      {
        id: "place-10",
        time: "11:30",
        name: "광안리 해변",
        description: "광안리 해변을 산책하며 바다를 즐겨보세요.",
        category: "자연",
        icon: Trees,
      },
      {
        id: "place-11",
        time: "13:00",
        name: "부산 대표 맛집",
        description: "부산 여행의 마지막 식사를 즐겨보세요.",
        category: "맛집",
        icon: Utensils,
      },
    ],
  },
]


// ------------------------------------
// 시간 표시
// ------------------------------------

const formatTime = (time) => {
  if (!time) return ""

  const [hourString, minute] = time.split(":")
  const hour = Number(hourString)

  if (hour < 12) {
    return `오전 ${hour === 0 ? 12 : hour}:${minute}`
  }

  return `오후 ${hour === 12 ? 12 : hour - 12}:${minute}`
}


// ------------------------------------
// 시간 선택용 함수
// ------------------------------------

const getPeriod = (time) => {
  if (!time) return ""

  const hour = Number(time.split(":")[0])

  return hour < 12 ? "오전" : "오후"
}


const getDisplayHour = (time) => {
  if (!time) return ""

  const hour = Number(time.split(":")[0])

  return String(hour % 12 || 12)
}


// ------------------------------------
// 장소 상세정보
// ------------------------------------

const getPlaceDetail = (place) => {
  const details = {
    감천문화마을: {
      address: "부산 사하구 감천동",
      rating: "4.5",
      stay: "1시간 30분",
      hours: "09:00 ~ 18:00",
      description:
        "알록달록한 집들이 모여 있는 부산의 대표적인 관광 명소입니다.",
    },

    "해운대 해수욕장": {
      address: "부산 해운대구 해운대해변로",
      rating: "4.6",
      stay: "2시간",
      hours: "상시 이용",
      description:
        "부산을 대표하는 해수욕장으로 바다와 주변 관광지를 함께 즐길 수 있습니다.",
    },

    동백섬: {
      address: "부산 해운대구 동백로",
      rating: "4.5",
      stay: "1시간",
      hours: "상시 이용",
      description:
        "해운대 해변과 연결된 아름다운 자연 명소입니다.",
    },

    남포동: {
      address: "부산 중구 남포동",
      rating: "4.4",
      stay: "1시간 30분",
      hours: "매장별 상이",
      description:
        "맛집과 쇼핑, 다양한 볼거리가 모여 있는 부산의 대표적인 번화가입니다.",
    },

    "BIFF 광장": {
      address: "부산 중구 비프광장로",
      rating: "4.3",
      stay: "1시간",
      hours: "상시 이용",
      description:
        "부산 국제영화제의 중심지로 다양한 먹거리와 볼거리를 즐길 수 있습니다.",
    },

    용두산공원: {
      address: "부산 중구 용두산길",
      rating: "4.5",
      stay: "1시간",
      hours: "상시 이용",
      description:
        "부산타워와 아름다운 전망을 볼 수 있는 부산의 대표적인 공원입니다.",
    },

    "광안리 해변": {
      address: "부산 수영구 광안해변로",
      rating: "4.6",
      stay: "1시간 30분",
      hours: "상시 이용",
      description:
        "광안대교의 아름다운 야경으로 유명한 부산의 대표적인 해변입니다.",
    },
  }

  return (
    details[place.name] || {
      address: "부산광역시",
      rating: "4.3",
      stay: "1시간",
      hours: "매장별 상이",
      description: "여행 일정에 포함된 추천 장소입니다.",
    }
  )
}


// ------------------------------------
// 날짜 드롭존
// ------------------------------------

function DayDropZone({ dayId, children }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `day-${dayId}`,
  })

  return (
    <div
      ref={setNodeRef}
      className={`rounded-3xl transition ${
        isOver ? "bg-sky-50" : ""
      }`}
    >
      {children}
    </div>
  )
}


// ------------------------------------
// 장소 카드
// ------------------------------------

function SortablePlace({
  place,
  isEditing,
  handleChange,
  handleDelete,
  setSelectedPlace,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: place.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }


  // -------------------------------
  // 시간 변경
  // -------------------------------

  const handleTimeChange = (type, value) => {
    const currentTime = place.time || "09:00"

    let hour = Number(currentTime.split(":")[0])
    let minute = currentTime.split(":")[1]

    if (type === "period") {
      if (value === "오전") {
        if (hour >= 12) {
          hour -= 12
        }
      } else {
        if (hour < 12) {
          hour += 12
        }
      }
    }


    if (type === "hour") {
      const displayHour = Number(value)

      const isPM = hour >= 12

      if (isPM) {
        hour = displayHour === 12 ? 12 : displayHour + 12
      } else {
        hour = displayHour === 12 ? 0 : displayHour
      }
    }


    if (type === "minute") {
      minute = value
    }


    const newTime =
      `${String(hour).padStart(2, "0")}:${minute}`

    handleChange(place.id, "time", newTime)
  }


  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`rounded-2xl border bg-white p-4 shadow-sm ${
        !isEditing
          ? "cursor-pointer hover:shadow-md"
          : ""
      }`}
      onClick={() =>
        !isEditing && setSelectedPlace(place)
      }
    >
      <div className="flex items-start gap-4">

        {/* 드래그 영역 */}
        <div
          {...listeners}
          className="cursor-grab pt-1 text-gray-300 active:cursor-grabbing"
          onClick={(e) => e.stopPropagation()}
        >
          ⋮⋮
        </div>


        {/* 시간 */}
        <div
          className="w-auto shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {isEditing ? (
            <div className="flex items-center gap-1">

              {/* 오전 / 오후 */}
              <select
                value={getPeriod(place.time)}
                onChange={(e) =>
                  handleTimeChange(
                    "period",
                    e.target.value
                  )
                }
                className="rounded-lg border px-2 py-2 text-sm"
              >
                <option value="오전">오전</option>
                <option value="오후">오후</option>
              </select>


              {/* 시 */}
              <select
                value={getDisplayHour(place.time)}
                onChange={(e) =>
                  handleTimeChange(
                    "hour",
                    e.target.value
                  )
                }
                className="rounded-lg border px-2 py-2 text-sm"
              >
                {Array.from(
                  { length: 12 },
                  (_, index) => {
                    const hour = index + 1

                    return (
                      <option
                        key={hour}
                        value={hour}
                      >
                        {hour}
                      </option>
                    )
                  }
                )}
              </select>


              {/* 분 */}
              <select
                value={
                  place.time
                    ? place.time.split(":")[1]
                    : "00"
                }
                onChange={(e) =>
                  handleTimeChange(
                    "minute",
                    e.target.value
                  )
                }
                className="rounded-lg border px-2 py-2 text-sm"
              >
                {["00", "10", "20", "30", "40", "50"].map(
                  (minute) => (
                    <option
                      key={minute}
                      value={minute}
                    >
                      {minute}
                    </option>
                  )
                )}
              </select>

            </div>
          ) : (
            <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
              <Clock3 size={16} />
              {formatTime(place.time)}
            </div>
          )}
        </div>


        {/* 장소 내용 */}
        <div className="min-w-0 flex-1">
<div
  className="min-w-0 flex-1"
  onClick={(e) => e.stopPropagation()}
>
  {place.isNew ? (
    <div className="space-y-2">
      <input
        autoFocus
        value={place.name}
        onChange={(e) =>
          handleChange(
            place.id,
            "name",
            e.target.value
          )
        }
        placeholder="장소 이름을 입력하세요"
        className="w-full rounded-lg border px-3 py-2 font-semibold outline-none focus:border-sky-400"
      />

      <textarea
        value={place.description}
        onChange={(e) =>
          handleChange(
            place.id,
            "description",
            e.target.value
          )
        }
        placeholder="장소에 대한 간단한 설명을 입력하세요"
        rows={2}
        className="w-full resize-none rounded-lg border px-3 py-2 text-sm outline-none focus:border-sky-400"
      />
    </div>
  ) : (
    <>
      <div className="flex items-center gap-2">
        {place.icon && (
          <place.icon
            size={18}
            className="text-sky-500"
          />
        )}

        <h3 className="font-bold text-gray-900">
          {place.name}
        </h3>
      </div>

      <p className="mt-1 text-sm text-gray-500">
        {place.description}
      </p>

      <div className="mt-2 text-xs font-medium text-sky-500">
        {place.category}
      </div>
    </>
  )}
</div>
         {(   <>
              <div className="flex items-center gap-2">
                {place.icon && (
                  <place.icon
                    size={18}
                    className="text-sky-500"
                  />
                )}

                <h3 className="font-bold text-gray-900">
                  {place.name}
                </h3>
              </div>

              <p className="mt-1 text-sm text-gray-500">
                {place.description}
              </p>

              <div className="mt-2 text-xs font-medium text-sky-500">
                {place.category}
              </div>
            </>
          )}

        </div>


        {/* 삭제 버튼 */}
        {isEditing && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(place.id)
            }}
            className="rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 size={18} />
          </button>
        )}

      </div>
    </div>
  )
}


// ------------------------------------
// Result
// ------------------------------------

export default function Result({
  travelData,
  onBack,
  onConfirm,
}) {
  const [plan, setPlan] = useState(samplePlan)

  const [isEditing, setIsEditing] =
    useState(false)

  const [selectedPlace, setSelectedPlace] =
    useState(null)


  // ----------------------------------
  // 장소 시간 업데이트
  // ----------------------------------

  const updateTimes = (places) => {
    const defaultTimes = [
      "09:00",
      "11:00",
      "13:00",
      "15:30",
      "17:30",
      "19:00",
    ]

    return places.map((place, index) => ({
      ...place,
      time:
        defaultTimes[index] ||
        place.time ||
        "19:00",
    }))
  }


  // ----------------------------------
  // 장소 수정
  // ----------------------------------

  const handleChange = (
    placeId,
    field,
    value
  ) => {
    setPlan((currentPlan) =>
      currentPlan.map((day) => {
        const hasPlace = day.places.some(
          (place) => place.id === placeId
        )

        if (!hasPlace) {
          return day
        }

        let newPlaces = day.places.map(
          (place) =>
            place.id === placeId
              ? {
                  ...place,
                  [field]: value,
                }
              : place
        )

        if (field === "time") {
          newPlaces = [...newPlaces].sort(
            (a, b) =>
              a.time.localeCompare(b.time)
          )
        }

        return {
          ...day,
          places: newPlaces,
        }
      })
    )
  }


  // ----------------------------------
  // 장소 삭제
  // ----------------------------------

  const handleDelete = (placeId) => {
    setPlan((currentPlan) =>
      currentPlan.map((day) => ({
        ...day,
        places: day.places.filter(
          (place) => place.id !== placeId
        ),
      }))
    )
  }


  // ----------------------------------
  // 장소 추가
  // ----------------------------------

  const handleAdd = (dayIndex) => {
  const newPlace = {
    id: `place-${Date.now()}`,
    time: "18:00",
    name: "",
    description: "",
    category: "관광",
    icon: Landmark,
    isNew: true,
  }

  setPlan((currentPlan) =>
    currentPlan.map((day, index) => {
      if (index !== dayIndex) {
        return day
      }

      return {
        ...day,
        places: [...day.places, newPlace],
      }
    })
  )
}

  // ----------------------------------
  // 드래그 종료
  // ----------------------------------

  const handleDragEnd = (event) => {
    const {
      active,
      over,
    } = event

    if (!over) return

    const activeId = active.id
    const overId = over.id


    // 같은 장소를 자기 자신에게 드롭
    if (activeId === overId) {
      return
    }


    setPlan((currentPlan) => {
      let sourceDayIndex = -1
      let sourcePlaceIndex = -1
      let targetDayIndex = -1
      let targetPlaceIndex = -1


      currentPlan.forEach(
        (day, dayIndex) => {
          day.places.forEach(
            (place, placeIndex) => {
              if (place.id === activeId) {
                sourceDayIndex = dayIndex
                sourcePlaceIndex = placeIndex
              }

              if (place.id === overId) {
                targetDayIndex = dayIndex
                targetPlaceIndex = placeIndex
              }
            }
          )
        }
      )


      // 날짜 영역으로 이동
      if (
        overId.startsWith("day-")
      ) {
        const targetDayId = Number(
          overId.replace("day-", "")
        )

        targetDayIndex =
          currentPlan.findIndex(
            (day) =>
              day.id === targetDayId
          )

        if (
          sourceDayIndex === -1 ||
          targetDayIndex === -1
        ) {
          return currentPlan
        }

        const newPlan =
          currentPlan.map((day) => ({
            ...day,
            places: [...day.places],
          }))

        const [
          movedPlace,
        ] = newPlan[
          sourceDayIndex
        ].places.splice(
          sourcePlaceIndex,
          1
        )

        newPlan[
          targetDayIndex
        ].places.push(movedPlace)

        newPlan[targetDayIndex].places =
          updateTimes(
            newPlan[targetDayIndex]
              .places
          )

        return newPlan
      }


      // 장소 사이로 이동
      if (
        sourceDayIndex === -1 ||
        targetDayIndex === -1
      ) {
        return currentPlan
      }


      const newPlan =
        currentPlan.map((day) => ({
          ...day,
          places: [...day.places],
        }))


      const [
        movedPlace,
      ] = newPlan[
        sourceDayIndex
      ].places.splice(
        sourcePlaceIndex,
        1
      )


      let insertIndex =
        targetPlaceIndex

      if (
        sourceDayIndex === targetDayIndex &&
        sourcePlaceIndex <
          targetPlaceIndex
      ) {
        insertIndex -= 1
      }


      newPlan[
        targetDayIndex
      ].places.splice(
        insertIndex,
        0,
        movedPlace
      )


      newPlan[
        targetDayIndex
      ].places = updateTimes(
        newPlan[targetDayIndex]
          .places
      )


      if (
        sourceDayIndex !== targetDayIndex
      ) {
        newPlan[
          sourceDayIndex
        ].places = updateTimes(
          newPlan[sourceDayIndex]
            .places
        )
      }


      return newPlan
    })
  }


  // ----------------------------------
  // 여행 날짜 표시
  // ----------------------------------

  const getTravelDate = (day) => {
    if (!travelData) {
      return day.date
    }

    const startDate =
      travelData.startDate

    if (!startDate) {
      return day.date
    }

    const date = new Date(startDate)

    date.setDate(
      date.getDate() +
        (day.id - 1)
    )

    return `${date.getMonth() + 1}월 ${date.getDate()}일`
  }


  return (
    <main className="min-h-screen bg-sky-50 px-6 py-10">

      {/* -------------------------------- */}
      {/* 상단 */}
      {/* -------------------------------- */}

      <div className="mx-auto max-w-5xl">

        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sky-500">
            <MapPin size={20} />

            <span className="font-semibold">
              여행 계획
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            {travelData?.destination ||
              "부산"}{" "}
            여행 일정
          </h1>

          <p className="mt-2 text-gray-500">
            AI가 추천한 여행 일정을 확인하고
            원하는 대로 수정해보세요.
          </p>
        </div>


        {/* -------------------------------- */}
        {/* 여행 일정 */}
        {/* -------------------------------- */}

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >

          <div className="space-y-6">

            {plan.map(
              (day, dayIndex) => (
                <DayDropZone
                  key={day.id}
                  dayId={day.id}
                >

                  <div className="rounded-3xl bg-white p-6 shadow-sm">

                    {/* 날짜 */}
                    <div className="mb-5 flex items-center justify-between">

                      <div>
                        <div className="text-sm font-medium text-sky-500">
                          DAY {day.id}
                        </div>

                        <h2 className="mt-1 text-xl font-bold text-gray-900">
                          {getTravelDate(day)}
                        </h2>
                      </div>

                    </div>


                    {/* 장소 목록 */}
                    <SortableContext
                      items={day.places.map(
                        (place) =>
                          place.id
                      )}
                      strategy={
                        verticalListSortingStrategy
                      }
                    >

                      <div className="space-y-3">

                        {day.places.map(
                          (place) => (
                            <SortablePlace
                              key={place.id}
                              place={place}
                              isEditing={
                                isEditing
                              }
                              handleChange={
                                handleChange
                              }
                              handleDelete={
                                handleDelete
                              }
                              setSelectedPlace={
                                setSelectedPlace
                              }
                            />
                          )
                        )}

                      </div>

                    </SortableContext>


                    {/* 장소 추가 */}
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() =>
                          handleAdd(
                            dayIndex
                          )
                        }
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 py-4 text-sm font-semibold text-gray-400 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-500"
                      >
                        <Plus size={18} />
                        장소 추가
                      </button>
                    )}

                  </div>

                </DayDropZone>
              )
            )}

          </div>

        </DndContext>


        {/* -------------------------------- */}
        {/* 하단 버튼 */}
        {/* -------------------------------- */}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-2xl border border-gray-200 bg-white px-5 py-4 font-semibold text-gray-700 hover:bg-gray-50"
          >
            여행 계획 다시 만들기
          </button>


          <button
            type="button"
            onClick={() =>
              setIsEditing(
                (current) => !current
              )
            }
            className="flex-1 rounded-2xl border border-sky-200 bg-white px-5 py-4 font-semibold text-sky-600 hover:bg-sky-50"
          >
            {isEditing
              ? "수정 완료"
              : "여행 계획 수정하기"}
          </button>


          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-2xl bg-sky-500 px-5 py-4 font-semibold text-white hover:bg-sky-600"
          >
            확정하기
          </button>

        </div>

      </div>


      {/* ================================== */}
      {/* 장소 상세정보 모달 */}
      {/* ================================== */}

      {selectedPlace && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() =>
            setSelectedPlace(null)
          }
        >

          <div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* 모달 상단 */}
            <div className="mb-5 flex items-start justify-between">

              <div>
                <div className="mb-1 text-sm font-medium text-sky-500">
                  여행 추천 장소
                </div>

                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedPlace.name}
                </h2>
              </div>


              <button
                type="button"
                onClick={() =>
                  setSelectedPlace(null)
                }
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={22} />
              </button>

            </div>


            {/* 주소 / 별점 */}
            <div className="mb-5 rounded-2xl bg-sky-50 p-4">

              <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                <MapPin
                  size={17}
                  className="text-sky-500"
                />

                {
                  getPlaceDetail(
                    selectedPlace
                  ).address
                }
              </div>


              <div className="text-sm text-gray-600">
                ⭐{" "}
                {
                  getPlaceDetail(
                    selectedPlace
                  ).rating
                }
              </div>

            </div>


            {/* 설명 */}
            <p className="mb-6 leading-7 text-gray-600">
              {
                getPlaceDetail(
                  selectedPlace
                ).description
              }
            </p>


            {/* 체류시간 / 운영시간 */}
            <div className="mb-6 grid grid-cols-2 gap-3">

              <div className="rounded-2xl bg-gray-50 p-4">

                <div className="mb-1 text-xs text-gray-400">
                  추천 체류시간
                </div>

                <div className="font-semibold text-gray-800">
                  {
                    getPlaceDetail(
                      selectedPlace
                    ).stay
                  }
                </div>

              </div>


              <div className="rounded-2xl bg-gray-50 p-4">

                <div className="mb-1 text-xs text-gray-400">
                  운영시간
                </div>

                <div className="font-semibold text-gray-800">
                  {
                    getPlaceDetail(
                      selectedPlace
                    ).hours
                  }
                </div>

              </div>

            </div>


            {/* 버튼 */}
            <div className="flex gap-3">

              <button
                type="button"
                onClick={() => {
                  handleDelete(
                    selectedPlace.id
                  )

                  setSelectedPlace(null)
                }}
                className="flex-1 rounded-xl border border-red-200 px-4 py-3 font-semibold text-red-500 hover:bg-red-50"
              >
                일정에서 삭제
              </button>


              <button
                type="button"
                onClick={() =>
                  setSelectedPlace(null)
                }
                className="flex-1 rounded-xl bg-sky-500 px-4 py-3 font-semibold text-white hover:bg-sky-600"
              >
                닫기
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  )
}