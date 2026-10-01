import { useEffect, useState } from "react"
import { Search, Bell, User, Menu, X } from "lucide-react"
import Start from "./pages/Start"
import Home from "./pages/Home"
import Result from "./pages/Result"
import Confirmed from "./pages/Confirmed"

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [travelData, setTravelData] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  // 화면이 바뀔 때 항상 맨 위로 이동
  useEffect(() => {
    window.history.scrollRestoration = "manual"

    window.scrollTo({
      top: 0,
      behavior: "instant",
    })

    return () => {
      window.history.scrollRestoration = "auto"
    }
  }, [step, confirmed])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 상단 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-600 hover:text-blue-600 transition"
          >
            <Menu size={24} />
          </button>

          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
            O
          </div>

          <button
  type="button"
  onClick={() => {
    setTravelData(null)
    setConfirmed(false)
    setStep(0)
  }}
  className="text-lg font-bold text-gray-900 hover:text-sky-600 transition"
>
  AI Travel Optimizer
</button>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
            <Search size={18} className="text-gray-500" />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-32"
            />
          </div>

          <button
            type="button"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            <Bell size={20} />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={18} className="text-gray-600" />
            </div>

            <span className="text-sm font-medium text-gray-700">
              User
            </span>
          </div>
        </div>
      </header>

      {/* 사이드바 */}
      {isSidebarOpen && (
        <aside className="fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-60 bg-white border-r p-4 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-500">
              MENU
            </p>

            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-800 transition"
            >
              <X size={22} />
            </button>
          </div>

         <nav className="space-y-2">

  {/* 홈 */}
  <button
    type="button"
    onClick={() => {
      setStep(0)
      setTravelData(null)
      setConfirmed(false)
      setIsSidebarOpen(false)
    }}
    className="w-full rounded-lg px-4 py-3 text-left font-medium transition hover:bg-gray-100"
  >
    🏠 홈
  </button>

  {/* 여행 계획 만들기 */}
  <button
    type="button"
    onClick={() => {
      setStep(1)
      setTravelData(null)
      setConfirmed(false)
      setIsSidebarOpen(false)
    }}
    className="w-full rounded-lg px-4 py-3 text-left font-medium transition hover:bg-gray-100"
  >
    ✈️ 여행 계획 만들기
  </button>

  {/* 여행 지도 */}
  <button
    type="button"
    onClick={() => {
      alert("여행 지도 기능은 준비 중입니다.")
    }}
    className="w-full rounded-lg px-4 py-3 text-left transition hover:bg-gray-100"
  >
    🗺️ 여행 지도
  </button>

  {/* 일정 보기 */}
  <button
    type="button"
    onClick={() => {
      alert("일정 보기 기능은 준비 중입니다.")
    }}
    className="w-full rounded-lg px-4 py-3 text-left transition hover:bg-gray-100"
  >
    📅 일정 보기
  </button>

  {/* 여행 요약 */}
  <button
    type="button"
    onClick={() => {
      alert("여행 요약 기능은 준비 중입니다.")
    }}
    className="w-full rounded-lg px-4 py-3 text-left transition hover:bg-gray-100"
  >
    📊 여행 요약
  </button>

  {/* 구분선 */}
  <div className="my-4 border-t border-gray-200" />

  {/* 설정 */}
  <button
    type="button"
    onClick={() => {
      alert("설정 기능은 준비 중입니다.")
    }}
    className="w-full rounded-lg px-4 py-3 text-left transition hover:bg-gray-100"
  >
    ⚙️ 설정
  </button>

</nav>
        </aside>
      )}

      {/* 본문 */}
     <main className="flex-1 pt-16">

      {step === 0 &&(
        <Start
          onStart={() => setStep(1)}
          />
      )}
  {step === 1 && (
    <Home
      onCreatePlan={(data) => {
        setTravelData(data)
        setStep(2)
        setConfirmed(false)
      }}
    />
  )}

  {step === 2 && !confirmed && (
    <Result
      travelData={travelData}
      onBack={() => setStep(1)}
      onConfirm={() => setConfirmed(true)}
    />
  )}

  {step === 2 && confirmed && (
    <Confirmed
      travelData={travelData}
      onBack={() => setConfirmed(false)}
    />
  )}

</main>
    </div>
  )
}

export default App