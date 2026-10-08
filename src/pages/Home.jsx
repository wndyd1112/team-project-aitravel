import { useState } from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css"

import {
  Plane,
  Utensils,
  Landmark,
  Trees,
  History,
  Palette,
  Dumbbell,
  Car,
} from "lucide-react"


const regionData = {
  서울특별시: [
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
    "동작구",
    "마포구",
    "서대문구",
    "서초구",
    "성동구",
    "성북구",
    "송파구",
    "양천구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ],

  부산광역시: [
    "강서구",
    "금정구",
    "기장군",
    "남구",
    "동구",
    "동래구",
    "부산진구",
    "북구",
    "사상구",
    "사하구",
    "서구",
    "수영구",
    "연제구",
    "영도구",
    "중구",
    "해운대구",
  ],

  대구광역시: [
    "군위군",
    "남구",
    "달서구",
    "달성군",
    "동구",
    "북구",
    "서구",
    "수성구",
    "중구",
  ],

  인천광역시: [
    "강화군",
    "계양구",
    "남동구",
    "동구",
    "미추홀구",
    "부평구",
    "서구",
    "연수구",
    "옹진군",
    "중구",
  ],

  광주광역시: [
    "광산구",
    "남구",
    "동구",
    "북구",
    "서구",
  ],

  대전광역시: [
    "대덕구",
    "동구",
    "서구",
    "유성구",
    "중구",
  ],

  울산광역시: [
    "남구",
    "동구",
    "북구",
    "울주군",
    "중구",
  ],

  세종특별자치시: [
    "세종시",
  ],

  경기도: [
    "가평군",
    "고양시",
    "과천시",
    "광명시",
    "광주시",
    "구리시",
    "군포시",
    "김포시",
    "남양주시",
    "동두천시",
    "부천시",
    "성남시",
    "수원시",
    "시흥시",
    "안산시",
    "안성시",
    "안양시",
    "양주시",
    "양평군",
    "여주시",
    "연천군",
    "오산시",
    "용인시",
    "의왕시",
    "의정부시",
    "이천시",
    "파주시",
    "평택시",
    "포천시",
    "하남시",
    "화성시",
  ],

  강원특별자치도: [
    "강릉시",
    "고성군",
    "동해시",
    "삼척시",
    "속초시",
    "양구군",
    "양양군",
    "영월군",
    "원주시",
    "인제군",
    "정선군",
    "철원군",
    "춘천시",
    "태백시",
    "평창군",
    "홍천군",
    "화천군",
    "횡성군",
  ],

  충청북도: [
    "괴산군",
    "단양군",
    "보은군",
    "영동군",
    "옥천군",
    "음성군",
    "제천시",
    "증평군",
    "진천군",
    "청주시",
    "충주시",
  ],

  충청남도: [
    "계룡시",
    "공주시",
    "금산군",
    "논산시",
    "당진시",
    "보령시",
    "부여군",
    "서산시",
    "서천군",
    "아산시",
    "예산군",
    "천안시",
    "청양군",
    "태안군",
    "홍성군",
  ],

  전북특별자치도: [
    "고창군",
    "군산시",
    "김제시",
    "남원시",
    "무주군",
    "부안군",
    "순창군",
    "완주군",
    "익산시",
    "임실군",
    "장수군",
    "전주시",
    "정읍시",
    "진안군",
  ],

  전라남도: [
    "강진군",
    "고흥군",
    "곡성군",
    "광양시",
    "구례군",
    "나주시",
    "담양군",
    "목포시",
    "무안군",
    "보성군",
    "순천시",
    "신안군",
    "여수시",
    "영광군",
    "영암군",
    "완도군",
    "장성군",
    "장흥군",
    "진도군",
    "함평군",
    "해남군",
    "화순군",
  ],

  경상북도: [
    "경산시",
    "경주시",
    "고령군",
    "구미시",
    "김천시",
    "문경시",
    "봉화군",
    "상주시",
    "성주군",
    "안동시",
    "영덕군",
    "영양군",
    "영주시",
    "영천시",
    "예천군",
    "울릉군",
    "울진군",
    "의성군",
    "청도군",
    "청송군",
    "칠곡군",
    "포항시",
  ],

  경상남도: [
    "거제시",
    "거창군",
    "고성군",
    "김해시",
    "남해군",
    "밀양시",
    "사천시",
    "산청군",
    "양산시",
    "의령군",
    "진주시",
    "창녕군",
    "창원시",
    "통영시",
    "하동군",
    "함안군",
    "함양군",
    "합천군",
  ],

  제주특별자치도: [
    "제주시",
    "서귀포시",
  ],
}


export default function Home({ onCreatePlan }) {
  const [destination, setDestination] = useState("")

  const [arrivalSido, setArrivalSido] = useState("")
  const [arrivalSigungu, setArrivalSigungu] = useState("")

  const [arrivalPlace, setArrivalPlace] = useState("")
  const [departurePlace, setDeparturePlace] = useState("")

  const [arrivalDate, setArrivalDate] = useState("")
  const [departureDate, setDepartureDate] = useState("")

  const [arrivalTime, setArrivalTime] = useState("")
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
      name: "역사",
      icon: History,
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


  const formatDate = (date) => {
    if (!date) {
      return ""
    }

    const [year, month, day] = date.split("-")

    return `${Number(month)}월 ${Number(day)}일`
  }


  const formatTime = (time) => {
    if (!time) {
      return ""
    }

    const [hourString, minute] = time.split(":")
    const hour = Number(hourString)

    const period = hour < 12 ? "오전" : "오후"
    const displayHour =
      hour % 12 === 0 ? 12 : hour % 12

    return `${period} ${displayHour}:${minute}`
  }


  const formatDateValue = (date) => {
    if (!date) {
      return ""
    }

    const year = date.getFullYear()
    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0")
    const day = String(
      date.getDate()
    ).padStart(2, "0")

    return `${year}-${month}-${day}`
  }


  const getTripDuration = () => {
    if (!arrivalDate || !departureDate) {
      return ""
    }

    const start = new Date(
      `${arrivalDate}T00:00:00`
    )

    const end = new Date(
      `${departureDate}T00:00:00`
    )

    const difference =
      end.getTime() - start.getTime()

    const nights = Math.round(
      difference /
        (1000 * 60 * 60 * 24)
    )

    if (nights < 0) {
      return ""
    }

    return `${nights}박 ${nights + 1}일 일정`
  }


  const handleDateRangeSelect = (range) => {
    if (!range) {
      setArrivalDate("")
      setDepartureDate("")
      return
    }

    setArrivalDate(
      range.from
        ? formatDateValue(range.from)
        : ""
    )

    setDepartureDate(
      range.to
        ? formatDateValue(range.to)
        : ""
    )
  }


  const handleStyleClick = (styleName) => {
    if (styles.includes(styleName)) {
      setStyles(
        styles.filter(
          (style) => style !== styleName
        )
      )
      return
    }

    if (styles.length >= 3) {
      return
    }

    setStyles([
      ...styles,
      styleName,
    ])
  }


  const handleNext = () => {
    if (!arrivalSido || !arrivalSigungu) {
      alert("여행지를 선택해주세요.")
      return
    }

    if (!arrivalDate || !departureDate) {
      alert("여행 기간을 선택해주세요.")
      return
    }

    if (!arrivalPlace) {
      alert("도착 장소를 선택해주세요.")
      return
    }

    if (!arrivalTime) {
      alert("도착 시간을 입력해주세요.")
      return
    }

    if (!departurePlace) {
      alert("출발 장소를 선택해주세요.")
      return
    }

    if (!departureTime) {
      alert("출발 시간을 입력해주세요.")
      return
    }

    if (departureDate < arrivalDate) {
      alert(
        "여행 종료일은 시작일보다 빠를 수 없습니다."
      )
      return
    }

    if (styles.length === 0) {
      alert(
        "여행 스타일을 하나 이상 선택해주세요."
      )
      return
    }

    setDestination(
      `${arrivalSido} ${arrivalSigungu}`
    )

    setStep(2)
  }


  const handleSubmit = () => {
    if (!transport) {
      alert(
        "여행 중 이동수단을 선택해주세요."
      )
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
  }


  const handleCreatePlan = () => {
    onCreatePlan({
      destination,
      startDate: arrivalDate,
      endDate: departureDate,

      arrivalPlace,
      arrivalDate,
      arrivalTime,

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


  /*
   * 입력 내용 확인 화면
   */
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
                입력한 정보를 확인한 후
                여행 계획을 만들어보세요.
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
                  {arrivalPlace}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {formatDate(arrivalDate)}{" "}
                  {formatTime(arrivalTime)}
                </p>

              </div>


              {/* 출발 정보 */}
              <div className="rounded-2xl bg-gray-50 p-5">

                <p className="mb-3 text-sm font-medium text-gray-400">
                  여행지 출발 정보
                </p>

                <p className="font-semibold text-gray-800">
                  {departurePlace}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {formatDate(departureDate)}{" "}
                  {formatTime(departureTime)}
                </p>

              </div>


              {/* 여행 스타일 */}
              <div className="rounded-2xl bg-gray-50 p-5">

                <p className="mb-3 text-sm font-medium text-gray-400">
                  여행 스타일
                </p>

                <div className="flex flex-wrap gap-2">

                  {styles.map(
                    (style, index) => (
                      <span
                        key={style}
                        className="rounded-full bg-sky-100 px-3 py-1.5 text-sm font-semibold text-sky-600"
                      >
                        {index + 1}. {style}
                      </span>
                    )
                  )}

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


  /*
   * 입력 화면
   */
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-sky-50 px-6 py-12">

      <div className="mx-auto max-w-4xl">

        {/* =========================
            STEP 1
        ========================== */}
        {step === 1 && (
          <div className="rounded-3xl bg-white p-8 shadow-xl">

            {/* 제목 */}
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


            {/* =========================
                여행지 등록
            ========================== */}
            <div className="mb-6지 rounded-2xl bg-gray-50 p-6">

              <h3 className="mb-5 text-lg font-bold text-gray-800">
                📍 여행지 등록
              </h3>
              <p className="mb-6 text-sm text-gray-400">
                  AI가 선택한 지역에 맞춰 여행 계획을 만들어드려요.
                </p>

              <div className="grid gap-3 sm:grid-cols-2">

                {/* 시/도 */}
                <select
                  value={arrivalSido}
                  onChange={(e) => {
                    setArrivalSido(e.target.value)
                    setArrivalSigungu("")
                  }}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-sky-500"
                >

                  <option value="">
                    시/도 선택
                  </option>

                  {Object.keys(regionData).map(
                    (sido) => (
                      <option
                        key={sido}
                        value={sido}
                      >
                        {sido}
                      </option>
                    )
                  )}

                </select>


                {/* 시/군/구 */}
                <select
                  value={arrivalSigungu}
                  onChange={(e) =>
                    setArrivalSigungu(
                      e.target.value
                    )
                  }
                  disabled={!arrivalSido}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-sky-500 disabled:bg-gray-100 disabled:text-gray-400"
                >

                  <option value="">
                    {arrivalSido
                      ? "시/군/구 선택"
                      : "먼저 시/도를 선택해주세요"}
                  </option>

                  {arrivalSido &&
                    regionData[
                      arrivalSido
                    ].map((sigungu) => (
                      <option
                        key={sigungu}
                        value={sigungu}
                      >
                        {sigungu}
                      </option>
                    ))}

                </select>

              </div>


              {arrivalSido &&
                arrivalSigungu && (
                  <div className="mt-3 rounded-xl bg-sky-50 px-4 py-3 text-sm font-medium text-sky-700">
                    📍 {arrivalSido}{" "}
                    {arrivalSigungu}
                  </div>
                )}

            </div>


            {/* =========================
                여행 기간 + 이동 정보
            ========================== */}
            <div className="rounded-2xl bg-gray-50 p-6">

              {/* 여행 기간 */}
              <div className="mb-8">

                <h3 className="mb-2 text-lg font-bold text-gray-800">
                  📅 여행 기간
                </h3>

                <p className="mb-5 text-sm text-gray-400">
                  여행 시작일과 종료일을
                  달력에서 선택해주세요.
                </p>


                <div className="flex justify-center overflow-hidden rounded-2xl bg-white p-4">

                  <DayPicker
                    mode="range"
                    selected={{
                      from: arrivalDate
                        ? new Date(
                            `${arrivalDate}T00:00:00`
                          )
                        : undefined,

                      to: departureDate
                        ? new Date(
                            `${departureDate}T00:00:00`
                          )
                        : undefined,
                    }}
                    onSelect={
                      handleDateRangeSelect
                    }
                    numberOfMonths={1}
                    disabled={{
                      before: new Date(),
                    }}
                    showOutsideDays
                  />

                </div>


                {arrivalDate && (
                  <div className="mt-4 rounded-xl bg-sky-50 px-4 py-3">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-xs text-gray-400">
                          여행 기간
                        </p>

                        <p className="mt-1 font-bold text-gray-800">

                          {formatDate(
                            arrivalDate
                          )}

                          {departureDate && (
                            <>
                              {" ~ "}
                              {formatDate(
                                departureDate
                              )}
                            </>
                          )}

                        </p>

                      </div>


                      {departureDate && (
                        <p className="font-bold text-sky-600">
                          {getTripDuration()}
                        </p>
                      )}

                    </div>

                  </div>
                )}

              </div>


              {/* =========================
                  이동 정보
              ========================== */}
              <div className="border-t border-gray-200 pt-8">

                <h3 className="mb-2 text-lg font-bold text-gray-800">
                  📍 여행 이동 정보
                </h3>

                <p className="mb-1 text-sm text-gray-400">
                  여행지에 도착하고 출발할
                  장소와 시간을 선택해주세요.
                </p>
                <p className="mb-6 text-sm text-gray-400">
                  10분 단위로 선택 가능해요.
                </p>
            


                {/* =========================
                    도착 정보
                ========================== */}
                <div className="mb-6 rounded-2xl bg-white p-5">

                  <h4 className="mb-5 font-bold text-gray-800">
                    ✈️ 도착 정보
                  </h4>


                  {/* 도착 장소 */}
                  <div className="mb-5">

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      도착 장소
                    </label>

                    <select
                      value={arrivalPlace}
                      onChange={(e) =>
                        setArrivalPlace(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-500"
                    >

                      <option value="">
                        도착 장소를 선택해주세요
                      </option>

                      <option value="기차역">
                        🚆 기차역
                      </option>

                      <option value="공항">
                        ✈️ 공항
                      </option>

                      <option value="버스터미널">
                        🚌 버스터미널
                      </option>

                      <option value="기타">
                        📍 기타
                      </option>

                    </select>

                  </div>


                  {/* 도착 시간 */}
                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      도착 시간
                    </label>

                    <div className="flex gap-2">

                      {/* 오전 / 오후 */}
                      <select
                        value={
                          arrivalTime
                            ? Number(
                                arrivalTime.split(
                                  ":"
                                )[0]
                              ) < 12
                              ? "오전"
                              : "오후"
                            : ""
                        }
                        onChange={(e) => {

                          const currentMinute =
                            arrivalTime?.split(
                              ":"
                            )[1] || "00"

                          const currentHour =
                            arrivalTime
                              ? Number(
                                  arrivalTime.split(
                                    ":"
                                  )[0]
                                )
                              : 9

                          let hour =
                            currentHour

                          if (
                            e.target.value ===
                              "오전" &&
                            hour >= 12
                          ) {
                            hour -= 12
                          }

                          if (
                            e.target.value ===
                              "오후" &&
                            hour < 12
                          ) {
                            hour += 12
                          }

                          setArrivalTime(
                            `${String(
                              hour
                            ).padStart(
                              2,
                              "0"
                            )}:${currentMinute}`
                          )
                        }}
                        className="w-24 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:border-sky-500"
                      >

                        <option value="">
                          오전/오후
                        </option>

                        <option value="오전">
                          오전
                        </option>

                        <option value="오후">
                          오후
                        </option>

                      </select>


                      {/* 시간 */}
                      <select
                        value={
                          arrivalTime
                            ? String(
                                Number(
                                  arrivalTime.split(
                                    ":"
                                  )[0]
                                ) %
                                  12 || 12
                              )
                            : ""
                        }
                        onChange={(e) => {

                          const currentMinute =
                            arrivalTime?.split(
                              ":"
                            )[1] || "00"

                          const isPM =
                            arrivalTime &&
                            Number(
                              arrivalTime.split(
                                ":"
                              )[0]
                            ) >= 12

                          let hour =
                            Number(
                              e.target.value
                            )

                          if (
                            isPM &&
                            hour !== 12
                          ) {
                            hour += 12
                          }

                          if (
                            !isPM &&
                            hour === 12
                          ) {
                            hour = 0
                          }

                          setArrivalTime(
                            `${String(
                              hour
                            ).padStart(
                              2,
                              "0"
                            )}:${currentMinute}`
                          )
                        }}
                        className="w-20 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:border-sky-500"
                      >

                        <option value="">
                          시
                        </option>

                        {Array.from(
                          { length: 12 },
                          (_, index) => {
                            const hour =
                              index + 1

                            return (
                              <option
                                key={hour}
                                value={hour}
                              >
                                {String(
                                  hour
                                ).padStart(
                                  2,
                                  "0"
                                )}
                                시
                              </option>
                            )
                          }
                        )}

                      </select>


                      {/* 분 */}
                      <select
                        value={
                          arrivalTime
                            ? arrivalTime.split(
                                ":"
                              )[1]
                            : ""
                        }
                        onChange={(e) => {

                          const hour =
                            arrivalTime?.split(
                              ":"
                            )[0] || "09"

                          setArrivalTime(
                            `${hour}:${e.target.value}`
                          )
                        }}
                        className="w-20 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:border-sky-500"
                      >

                        <option value="">
                          분
                        </option>

                        <option value="00">
                          00분
                        </option>

                        <option value="10">
                          10분
                        </option>

                        <option value="20">
                          20분
                        </option>

                        <option value="30">
                          30분
                        </option>

                        <option value="40">
                          40분
                        </option>

                        <option value="50">
                          50분
                        </option>

                      </select>

                    </div>

                  </div>

                </div>


                {/* =========================
                    출발 정보
                ========================== */}
                <div className="rounded-2xl bg-white p-5">

                  <h4 className="mb-5 font-bold text-gray-800">
                    🚌 출발 정보
                  </h4>


                  {/* 출발 장소 */}
                  <div className="mb-5">

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      출발 장소
                    </label>

                    <select
                      value={departurePlace}
                      onChange={(e) =>
                        setDeparturePlace(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-500"
                    >

                      <option value="">
                        출발 장소를 선택해주세요
                      </option>

                      <option value="기차역">
                        🚆 기차역
                      </option>

                      <option value="공항">
                        ✈️ 공항
                      </option>

                      <option value="버스터미널">
                        🚌 버스터미널
                      </option>

                      <option value="기타">
                        📍 기타
                      </option>

                    </select>

                  </div>


                  {/* 출발 시간 */}
                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      출발 시간
                    </label>

                    <div className="flex gap-2">

                      {/* 오전 / 오후 */}
                      <select
                        value={
                          departureTime
                            ? Number(
                                departureTime.split(
                                  ":"
                                )[0]
                              ) < 12
                              ? "오전"
                              : "오후"
                            : ""
                        }
                        onChange={(e) => {

                          const currentMinute =
                            departureTime?.split(
                              ":"
                            )[1] || "00"

                          const currentHour =
                            departureTime
                              ? Number(
                                  departureTime.split(
                                    ":"
                                  )[0]
                                )
                              : 18

                          let hour =
                            currentHour

                          if (
                            e.target.value ===
                              "오전" &&
                            hour >= 12
                          ) {
                            hour -= 12
                          }

                          if (
                            e.target.value ===
                              "오후" &&
                            hour < 12
                          ) {
                            hour += 12
                          }

                          setDepartureTime(
                            `${String(
                              hour
                            ).padStart(
                              2,
                              "0"
                            )}:${currentMinute}`
                          )
                        }}
                        className="w-24 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:border-sky-500"
                      >

                        <option value="">
                          오전/오후
                        </option>

                        <option value="오전">
                          오전
                        </option>

                        <option value="오후">
                          오후
                        </option>

                      </select>


                      {/* 시간 */}
                      <select
                        value={
                          departureTime
                            ? String(
                                Number(
                                  departureTime.split(
                                    ":"
                                  )[0]
                                ) %
                                  12 || 12
                              )
                            : ""
                        }
                        onChange={(e) => {

                          const currentMinute =
                            departureTime?.split(
                              ":"
                            )[1] || "00"

                          const isPM =
                            departureTime &&
                            Number(
                              departureTime.split(
                                ":"
                              )[0]
                            ) >= 12

                          let hour =
                            Number(
                              e.target.value
                            )

                          if (
                            isPM &&
                            hour !== 12
                          ) {
                            hour += 12
                          }

                          if (
                            !isPM &&
                            hour === 12
                          ) {
                            hour = 0
                          }

                          setDepartureTime(
                            `${String(
                              hour
                            ).padStart(
                              2,
                              "0"
                            )}:${currentMinute}`
                          )
                        }}
                        className="w-20 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:border-sky-500"
                      >

                        <option value="">
                          시
                        </option>

                        {Array.from(
                          { length: 12 },
                          (_, index) => {
                            const hour =
                              index + 1

                            return (
                              <option
                                key={hour}
                                value={hour}
                              >
                                {String(
                                  hour
                                ).padStart(
                                  2,
                                  "0"
                                )}
                                시
                              </option>
                            )
                          }
                        )}

                      </select>


                      {/* 분 */}
                      <select
                        value={
                          departureTime
                            ? departureTime.split(
                                ":"
                              )[1]
                            : ""
                        }
                        onChange={(e) => {

                          const hour =
                            departureTime?.split(
                              ":"
                            )[0] || "18"

                          setDepartureTime(
                            `${hour}:${e.target.value}`
                          )
                        }}
                        className="w-20 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:border-sky-500"
                      >

                        <option value="">
                          분
                        </option>

                        <option value="00">
                          00분
                        </option>

                        <option value="10">
                          10분
                        </option>

                        <option value="20">
                          20분
                        </option>

                        <option value="30">
                          30분
                        </option>

                        <option value="40">
                          40분
                        </option>

                        <option value="50">
                          50분
                        </option>

                      </select>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* =========================
                여행 스타일
            ========================== */}
            <div className="mb-8 mt-12">

              <label className="mb-2 block text-lg font-semibold text-gray-800">
                ✨ 어떤 여행을 원하시나요?
              </label>

              <p className="mb-4 text-xs text-gray-400">
                최대 3개까지 선택할 수 있어요.
                선택한 순서대로 우선순위가 적용됩니다.
              </p>


              <div className="grid grid-cols-3 gap-3">

                {travelStyles.map(
                  (style) => {

                    const Icon =
                      style.icon

                    const selected =
                      styles.includes(
                        style.name
                      )

                    const order =
                      styles.indexOf(
                        style.name
                      ) + 1

                    return (
                      <button
                        key={style.name}
                        type="button"
                        onClick={() =>
                          handleStyleClick(
                            style.name
                          )
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
                  }
                )}

              </div>

            </div>


            {/* =========================
                제외하고 싶은 것
            ========================== */}
            <div className="mb-8">

              <label className="mb-3 block text-lg font-semibold text-gray-800">
                🚫 여행에서 제외하고 싶은 것이 있나요?
              </label>

              <textarea
                value={disliked}
                onChange={(e) =>
                  setDisliked(
                    e.target.value
                  )
                }
                placeholder="예: 너무 붐비는 곳은 싫어요, 조금만 걷고싶어요."
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


        {/* =========================
            STEP 2
        ========================== */}
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

                {transports.map(
                  (item) => {

                    const selected =
                      transport ===
                      item.name

                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() =>
                          setTransport(
                            item.name
                          )
                        }
                        className={`rounded-2xl border px-3 py-3 transition ${
                          selected
                            ? "border-sky-500 bg-sky-50 text-sky-600"
                            : "border-gray-200 bg-white text-gray-600 hover:border-sky-300"
                        }`}
                      >

                        <div className="mb-2 flex justify-center">

                          {typeof item.icon ===
                          "string" ? (
                            <span className="text-3xl">
                              {item.icon}
                            </span>
                          ) : (
                            <item.icon
                              size={24}
                            />
                          )}

                        </div>

                        <p className="text-sm font-semibold">
                          {item.name}
                        </p>

                      </button>
                    )
                  }
                )}

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
                  setPeople(
                    e.target.value
                  )
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
                  setBudget(
                    e.target.value
                  )
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
                onClick={() =>
                  setStep(1)
                }
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