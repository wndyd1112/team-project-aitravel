import { useState } from "react"
import {
  Plane,
  MapPin,
  Utensils,
  Landmark,
  Trees,
  ShoppingBag,
  Palette,
  Dumbbell,
  Car,
} from "lucide-react"

export default function Home({ onCreatePlan }) {
  const [destination, setDestination] = useState("")

  const [arrivalTransport, setArrivalTransport] = useState("")
  const [arrivalPlace, setArrivalPlace] = useState("")
  const [arrivalDate, setArrivalDate] = useState("")
  const [arrivalTime, setArrivalTime] = useState("")

  const [departureTransport, setDepartureTransport] = useState("")
  const [departurePlace, setDeparturePlace] = useState("")
  const [departureDate, setDepartureDate] = useState("")
  const [departureTime, setDepartureTime] = useState("")

  const [styles, setStyles] = useState([])
  const [disliked, setDisliked] = useState("")

  const [transport, setTransport] = useState("")
  const [people, setPeople] = useState("")
  const [budget, setBudget] = useState("")

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [step, setStep] = useState(1)

  const travelStyles = [
    {
      name: "맛집",
      icon: Utensils,
    },
    {
      name: "관광",
      icon: Landmark,
    },
    {
      name: "자연",
      icon: Trees,
    },
    {
      name: "쇼핑",
      icon: ShoppingBag,
    },
    {
      name: "문화",
      icon: Palette,
    },
    {
      name: "액티비티",
      icon: Dumbbell,
    },
  ]

  const transports = [
    {
      name: "자동차",
      icon: Car,
    },
    {
      name: "대중교통",
      icon: "🚌",
    },
    {
      name: "도보",
      icon: "🚶",
    },
    {
      name: "자전거",
      icon: "🚲",
    },
  ]

  // 날짜를 10월 9일처럼 표시
  const formatDate = (date) => {
    if (!date) {
      return ""
    }

    const [year, month, day] = date.split("-")

    return `${Number(month)}월 ${Number(day)}일`
  }

  // 몇 박 몇 일 계산
  const getTripDuration = () => {
    if (!arrivalDate || !departureDate) {
      return ""
    }

    const start = new Date(arrivalDate)
    const end = new Date(departureDate)

    const difference =
      end.getTime() - start.getTime()

    const nights = Math.round(
      difference / (1000 * 60 * 60 * 24)
    )

    if (nights < 0) {
      return ""
    }

    return `${nights}박 ${nights + 1}일 일정`
  }

  const handleStyleClick = (styleName) => {
    if (styles.includes(styleName)) {
      setStyles(
        styles.filter((style) => style !== styleName)
      )
      return
    }

    if (styles.length >= 3) {
      return
    }

    setStyles([...styles, styleName])
  }

  const handleNext = () => {
    if (!arrivalPlace.trim()) {
      alert("도착 장소를 입력해주세요.")
      return
    }

    if (!arrivalDate || !departureDate) {
      alert("도착 날짜와 출발 날짜를 입력해주세요.")
      return
    }

    if (departureDate < arrivalDate) {
      alert("출발 날짜는 도착 날짜보다 빠를 수 없습니다.")
      return
    }

    if (styles.length === 0) {
      alert("여행 스타일을 하나 이상 선택해주세요.")
      return
    }

    // 도착 장소를 여행지로 사용
    setDestination(arrivalPlace)

    setStep(2)
  }

  const handleSubmit = () => {
    if (!arrivalTransport) {
      alert("도착 교통수단을 선택해주세요.")
      return
    }

    if (!arrivalTime) {
      alert("도착 시간을 입력해주세요.")
      return
    }

    if (!departureTransport) {
      alert("출발 교통수단을 선택해주세요.")
      return
    }

    if (!departurePlace.trim()) {
      alert("출발 장소를 입력해주세요.")
      return
    }

    if (!departureTime) {
      alert("출발 시간을 입력해주세요.")
      return
    }

    if (!transport) {
      alert("여행 중 이동수단을 선택해주세요.")
      return
    }

    if (!people) {
      alert("여행 인원을 선택해주세요.")
      return
    }

    if (!budget) {
      alert("여행 예산을 선택해주세요.")
      return
    }

    setIsSubmitted(true)

    console.log({
      destination,
      startDate: arrivalDate,
      endDate: departureDate,

      arrivalTransport,
      arrivalPlace,
      arrivalDate,
      arrivalTime,

      departureTransport,
      departurePlace,
      departureDate,
      departureTime,

      styles,
      disliked,
      transport,
      people,
      budget,
    })
  }

  const handleCreatePlan = () => {
    onCreatePlan({
      destination,
      startDate: arrivalDate,
      endDate: departureDate,

      arrivalTransport,
      arrivalPlace,
      arrivalDate,
      arrivalTime,

      departureTransport,
      departurePlace,
      departureDate,
      departureTime,

      styles,
      disliked,
      transport,
      people,
      budget,
    })
  }

  // 최종 확인 화면
  if (isSubmitted) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-sky-50 px-6 py-12">
        <div className="mx-auto max-w-4xl">

          <div className="rounded-3xl bg-white p-10 shadow-xl">

            <div className="mb-8 text-center">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100">
                <Plane
                  size={30}
                  className="text-sky-500"
                />
              </div>

              <h2 className="text-3xl font-bold text-gray-900">
                여행 정보를 확인해주세요
              </h2>

              <p className="mt-3 text-sm text-gray-500">
                입력한 정보를 확인한 후 여행 계획을 만들어보세요.
              </p>

            </div>


            <div className="space-y-5">

              {/* 여행지 */}
              <div className="rounded-2xl bg-gray-50 p-5">

                <p className="text-sm font-medium text-gray-400">
                  여행지
                </p>

                <p className="mt-1 text-lg font-bold text-gray-900">
                  {destination}
                </p>

              </div>


              {/* 여행 기간 */}
              <div className="rounded-2xl bg-gray-50 p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-gray-400">
                      여행 기간
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      {formatDate(arrivalDate)}
                      {" ~ "}
                      {formatDate(departureDate)}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-xl font-bold text-sky-600">
                      {getTripDuration()}
                    </p>

                  </div>

                </div>

              </div>


              {/* 도착 정보 */}
              <div className="rounded-2xl bg-gray-50 p-5">

                <p className="mb-3 text-sm font-medium text-gray-400">
                  여행지 도착 정보
                </p>

                <p className="font-semibold text-gray-800">
                  {arrivalTransport} · {arrivalPlace}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {formatDate(arrivalDate)} {arrivalTime}
                </p>

              </div>


              {/* 출발 정보 */}
              <div className="rounded-2xl bg-gray-50 p-5">

                <p className="mb-3 text-sm font-medium text-gray-400">
                  여행지 출발 정보
                </p>

                <p className="font-semibold text-gray-800">
                  {departureTransport} · {departurePlace}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {formatDate(departureDate)} {departureTime}
                </p>

              </div>


              {/* 여행 스타일 */}
              <div className="rounded-2xl bg-gray-50 p-5">

                <p className="mb-3 text-sm font-medium text-gray-400">
                  여행 스타일
                </p>

                <div className="flex flex-wrap gap-2">

                  {styles.map((style, index) => (
                    <span
                      key={style}
                      className="rounded-full bg-sky-100 px-3 py-1.5 text-sm font-semibold text-sky-600"
                    >
                      {index + 1}. {style}
                    </span>
                  ))}

                </div>

              </div>


              {/* 제외하고 싶은 것 */}
              <div className="rounded-2xl bg-gray-50 p-5">

                <p className="text-sm font-medium text-gray-400">
                  제외하고 싶은 것
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {disliked || "없음"}
                </p>

              </div>


              {/* 이동수단 */}
              <div className="rounded-2xl bg-gray-50 p-5">

                <p className="text-sm font-medium text-gray-400">
                  여행 중 이동수단
                </p>

                <p className="mt-1 font-semibold text-gray-800">
                  {transport}
                </p>

              </div>


              {/* 인원 / 예산 */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div className="rounded-2xl bg-gray-50 p-5">

                  <p className="text-sm font-medium text-gray-400">
                    여행 인원
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {people}명
                  </p>

                </div>

                <div className="rounded-2xl bg-gray-50 p-5">

                  <p className="text-sm font-medium text-gray-400">
                    여행 예산
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {budget}
                  </p>

                </div>

              </div>

            </div>


            <div className="mt-10 flex gap-3">

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false)
                  setStep(1)
                }}
                className="flex-1 rounded-2xl border border-gray-200 bg-white px-6 py-4 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
              >
                ← 다시 수정하기
              </button>

              <button
                type="button"
                onClick={handleCreatePlan}
                className="flex-1 rounded-2xl bg-sky-500 px-6 py-4 text-sm font-bold text-white transition hover:bg-sky-600"
              >
                여행 계획 만들기
              </button>

            </div>

          </div>
        </div>
      </main>
    )
  }


  return (
    <main className="min-h-[calc(100vh-4rem)] bg-sky-50 px-6 py-12">

      <div className="mx-auto max-w-4xl">


        {/* Step 1 */}
        {step === 1 && (
          <div className="rounded-3xl bg-white p-8 shadow-xl">
<div className="mb-10 text-center">

  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg">
    <Plane size={32} />
  </div>

  <h1 className="text-3xl font-bold text-gray-900">
    나만의 여행 계획 만들기
  </h1>

  <p className="mt-3 text-sm text-gray-500">
    여행지와 일정, 여행 스타일을 입력하면
    <br />
    나에게 맞는 여행 계획을 만들어드려요.
  </p>

</div>

            {/* 도착 / 출발 정보 */}
            <div className="rounded-2xl bg-gray-50 p-6">


              {/* 도착 정보 */}
              <div className="mb-8">

                <h3 className="mb-5 text-lg font-bold text-gray-800">
                  🚆 여행지 도착 정보
                </h3>


                {/* 도착 교통수단 */}
                <div className="mb-5">

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    도착 교통수단
                  </label>

                  <select
                    value={arrivalTransport}
                    onChange={(e) =>
                      setArrivalTransport(e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-500"
                  >

                    <option value="">
                      선택해주세요
                    </option>

                    <option value="기차">
                      기차
                    </option>

                    <option value="버스">
                      버스
                    </option>

                    <option value="비행기">
                      비행기
                    </option>

                    <option value="자동차">
                      자동차
                    </option>

                  </select>

                </div>


                {/* 도착 장소 */}
                <div className="mb-5">

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    도착 장소
                  </label>

                  <input
                    type="text"
                    value={arrivalPlace}
                    onChange={(e) =>
                      setArrivalPlace(e.target.value)
                    }
                    placeholder="예: 부산역, 김해공항"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-500"
                  />

                </div>


                {/* 도착 날짜 / 시간 */}
                <div className="grid gap-4 sm:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      도착 날짜
                    </label>

                    <input
                      type="date"
                      value={arrivalDate}
                      onChange={(e) =>
                        setArrivalDate(e.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-500"
                    />

                  </div>


                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      도착 시간
                    </label>

                    <input
                      type="time"
                      value={arrivalTime}
                      onChange={(e) =>
                        setArrivalTime(e.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-500"
                    />

                  </div>

                </div>

              </div>


              {/* 출발 정보 */}
              <div>

                <h3 className="mb-5 text-lg font-bold text-gray-800">
                  🚌 여행지 출발 정보
                </h3>


                {/* 출발 교통수단 */}
                <div className="mb-5">

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    출발 교통수단
                  </label>

                  <select
                    value={departureTransport}
                    onChange={(e) =>
                      setDepartureTransport(e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-500"
                  >

                    <option value="">
                      선택해주세요
                    </option>

                    <option value="기차">
                      기차
                    </option>

                    <option value="버스">
                      버스
                    </option>

                    <option value="비행기">
                      비행기
                    </option>

                    <option value="자동차">
                      자동차
                    </option>

                  </select>

                </div>


                {/* 출발 장소 */}
                <div className="mb-5">

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    출발 장소
                  </label>

                  <input
                    type="text"
                    value={departurePlace}
                    onChange={(e) =>
                      setDeparturePlace(e.target.value)
                    }
                    placeholder="예: 부산역, 김해공항"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-500"
                  />

                </div>


                {/* 출발 날짜 / 시간 */}
                <div className="grid gap-4 sm:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      출발 날짜
                    </label>

                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) =>
                        setDepartureDate(e.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-500"
                    />

                  </div>


                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      출발 시간
                    </label>

                    <input
                      type="time"
                      value={departureTime}
                      onChange={(e) =>
                        setDepartureTime(e.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-500"
                    />

                  </div>

                </div>

              </div>

            </div>


            {/* 여행 기간 */}
            {arrivalDate && departureDate && (
              <div className="mt-8 rounded-2xl bg-sky-50 px-6 py-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-gray-500">
                      여행 기간
                    </p>

                    <p className="mt-1 text-lg font-bold text-gray-900">
                      {formatDate(arrivalDate)}
                      {"부터 "}
                      {formatDate(departureDate)}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-xl font-bold text-sky-600">
                      {getTripDuration()}
                    </p>

                  </div>

                </div>

              </div>
            )}


            {/* 여행 스타일 */}
            <div className="mb-8 mt-12">

              <label className="mb-2 block text-lg font-semibold text-gray-800">
                ✨ 어떤 여행을 원하시나요?
              </label>

              <p className="mb-4 text-xs text-gray-400">
                최대 3개까지 선택할 수 있어요. 선택한 순서대로 우선순위가 적용됩니다.
              </p>


              {/* 작게 줄인 카테고리 */}
              <div className="grid grid-cols-3 gap-3">
                {travelStyles.map((style) => {

                  const Icon = style.icon

                  const selected =
                    styles.includes(style.name)

                  const order =
                    styles.indexOf(style.name) + 1

                  return (
                    <button
                      key={style.name}
                      type="button"
                      onClick={() =>
                        handleStyleClick(style.name)
                      }
                      className={`relative rounded-2xl border px-3 py-4 transition ${
                        selected
                          ? "border-sky-500 bg-sky-50 text-sky-600"
                          : "border-gray-200 bg-white text-gray-600 hover:border-sky-300 hover:bg-sky-50"
                      }`}
                    >

                      {selected && (
                        <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-[10px] font-bold text-white">
                          {order}
                        </span>
                      )}

                      <Icon
  size={24}
  className="mx-auto mb-2"
/>

                      <p className="text-xs font-semibold">
                        {style.name}
                      </p>

                    </button>
                  )
                })}

              </div>

            </div>


            {/* 제외하고 싶은 것 */}
            <div className="mb-8">

              <label className="mb-3 block text-lg font-semibold text-gray-800">
                🚫 여행에서 제외하고 싶은 것이 있나요?
              </label>

              <textarea
                value={disliked}
                onChange={(e) =>
                  setDisliked(e.target.value)
                }
                placeholder="예: 너무 붐비는 곳은 싫어요, 등산은 하고 싶지 않아요."
                rows={3}
                className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500"
              />

            </div>


            {/* 다음 */}
            <button
              type="button"
              onClick={handleNext}
              className="w-full rounded-2xl bg-sky-500 px-6 py-4 text-sm font-bold text-white transition hover:bg-sky-600"
            >
              다음 단계 →
            </button>

          </div>
        )}


        {/* Step 2 */}
        {step === 2 && (
          <div className="rounded-3xl bg-white p-8 shadow-xl">

            <div className="mb-8">

              <h2 className="text-2xl font-bold text-gray-900">
                🚗 여행 중 이동 정보를 알려주세요
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                여행지 안에서 주로 어떤 방법으로 이동하시나요?
              </p>

            </div>


            {/* 이동수단 */}
            <div className="mb-8">

              <label className="mb-4 block text-lg font-semibold text-gray-800">
                이동수단
              </label>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                {transports.map((item) => {

                  const selected =
                    transport === item.name

                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() =>
                        setTransport(item.name)
                      }
                      className={`rounded-2xl border px-3 py-3 transition ${
                        selected
                          ? "border-sky-500 bg-sky-50 text-sky-600"
                          : "border-gray-200 bg-white text-gray-600 hover:border-sky-300"
                      }`}
                    >

                      <div className="mb-2 flex justify-center">

                        {typeof item.icon === "string" ? (
                          <span className="text-3xl">
                            {item.icon}
                          </span>
                        ) : (
                          <item.icon size={24} />
                        )}

                      </div>

                      <p className="text-sm font-semibold">
                        {item.name}
                      </p>

                    </button>
                  )
                })}

              </div>

            </div>


            {/* 인원 */}
            <div className="mb-8">

              <label className="mb-3 block text-lg font-semibold text-gray-800">
                👥 여행 인원
              </label>

              <select
                value={people}
                onChange={(e) =>
                  setPeople(e.target.value)
                }
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-4 text-sm outline-none focus:border-sky-500"
              >

                <option value="">
                  선택해주세요
                </option>

                <option value="1">
                  1명
                </option>

                <option value="2">
                  2명
                </option>

                <option value="3">
                  3명
                </option>

                <option value="4">
                  4명
                </option>

                <option value="5">
                  5명
                </option>

                <option value="6">
                  6명 이상
                </option>

              </select>

            </div>


            {/* 예산 */}
            <div className="mb-8">

              <label className="mb-3 block text-lg font-semibold text-gray-800">
                💰 1인당 여행 예산
              </label>

              <select
                value={budget}
                onChange={(e) =>
                  setBudget(e.target.value)
                }
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-4 text-sm outline-none focus:border-sky-500"
              >

                <option value="">
                  선택해주세요
                </option>

                <option value="10만원 이하">
                  10만원 이하
                </option>

                <option value="10만원 ~ 20만원">
                  10만원 ~ 20만원
                </option>

                <option value="20만원 ~ 30만원">
                  20만원 ~ 30만원
                </option>

                <option value="30만원 ~ 50만원">
                  30만원 ~ 50만원
                </option>

                <option value="50만원 이상">
                  50만원 이상
                </option>

              </select>

            </div>


            {/* 버튼 */}
            <div className="flex gap-3">

              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 rounded-2xl border border-gray-200 bg-white px-6 py-4 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
              >
                ← 이전
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 rounded-2xl bg-sky-500 px-6 py-4 text-sm font-bold text-white transition hover:bg-sky-600"
              >
                입력 내용 확인하기
              </button>

            </div>

          </div>
        )}

      </div>

    </main>
  )
}