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
} from "lucide-react"


// --------------------------------------------------
// 시간 재배정
// 드래그해서 순서를 바꿨을 때 사용
// --------------------------------------------------

const updateTimes = (places) => {
  const times = [
    "09:00",
    "11:00",
    "13:00",
    "15:30",
    "17:30",
    "19:00",
  ]

  return places.map((place, index) => ({
    ...place,
    time: times[index] || place.time,
  }))
}


// --------------------------------------------------
// 샘플 여행 일정
// 실제로는 나중에 AI / 백엔드 데이터로 교체
// --------------------------------------------------

const samplePlan = [
  {
    id: "day-1",
    day: "DAY 1",
    date: "10월 3일",
    places: [
      {
        id: "place-1",
        time: "09:00",
        name: "부산 카페거리",
        description:
          "여행을 시작하며 여유롭게 아침을 즐겨보세요.",
        type: "카페",
        icon: Coffee,
      },
      {
        id: "place-2",
        time: "11:00",
        name: "해운대 해수욕장",
        description:
          "부산을 대표하는 바다를 산책해보세요.",
        type: "관광",
        icon: Landmark,
      },
      {
        id: "place-3",
        time: "13:00",
        name: "해운대 맛집",
        description:
          "부산의 대표적인 음식을 즐겨보세요.",
        type: "맛집",
        icon: Utensils,
      },
      {
        id: "place-4",
        time: "15:30",
        name: "동백섬",
        description:
          "바다를 따라 산책하며 자연을 즐겨보세요.",
        type: "자연",
        icon: Trees,
      },
    ],
  },

  {
    id: "day-2",
    day: "DAY 2",
    date: "10월 4일",
    places: [
      {
        id: "place-5",
        time: "09:00",
        name: "감천문화마을",
        description:
          "알록달록한 골목과 부산의 풍경을 만나보세요.",
        type: "관광",
        icon: Landmark,
      },
      {
        id: "place-6",
        time: "12:00",
        name: "남포동 맛집",
        description:
          "부산의 다양한 먹거리를 즐겨보세요.",
        type: "맛집",
        icon: Utensils,
      },
      {
        id: "place-7",
        time: "14:00",
        name: "BIFF 광장",
        description:
          "부산의 영화와 문화를 느껴보세요.",
        type: "관광",
        icon: Landmark,
      },
      {
        id: "place-8",
        time: "17:00",
        name: "용두산공원",
        description:
          "부산 시내의 풍경을 감상해보세요.",
        type: "자연",
        icon: Trees,
      },
    ],
  },

  {
    id: "day-3",
    day: "DAY 3",
    date: "10월 5일",
    places: [
      {
        id: "place-9",
        time: "09:00",
        name: "광안리 카페",
        description:
          "광안대교를 바라보며 여유로운 시간을 보내세요.",
        type: "카페",
        icon: Coffee,
      },
      {
        id: "place-10",
        time: "11:30",
        name: "광안리 해변",
        description:
          "마지막 날 부산의 바다를 즐겨보세요.",
        type: "자연",
        icon: Trees,
      },
      {
        id: "place-11",
        time: "13:00",
        name: "부산 대표 맛집",
        description:
          "여행의 마지막 식사를 즐겨보세요.",
        type: "맛집",
        icon: Utensils,
      },
    ],
  },
]


// --------------------------------------------------
// 날짜별 드롭 영역
// --------------------------------------------------

function DayDropZone({ dayId, children }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `day-${dayId}`,
  })

  return (
    <div
      ref={setNodeRef}
      className={`rounded-2xl transition ${
        isOver
          ? "bg-sky-50 ring-2 ring-sky-300"
          : ""
      }`}
    >
      {children}
    </div>
  )
}


// --------------------------------------------------
// 일정 하나
// --------------------------------------------------

