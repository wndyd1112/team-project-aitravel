import { useState } from "react"
import { Search, Bell, User, Menu, X } from "lucide-react"
import Home from "./pages/Home"

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* 상단 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b flex items-center justify-between px-6">
        
        <div className="flex items-center gap-3">
          
          {/* 메뉴 버튼 */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-600 hover:text-blue-600 transition"
          >
            <Menu size={24} />
          </button>

          {/* 로고 */}
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
            M
          </div>

          {/* 타이틀 */}
          <h1 className="text-lg font-bold text-gray-900">
            My Project
          </h1>
        </div>


        {/* 오른쪽 */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-32"
            />
          </div>

          <button className="text-gray-600 hover:text-blue-600 transition">
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

            {/* X 버튼 */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-800 transition"
            >
              <X size={22} />
            </button>
          </div>


          {/* 메뉴 */}
          <nav className="space-y-2">
            <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-100 font-medium">
              🏠 Home
            </button>

            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100">
              📊 Dashboard
            </button>

            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100">
              ⚙️ Settings
            </button>
          </nav>

        </aside>
      )}


      {/* 메인 */}
      <main className="flex-1 pt-16">
  <Home />
</main>

    </div>
  )
}

export default App