import {Search, Bell, User}from"lucide-react";
function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Header */}
<header className="h-16 bg-white border-b flex items-center justify-between px-6">

  {/* 왼쪽 */}
  <div className="flex items-center gap-3">
    <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
      M
    </div>

    <h1 className="text-lg font-bold text-gray-900">
      My Project
    </h1>
  </div>

  {/* 오른쪽 */}
  <div className="flex items-center gap-5">

    {/* 검색 */}
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
      <Search size={18} className="text-gray-500" />

      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent outline-none text-sm w-32"
      />
    </div>

    {/* 알림 */}
    <button className="text-gray-600 hover:text-blue-600 transition">
      <Bell size={20} />
    </button>

    {/* 프로필 */}
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
      {/* Body */}
      <div className="flex">

        {/* Sidebar */}
        <aside className="w-60 min-h-[calc(100vh-4rem)] bg-white border-r p-4">
          <nav>
            <p className="text-sm text-gray-500 mb-3">
              MENU
            </p>

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

        {/* Main */}
        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome 👋
          </h2>

          <p className="text-gray-500">
            여기에 우리가 만들 기능이 들어갈 거야.
          </p>
        </main>

      </div>
    </div>
  )
}

export default App