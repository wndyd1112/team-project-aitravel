import { useState } from "react"
import { DayPicker } from "react-day-picker"
import {
  CalendarDays,
  MapPin,
  Plane,
  Utensils,
  Landmark,
  Trees,
  ShoppingBag,
  Palette,
  Dumbbell,
  Car,
  Users,
  Wallet,
} from "lucide-react"
import "react-day-picker/style.css"

function Home() {
  // =========================
  // 1단계 정보
  // =========================
  const [destination, setDestination] = useState("")
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [selectingStart, setSelectingStart] = useState(true)
  const [disliked, setDisliked] = useState("")

  // 여행 스타일
  const [styles, setStyles] = useState([])

  // =========================
  // 2단계 정보
  // =========================
  const [transport, setTransport] = useState("")
  const [people, setPeople] = useState("")
  const [budget, setBudget] = useState("")

  // =========================
  // 페이지 상태
  // =========================
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [step, setStep] = useState(1)

  // 여행 스타일 목록
  const travelStyles = [
    { name: "맛집", icon: Utensils },
    { name: "관광", icon: Landmark },
    { name: "자연", icon: Trees },
    { name: "쇼핑", icon: ShoppingBag },
    { name: "문화", icon: Palette },
    { name: "액티비티", icon: Dumbbell },
  ]

  // 이동수단 목록
  const transports = [
    { name: "자동차", icon: Car },
    { name: "대중교통", icon: "🚌" },
    { name: "도보", icon: "🚶" },
    { name: "자전거", icon: "🚲" },
  ]

  // =========================
  // 여행 스타일 선택 / 해제
  // =========================
  const toggleStyle = (style) => {
    if (styles.includes(style)) {
      setStyles(styles.filter((item) => item !== style))
    } else {
      if (styles.length >= 3) {
        alert("여행 스타일은 최대 3개까지 선택할 수 있어요.")
        return
      }

      setStyles([...styles, style])
    }
  }

  // =========================
  // 날짜 선택
  // =========================
  const handleDateSelect = (date) => {
    if (!date) return

    if (selectingStart) {
      setStartDate(date)
      setEndDate(undefined)
      setSelectingStart(false)
    } else {
      if (date < startDate) {
        setStartDate(date)
        setEndDate(undefined)
      } else {
        setEndDate(date)
        setSelectingStart(true)
      }
    }
  }

  // =========================
  // 1단계 → 2단계
  // =========================
  const handleNext = () => {
    if (!destination.trim()) {
      alert("여행지를 입력해주세요.")
      return
    }

    if (!startDate || !endDate) {
      alert("여행 기간을 선택해주세요.")
      return
    }

    if (styles.length === 0) {
      alert("여행 스타일을 하나 이상 선택해주세요.")
      return
    }

    setStep(2)
  }

  // =========================
  // 최종 제출
  // =========================
  const handleSubmit = () => {
    if (!transport) {
      alert("이동수단을 선택해주세요.")
      return
    }

    if (!people) {
      alert("여행 인원을 입력해주세요.")
      return
    }

    if (!budget) {
      alert("여행 예산을 선택해주세요.")
      return
    }

    console.log("여행지:", destination)
    console.log("출발일:", startDate)
    console.log("도착일:", endDate)
    console.log("여행 스타일:", styles)
    console.log("선호하지 않는 여행:", disliked)
    console.log("이동수단:", transport)
    console.log("여행 인원:", people)
    console.log("여행 예산:", budget)

    setIsSubmitted(true)
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-sky-50 px-6 py-12">

      {/* ================================================== */}
      {/* 제출 완료 화면 */}
      {/* ================================================== */}

      {isSubmitted ? (

        <div className="mx-auto max-w-4xl">

          <div className="rounded-3xl bg-white p-10 text-center shadow-xl">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Plane className="h-8 w-8 text-blue-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              여행 계획을 준비하고 있어요!
            </h1>

            <p className="mt-3 text-gray-500">
              입력하신 여행 정보를 확인해주세요.
            </p>


            {/* 여행 정보 */}
            <div className="mt-8 rounded-2xl bg-blue-50 p-6 text-left">

              {/* 여행지 */}
              <p className="text-sm text-gray-500">
                여행지
              </p>

              <p className="mt-1 text-lg font-semibold text-blue-600">
                {destination}
              </p>


              {/* 여행 기간 */}
              <p className="mt-5 text-sm text-gray-500">
                여행 기간
              </p>

              <p className="mt-1 font-medium text-gray-800">
                {startDate?.toLocaleDateString()} ~{" "}
                {endDate?.toLocaleDateString()}
              </p>


              {/* 여행 스타일 */}
              <p className="mt-5 text-sm text-gray-500">
                선호하는 여행
              </p>

              <p className="mt-1 font-medium text-gray-800">
                {styles.length > 0
                  ? styles.join(", ")
                  : "선택하지 않음"}
              </p>


              {/* 선호하지 않는 여행 */}
              <p className="mt-5 text-sm text-gray-500">
                선호하지 않는 여행
              </p>

              <p className="mt-1 font-medium text-gray-800">
                {disliked || "없음"}
              </p>


              {/* 이동수단 */}
              <p className="mt-5 text-sm text-gray-500">
                이동수단
              </p>

              <p className="mt-1 font-medium text-gray-800">
                {transport}
              </p>


              {/* 여행 인원 */}
              <p className="mt-5 text-sm text-gray-500">
                여행 인원
              </p>

              <p className="mt-1 font-medium text-gray-800">
                {people}명
              </p>


              {/* 예산 */}
              <p className="mt-5 text-sm text-gray-500">
                여행 예산
              </p>

              <p className="mt-1 font-medium text-gray-800">
                {budget}
              </p>

            </div>


            {/* 다시 수정 */}
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false)
                setStep(1)
              }}
              className="mt-6 flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white py-4 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              ← 다시 수정하기
            </button>

          </div>

        </div>

      ) : (

        <>
          {/* ================================================== */}
          {/* STEP 1 */}
          {/* ================================================== */}

          {step === 1 ? (

            <div className="mx-auto max-w-4xl">

              {/* 제목 */}
              <div className="mb-10 text-center">

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Plane className="h-8 w-8 text-blue-600" />
                </div>

                <p className="mb-2 text-sm font-semibold text-blue-600">
                  STEP 1 / 2
                </p>

                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  TRIP PLANNER
                </h1>

                <p className="mt-3 text-lg text-gray-500">
                  나만의 여행 계획을 만들어보세요.
                </p>

              </div>


              {/* 메인 카드 */}
              <div className="rounded-3xl bg-white p-8 shadow-xl">


                {/* 여행지 */}
                <div className="mb-8">

                  <label className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-800">

                    <MapPin className="h-5 w-5 text-blue-600" />

                    어디로 여행을 떠나시나요?

                  </label>

                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="여행지를 입력하세요"
                    className="w-full rounded-xl border border-gray-200 px-4 py-4 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>


                {/* 여행 기간 */}
                <div className="mb-8">

                  <label className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-800">

                    <CalendarDays className="h-5 w-5 text-blue-600" />

                    여행 기간

                  </label>


                  <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <p className="mb-5 text-center text-sm text-gray-500">

                      {selectingStart
                        ? "출발일을 선택하세요."
                        : "도착일을 선택하세요."}

                    </p>


                    <div className="flex justify-center">

                      <DayPicker
                        mode="range"

                        selected={
                          startDate
                            ? {
                                from: startDate,
                                to: endDate || startDate,
                              }
                            : undefined
                        }

                        onSelect={(range) => {

                          if (!range?.from) return

                          if (!range.to) {

                            setStartDate(range.from)
                            setEndDate(undefined)
                            setSelectingStart(false)

                          } else {

                            setStartDate(range.from)
                            setEndDate(range.to)
                            setSelectingStart(true)

                          }

                        }}

                        disabled={
                          selectingStart
                            ? undefined
                            : { before: startDate }
                        }
                      />

                    </div>

                  </div>


                  {/* 선택한 날짜 */}
                  <div className="mt-4 rounded-2xl bg-blue-50 p-5">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-sm text-gray-500">
                          여행 기간
                        </p>

                        <p className="mt-1 font-semibold text-blue-600">

                          {startDate
                            ? startDate.toLocaleDateString()
                            : "출발일"}

                          {" ~ "}

                          {endDate
                            ? endDate.toLocaleDateString()
                            : "도착일"}

                        </p>

                      </div>

                      <CalendarDays className="h-7 w-7 text-blue-400" />

                    </div>

                  </div>

                </div>


                {/* 여행 스타일 */}
                <div className="mb-8">

                  <label className="mb-3 block text-lg font-semibold text-gray-800">
                    ✨ 어떤 여행을 원하시나요?
                  </label>

                  <p className="mb-4 text-sm text-gray-500">
                    원하는 여행 스타일을 최대 3개까지 선택해주세요.
                    선택한 순서대로 우선순위가 정해져요.
                  </p>


                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                    {travelStyles.map(({ name, icon: Icon }) => {

                      const selected = styles.includes(name)
                      const rank = styles.indexOf(name) + 1

                      return (

                        <button
                          key={name}
                          type="button"
                          onClick={() => toggleStyle(name)}
                          className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-4 font-medium transition ${
                            selected
                              ? "border-blue-500 bg-blue-50 text-blue-600 ring-2 ring-blue-100"
                              : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50"
                          }`}
                        >

                          {selected && (
                            <span className="font-bold">
                              {rank}순위
                            </span>
                          )}

                          <Icon className="h-5 w-5" />

                          {name}

                        </button>

                      )

                    })}

                  </div>

                </div>


                {/* 선호하지 않는 여행 */}
                <div className="mb-8">

                  <label className="mb-3 block text-lg font-semibold text-gray-800">
                    🚫 선호하지 않는 여행이 있나요?
                  </label>

                  <p className="mb-4 text-sm text-gray-500">
                    피하고 싶은 장소나 여행 스타일을 자유롭게 적어주세요.
                  </p>

                  <textarea
                    value={disliked}
                    onChange={(e) => setDisliked(e.target.value)}
                    placeholder="예: 사람이 너무 많은 곳은 피하고 싶어요."
                    rows={4}
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-4 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>


                {/* 다음 단계 */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg"
                >

                  다음 단계

                  <span>→</span>

                </button>

              </div>

            </div>

          ) : (

            /* ================================================== */
            /* STEP 2 */
            /* ================================================== */

            <div className="mx-auto max-w-4xl">

              {/* 제목 */}
              <div className="mb-10 text-center">

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Plane className="h-8 w-8 text-blue-600" />
                </div>

                <p className="mb-2 text-sm font-semibold text-blue-600">
                  STEP 2 / 2
                </p>

                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  여행 정보를 알려주세요
                </h1>

                <p className="mt-3 text-lg text-gray-500">
                  더욱 자세한 여행 계획을 위해 추가 정보를 입력해주세요.
                </p>

              </div>


              {/* 2단계 카드 */}
              <div className="rounded-3xl bg-white p-8 shadow-xl">


                {/* 이동수단 */}
                <div className="mb-8">

                  <label className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-800">

                    <Car className="h-5 w-5 text-blue-600" />

                    어떤 이동수단을 이용하시나요?

                  </label>

                  <p className="mb-4 text-sm text-gray-500">
                    여행 중 주로 이용할 이동수단을 선택해주세요.
                  </p>


                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                    {transports.map(({ name, icon: Icon }) => {

                      const selected = transport === name

                      return (

                        <button
                          key={name}
                          type="button"
                          onClick={() => setTransport(name)}
                          className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-4 font-medium transition ${
                            selected
                              ? "border-blue-500 bg-blue-50 text-blue-600 ring-2 ring-blue-100"
                              : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50"
                          }`}
                        >

                          {typeof Icon === "string" ? (
                            <span className="text-xl">
                              {Icon}
                            </span>
                          ) : (
                            <Icon className="h-5 w-5" />
                          )}

                          {name}

                        </button>

                      )

                    })}

                  </div>

                </div>


                {/* 여행 인원 */}
                <div className="mb-8">

                  <label className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-800">

                    <Users className="h-5 w-5 text-blue-600" />

                    몇 명이 여행하시나요?

                  </label>

                  <p className="mb-4 text-sm text-gray-500">
                    함께 여행하는 인원을 입력해주세요.
                  </p>


                  <input
                    type="number"
                    min="1"
                    value={people}
                    onChange={(e) => setPeople(e.target.value)}
                    placeholder="여행 인원을 입력하세요"
                    className="w-full rounded-xl border border-gray-200 px-4 py-4 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>


                {/* 예산 */}
                <div className="mb-8">

                  <label className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-800">

                    <Wallet className="h-5 w-5 text-blue-600" />

                    여행 예산은 어느 정도인가요?

                  </label>

                  <p className="mb-4 text-sm text-gray-500">
                    여행 전체에 사용할 예산을 선택해주세요.
                  </p>


                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >

                    <option value="">
                      예산을 선택하세요
                    </option>

                    <option value="10만원 이하">
                      10만원 이하
                    </option>

                    <option value="10만원 ~ 30만원">
                      10만원 ~ 30만원
                    </option>

                    <option value="30만원 ~ 50만원">
                      30만원 ~ 50만원
                    </option>

                    <option value="50만원 ~ 100만원">
                      50만원 ~ 100만원
                    </option>

                    <option value="100만원 이상">
                      100만원 이상
                    </option>

                  </select>

                </div>


                {/* 버튼 */}
                <div className="flex gap-3">

                  {/* 이전 */}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex w-1/3 items-center justify-center rounded-xl border border-gray-200 bg-white py-4 font-semibold text-gray-700 transition hover:bg-gray-50"
                  >

                    ← 이전

                  </button>


                  {/* 최종 제출 */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex w-2/3 items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg"
                  >

                    <Plane className="h-5 w-5" />

                    여행 계획 만들기

                  </button>

                </div>

              </div>

            </div>

          )}

        </>

      )}

    </main>
  )
}

export default Home