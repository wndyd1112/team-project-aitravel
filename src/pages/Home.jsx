function Home() {
  return (
    <main>
      <h1>✈️ TRIP PLANNER</h1>

      <p>나만의 여행 계획을 만들어보세요.</p>

      <div>
        <label>어디로 여행을 떠나시나요?</label>
        <input type="text" placeholder="여행지를 입력하세요" />
      </div>

      <div>
        <label>여행 기간</label>
        <input type="date" />
        <span> ~ </span>
        <input type="date" />
      </div>

      <button>여행 계획 만들기</button>
    </main>
  )
}

export default Home