function SortablePlace({
  place,
  isEditing,
  handleChange,
  handleDelete,
  travelData,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: place.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const Icon = place.icon

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="rounded-2xl border border-gray-100 bg-white p-5 transition hover:border-sky-200 hover:bg-sky-50/50"
    >
      <div className="flex gap-4">

        {/* 드래그 버튼 */}
        {isEditing && (
          <button
            type="button"
            {...listeners}
            className="cursor-grab pt-2 text-xl text-gray-400 hover:text-sky-500 active:cursor-grabbing"
            title="드래그해서 순서 변경"
          >
            ☰
          </button>
        )}

        {/* 시간 */}
        <div className="w-24 shrink-0 pt-1">
          <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
            <Clock3
              size={15}
              className="text-sky-500"
            />

            {isEditing ? (
              <select
  value={place.time}
  onChange={(e) =>
    handleChange(
      place.id,
      "time",
      e.target.value
    )
  }
  className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm outline-none focus:border-sky-500"
>
  {Array.from({ length: 48 }, (_, index) => {
    const hour = Math.floor(index / 2)
    const minute = index % 2 === 0 ? "00" : "30"

    const time = `${String(hour).padStart(2, "0")}:${minute}`

    return (
      <option key={time} value={time}>
        {time}
      </option>
    )
  })}
</select>
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

            {isEditing ? (
              <input
                type="text"
                value={place.name}
                onChange={(e) =>
                  handleChange(
                    place.id,
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
                  place.id,
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
                handleDelete(place.id)
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
  )
}


// --------------------------------------------------
// Result
// --------------------------------------------------

export default function Result({
  travelData,
  onBack,
  onConfirm,
}) {
  const [isEditing, setIsEditing] = useState(false)

  const [plan, setPlan] = useState(samplePlan)


  // ------------------------------------------------
  // 일정 수정
  // ------------------------------------------------

  const handleChange = (
    placeId,
    field,
    value
  ) => {
    setPlan((currentPlan) => {
      const updatedPlan = currentPlan.map(
        (day) => {
          const hasPlace = day.places.some(
            (place) => place.id === placeId
          )

          if (!hasPlace) {
            return day
          }

          const updatedPlaces =
            day.places.map((place) => {
              if (place.id !== placeId) {
                return place
              }

              return {
                ...place,
                [field]: value,
              }
            })

          // 시간을 직접 수정한 경우
          // 사용자가 입력한 시간은 유지하고
          // 해당 날짜 안에서 시간순으로 정렬
          if (field === "time") {
            updatedPlaces.sort((a, b) =>
              a.time.localeCompare(b.time)
            )
          }

          return {
            ...day,
            places: updatedPlaces,
          }
        }
      )

      return updatedPlan
    })
  }


  // ------------------------------------------------
  // 일정 삭제
  // ------------------------------------------------

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


  // ------------------------------------------------
  // 일정 추가
  // ------------------------------------------------

  const handleAdd = (dayIndex) => {
    setPlan((currentPlan) =>
      currentPlan.map((day, index) => {
        if (index !== dayIndex) {
          return day
        }

        const newPlace = {
          id: `place-${Date.now()}`,
          time: "18:00",
          name: "새로운 일정",
          description:
            "새로운 일정을 입력해주세요.",
          type: "관광",
          icon: Landmark,
        }

        const newPlaces = [
          ...day.places,
          newPlace,
        ]

        return {
          ...day,
          places: updateTimes(newPlaces),
        }
      })
    )
  }


  // ------------------------------------------------
  // 드래그 종료
  // ------------------------------------------------

  const handleDragEnd = ({
    active,
    over,
  }) => {
    if (!over) {
      return
    }

    const activeId = active.id.toString()
    const overId = over.id.toString()

    setPlan((currentPlan) => {

      // --------------------------------------------
      // 현재 일정이 들어있는 날짜 찾기
      // --------------------------------------------

      const activeDayIndex =
        currentPlan.findIndex((day) =>
          day.places.some(
            (place) => place.id === activeId
          )
        )

      if (activeDayIndex === -1) {
        return currentPlan
      }


      // --------------------------------------------
      // 같은 날짜 안에서 이동
      // --------------------------------------------

      const activeDay =
        currentPlan[activeDayIndex]

      const activePlaceIndex =
        activeDay.places.findIndex(
          (place) => place.id === activeId
        )


      // over가 일정인 경우
      const overPlace = currentPlan
        .flatMap((day) => day.places)
        .find((place) => place.id === overId)


      if (overPlace) {

        const overDayIndex =
          currentPlan.findIndex((day) =>
            day.places.some(
              (place) => place.id === overPlace.id
            )
          )

        const overPlaceIndex =
          currentPlan[
            overDayIndex
          ].places.findIndex(
            (place) => place.id === overPlace.id
          )


        // 같은 날짜
        if (
          activeDayIndex ===
          overDayIndex
        ) {

          if (
            activePlaceIndex ===
            overPlaceIndex
          ) {
            return currentPlan
          }

          const newPlan =
            currentPlan.map((day) => ({
              ...day,
              places: [...day.places],
            }))

          const places =
            newPlan[
              activeDayIndex
            ].places

          const [
            movedPlace,
          ] = places.splice(
            activePlaceIndex,
            1
          )

          places.splice(
            overPlaceIndex,
            0,
            movedPlace
          )

          // 드래그 순서에 맞게 시간 재배정
          newPlan[
            activeDayIndex
          ].places = updateTimes(places)

          return newPlan
        }


        // ------------------------------------------
        // 다른 날짜로 이동
        // ------------------------------------------

        const newPlan =
          currentPlan.map((day) => ({
            ...day,
            places: [...day.places],
          }))

        const [
          movedPlace,
        ] =
          newPlan[
            activeDayIndex
          ].places.splice(
            activePlaceIndex,
            1
          )

        if (!movedPlace) {
          return currentPlan
        }

        newPlan[
          overDayIndex
        ].places.splice(
          overPlaceIndex,
          0,
          movedPlace
        )

        // 두 날짜 모두 시간 재배정
        newPlan[
          activeDayIndex
        ].places = updateTimes(
          newPlan[
            activeDayIndex
          ].places
        )

        newPlan[
          overDayIndex
        ].places = updateTimes(
          newPlan[
            overDayIndex
          ].places
        )

        return newPlan
      }


      // --------------------------------------------
      // 일정이 아니라 날짜 영역에 놓은 경우
      // → 해당 날짜 맨 뒤로 이동
      // --------------------------------------------

      if (overId.startsWith("day-")) {

        const targetDayId =
          overId.replace("day-", "")

        const targetDayIndex =
          currentPlan.findIndex(
            (day) =>
              day.id === targetDayId
          )

        if (targetDayIndex === -1) {
          return currentPlan
        }

        // 같은 날짜면 아무것도 하지 않음
        if (
          activeDayIndex ===
          targetDayIndex
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
        ] =
          newPlan[
            activeDayIndex
          ].places.splice(
            activePlaceIndex,
            1
          )

        if (!movedPlace) {
          return currentPlan
        }

        newPlan[
          targetDayIndex
        ].places.push(movedPlace)

        // 시간 재배정
        newPlan[
          activeDayIndex
        ].places = updateTimes(
          newPlan[
            activeDayIndex
          ].places
        )

        newPlan[
          targetDayIndex
        ].places = updateTimes(
          newPlan[
            targetDayIndex
          ].places
        )

        return newPlan
      }

      return currentPlan
    })
  }


  // ------------------------------------------------
  // 날짜 표시
  // ------------------------------------------------

  const formatDate = (date) => {
  if (!date) {
    return ""
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return date
  }

  return `${parsedDate.getMonth() + 1}월 ${parsedDate.getDate()}일`
}

const getNightCount = (startDate, endDate) => {
  if (!startDate || !endDate) {
    return 0
  }

  const start = new Date(startDate)
  const end = new Date(endDate)

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ) {
    return 0
  }

  const difference =
    end.getTime() - start.getTime()

  return Math.round(
    difference / (1000 * 60 * 60 * 24)
  )
}

const formatDateRange = () => {
  if (
    !travelData?.startDate ||
    !travelData?.endDate
  ) {
    return "여행 날짜"
  }

  const start = formatDate(
    travelData.startDate
  )

  const end = formatDate(
    travelData.endDate
  )

  const nights = getNightCount(
    travelData.startDate,
    travelData.endDate
  )

  const days = nights + 1

  return `${start} ~ ${end} (${nights}박 ${days}일)`
}


  return (
    <main className="min-h-[calc(100vh-4rem)] bg-sky-50 px-6 py-12">

      <div className="mx-auto max-w-5xl">

        {/* ---------------------------------------- */}
        {/* 상단 제목 */}
        {/* ---------------------------------------- */}

        <div className="mb-10 text-center">

          <p className="mb-2 text-sm font-semibold text-sky-500">
            AI TRAVEL PLANNER
          </p>

          <h2 className="text-4xl font-bold text-gray-900">
            나의 여행 계획
          </h2>

          <p className="mt-3 text-gray-500">
            입력하신 조건을 바탕으로 여행 일정을 만들었어요.
          </p>
        </div>


        {/* ---------------------------------------- */}
        {/* 여행 조건 */}
        {/* ---------------------------------------- */}

        <div className="mb-8 rounded-3xl bg-white p-7 shadow-lg">

          <h3 className="mb-5 text-xl font-bold text-gray-900">
            여행 조건
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-2xl bg-sky-50 p-4">
              <p className="text-xs font-semibold text-gray-400">
                여행지
              </p>

              <p className="mt-1 font-bold text-gray-900">
                {travelData?.destination || "여행지"}
              </p>
            </div>


            <div className="rounded-2xl bg-sky-50 p-4">
              <p className="text-xs font-semibold text-gray-400">
                여행 날짜
              </p>

              <p className="mt-1 font-bold text-gray-900">
                {formatDateRange()}
              </p>
            </div>


            <div className="rounded-2xl bg-sky-50 p-4">
              <p className="text-xs font-semibold text-gray-400">
                인원
              </p>

              <p className="mt-1 font-bold text-gray-900">
                {travelData?.people || "-"}
              </p>
            </div>


            <div className="rounded-2xl bg-sky-50 p-4">
              <p className="text-xs font-semibold text-gray-400">
                교통수단
              </p>

              <p className="mt-1 font-bold text-gray-900">
                {travelData?.transport || "-"}
              </p>
            </div>


            <div className="rounded-2xl bg-sky-50 p-4">
              <p className="text-xs font-semibold text-gray-400">
                예산
              </p>

              <p className="mt-1 font-bold text-gray-900">
                {travelData?.budget || "-"}
              </p>
            </div>


            <div className="rounded-2xl bg-sky-50 p-4">
              <p className="text-xs font-semibold text-gray-400">
                선호 스타일
              </p>

              <p className="mt-1 font-bold text-gray-900">
                {travelData?.styles?.join(", ") || "-"}
              </p>
            </div>

          </div>


          {travelData?.disliked && (
            <div className="mt-4 rounded-2xl bg-gray-50 p-4">

              <p className="text-xs font-semibold text-gray-400">
                제외하고 싶은 것
              </p>

              <p className="mt-1 text-sm text-gray-700">
                {travelData.disliked}
              </p>

            </div>
          )}

        </div>


        {/* ---------------------------------------- */}
        {/* 수정 안내 */}
        {/* ---------------------------------------- */}

        {isEditing && (
          <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 px-5 py-4 text-sm text-sky-700">

            <p className="font-semibold">
              ✏️ 일정 수정 모드
            </p>

            <p className="mt-1">
              시간, 장소 이름, 설명을 직접 수정할 수 있어요.
              일정 왼쪽의 ☰ 버튼을 드래그하면 순서를 변경할 수 있습니다.
            </p>

            <p className="mt-1">
              다른 날짜로 드래그하면 해당 날짜로 일정이 이동합니다.
            </p>

          </div>
        )}


        {/* ---------------------------------------- */}
        {/* 여행 일정 */}
        {/* ---------------------------------------- */}

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >

          <div className="space-y-8">

            {plan.map((day, dayIndex) => (

              <DayDropZone
                key={day.id}
                dayId={day.id}
              >

                <section className="rounded-3xl bg-white p-7 shadow-lg">

                  {/* 날짜 제목 */}

                  <div className="mb-6 flex items-center justify-between">

                    <div>
                      <p className="text-sm font-bold text-sky-500">
                        {day.day}
                      </p>

                      <h3 className="mt-1 text-2xl font-bold text-gray-900">
                        {day.date}
                      </h3>
                    </div>

                    <div className="rounded-xl bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-600">
                      {day.places.length}개 일정
                    </div>

                  </div>


                  {/* 일정 */}

                  <SortableContext
                    items={day.places.map(
                      (place) => place.id
                    )}
                    strategy={
                      verticalListSortingStrategy
                    }
                  >

                    <div className="space-y-4">

                      {day.places.map(
                        (place) => (

                          <SortablePlace
                            key={place.id}
                            place={place}
                            isEditing={isEditing}
                            handleChange={
                              handleChange
                            }
                            handleDelete={
                              handleDelete
                            }
                            travelData={
                              travelData
                            }
                          />

                        )
                      )}

                    </div>

                  </SortableContext>


                  {/* 일정 추가 */}

                  {isEditing && (
                    <button
                      type="button"
                      onClick={() =>
                        handleAdd(dayIndex)
                      }
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-sky-300 py-3 text-sm font-semibold text-sky-500 transition hover:bg-sky-50"
                    >
                      <Plus size={18} />
                      일정 추가
                    </button>
                  )}

                </section>

              </DayDropZone>

            ))}

          </div>

        </DndContext>


        {/* ---------------------------------------- */}
        {/* 하단 버튼 */}
        {/* ---------------------------------------- */}

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          {/* 다시 만들기 */}

          <button
            type="button"
            onClick={onBack}
            className="rounded-2xl bg-gray-900 px-8 py-4 text-sm font-bold text-white transition hover:bg-gray-800"
          >
            여행 계획 다시 만들기
          </button>


          {/* 수정 */}

          <button
            type="button"
            onClick={() =>
              setIsEditing(!isEditing)
            }
            className="rounded-2xl bg-white px-8 py-4 text-sm font-bold text-gray-900 ring-1 ring-gray-300 transition hover:bg-gray-100"
          >
            {isEditing
              ? "수정 완료"
              : "여행 계획 수정하기"}
          </button>


          {/* 확정 */}

          <button
  type="button"
  onClick={onConfirm}
  className="rounded-2xl bg-sky-500 px-8 py-4 text-sm font-bold text-white transition hover:bg-sky-600"
>
  여행 계획 확정하기
</button>

        </div>

      </div>

    </main>
  )
}