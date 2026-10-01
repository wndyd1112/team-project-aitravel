import { MapPin, Sparkles, Plane } from "lucide-react"

export default function Start({ onStart }) {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-sky-50 px-6 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-5xl items-center justify-center">

        <div className="w-full text-center">

          {/* 아이콘 */}

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-sky-500 text-white shadow-lg">
            <Plane size={40} />
          </div>

          {/* 제목 */}

          <p className="mb-3 text-sm font-bold tracking-widest text-sky-500">
            AI TRAVEL OPTIMIZER
          </p>

          <h2 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            나만의 여행을
            <br />
            <span className="text-sky-500">
              AI와 함께 계획해보세요
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-500">
            여행지부터 일정, 여행 스타일과 이동 방법까지
            <br />
            나에게 맞는 여행 계획을 만들어보세요.
          </p>

          {/* 여행 계획 만들기 */}

          <div className="mx-auto mt-12 max-w-2xl">

            <button
              type="button"
              onClick={onStart}
              className="group w-full rounded-3xl bg-white p-8 text-left shadow-lg ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex items-center gap-6">

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-500 transition group-hover:bg-sky-500 group-hover:text-white">
                  <Sparkles size={30} />
                </div>

                <div className="flex-1">

                  <div className="flex items-center justify-between">

                    <h3 className="text-xl font-bold text-gray-900">
                      여행 계획 만들기
                    </h3>

                    <span className="text-2xl text-gray-300 transition group-hover:translate-x-1 group-hover:text-sky-500">
                      →
                    </span>

                  </div>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    새로운 여행을 처음부터 계획해보세요.
                    <br />
                    여행지와 날짜, 취향을 입력하면 여행 일정을 만들어드려요.
                  </p>

                </div>

              </div>

            </button>

          </div>

          {/* 하단 문구 */}

          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-gray-400">
            <MapPin size={16} />
            <span>새로운 여행을 시작해보세요</span>
          </div>

        </div>

      </div>
    </main>
  )
}