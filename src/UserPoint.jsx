import {
  Navigate,
  useNavigate
} from 'react-router-dom'

import './UserPoint.css'


function UserPoint() {
  const navigate = useNavigate()


  /* =====================================
     로그인 정보 확인
  ===================================== */

  const isLogin =
    localStorage.getItem('isLogin')

  const role =
    localStorage.getItem('role')

  const savedUserId =
    localStorage.getItem('userId')


  // 일반 사용자만 접근 가능
  if (
    isLogin !== 'true' ||
    role !== 'user' ||
    !savedUserId
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    )
  }


  const userId =
    Number(savedUserId)


  /* =====================================
     기본 사용자 정보
  ===================================== */

  const defaultUsers = [
    {
      id: 1,
      name: '이규원',
      email: 'gyuwon@school.ac.kr',
      point: 8500
    },
    {
      id: 2,
      name: '안민혁',
      email: 'minhyuk@school.ac.kr',
      point: 12000
    },
    {
      id: 3,
      name: '개호두',
      email: 'hodu@school.ac.kr',
      point: 5500
    }
  ]


  /* =====================================
     관리자 페이지에서 저장한
     실제 포인트 데이터 불러오기
  ===================================== */

  let pointUsers = []

  const savedPointUsers =
    localStorage.getItem('pointUsers')


  if (savedPointUsers) {

    try {
      pointUsers =
        JSON.parse(savedPointUsers)
    } catch {
      pointUsers = []
    }

  }


  // 저장된 데이터가 없으면 기본값 사용
  if (pointUsers.length === 0) {

    pointUsers =
      defaultUsers.map((user) => ({
        id: user.id,
        name: user.name,
        point: user.point
      }))

    localStorage.setItem(
      'pointUsers',
      JSON.stringify(pointUsers)
    )
  }


  /* =====================================
     현재 로그인한 사용자 찾기
  ===================================== */

  const pointUser =
    pointUsers.find(
      (user) =>
        user.id === userId
    )


  const accountUser =
    defaultUsers.find(
      (user) =>
        user.id === userId
    )


  // 계정을 찾지 못한 경우
  if (
    !pointUser ||
    !accountUser
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    )
  }


  /* =====================================
     현재 사용자 데이터
  ===================================== */

  const currentUser = {
    id: pointUser.id,
    name: pointUser.name,
    email: accountUser.email,
    point: pointUser.point
  }


  /* =====================================
     포인트 변경 이력
  ===================================== */

  let history = []

  const savedHistory =
    localStorage.getItem(
      'pointHistory'
    )


  if (savedHistory) {

    try {
      history =
        JSON.parse(savedHistory)
    } catch {
      history = []
    }

  }


  // 로그인한 사용자 기록만 필터링
  const myHistory =
    history.filter(
      (item) =>
        Number(item.userId) ===
        currentUser.id
    )


  /* =====================================
     총 적립 / 총 차감
  ===================================== */

  const totalAdd =
    myHistory
      .filter(
        (item) =>
          item.type === 'add'
      )
      .reduce(
        (sum, item) =>
          sum + item.point,
        0
      )


  const totalSubtract =
    myHistory
      .filter(
        (item) =>
          item.type === 'subtract'
      )
      .reduce(
        (sum, item) =>
          sum + item.point,
        0
      )


  /* =====================================
     등급 계산
  ===================================== */

  const getGradeInfo = (point) => {

    if (point >= 15000) {
      return {
        grade: 'PLATINUM',
        currentMin: 15000,
        nextMin: null,
        nextGrade: null
      }
    }


    if (point >= 10000) {
      return {
        grade: 'GOLD',
        currentMin: 10000,
        nextMin: 15000,
        nextGrade: 'PLATINUM'
      }
    }


    if (point >= 5000) {
      return {
        grade: 'SILVER',
        currentMin: 5000,
        nextMin: 10000,
        nextGrade: 'GOLD'
      }
    }


    return {
      grade: 'BASIC',
      currentMin: 0,
      nextMin: 5000,
      nextGrade: 'SILVER'
    }
  }


  const gradeInfo =
    getGradeInfo(
      currentUser.point
    )


  /* =====================================
     다음 등급 진행률
  ===================================== */

  let progress = 100


  if (gradeInfo.nextMin) {

    progress =
      (
        (
          currentUser.point -
          gradeInfo.currentMin
        )
        /
        (
          gradeInfo.nextMin -
          gradeInfo.currentMin
        )
      ) * 100

  }


  progress =
    Math.min(
      Math.max(progress, 0),
      100
    )


  const remainingPoint =
    gradeInfo.nextMin
      ? Math.max(
          gradeInfo.nextMin -
          currentUser.point,
          0
        )
      : 0


  /* =====================================
     로그아웃
  ===================================== */

  const handleLogout = () => {

    localStorage.removeItem(
      'isLogin'
    )

    localStorage.removeItem(
      'role'
    )

    localStorage.removeItem(
      'userId'
    )

    navigate('/')
  }


  return (
    <main className="user-point-page">

      <section className="user-point-card">


        {/* 사용자 정보 */}
        <div className="user-point-header">

          <div>

            <p className="user-point-label">
              MY POINT
            </p>

            <h1>
              {currentUser.name}님의 포인트
            </h1>

            <p className="user-point-description">
              {currentUser.email}
            </p>

          </div>


          <button
            className="user-logout-button"
            onClick={handleLogout}
          >
            로그아웃
          </button>

        </div>


        {/* 현재 포인트 */}
        <section className="total-point-box">

          <span>
            현재 보유 포인트
          </span>

          <strong>
            {currentUser.point.toLocaleString()}
            <small> P</small>
          </strong>

        </section>


        {/* 포인트 요약 */}
        <section className="user-summary-grid">

          <div className="user-summary-card">

            <span>
              현재 등급
            </span>

            <strong
              className={`summary-grade ${gradeInfo.grade.toLowerCase()}`}
            >
              {gradeInfo.grade}
            </strong>

          </div>


          <div className="user-summary-card">

            <span>
              총 적립
            </span>

            <strong className="summary-add">
              +{totalAdd.toLocaleString()} P
            </strong>

          </div>


          <div className="user-summary-card">

            <span>
              총 차감
            </span>

            <strong className="summary-subtract">
              -{totalSubtract.toLocaleString()} P
            </strong>

          </div>

        </section>


        {/* 등급 진행률 */}
        <section className="membership-card">

          <div className="membership-header">

            <div>

              <p>
                등급 진행 현황
              </p>

              <span
                className={`membership-badge ${gradeInfo.grade.toLowerCase()}`}
              >
                {gradeInfo.grade}
              </span>

            </div>


            <strong>
              {Math.round(progress)}%
            </strong>

          </div>


          <div className="progress-background">

            <div
              className="progress-bar"
              style={{
                width:
                  `${progress}%`
              }}
            />

          </div>


          {gradeInfo.nextGrade ? (

            <p className="next-grade-text">

              다음 등급{' '}

              <strong>
                {gradeInfo.nextGrade}
              </strong>

              까지{' '}

              <strong>
                {remainingPoint.toLocaleString()}P
              </strong>

              {' '}남았습니다.

            </p>

          ) : (

            <p className="next-grade-text">
              현재 최고 등급입니다.
            </p>

          )}

        </section>


        {/* 개인 변경 이력 */}
        <section className="user-history-section">

          <div className="section-title-row">

            <h2>
              내 포인트 변경 이력
            </h2>

            <span>
              총 {myHistory.length}건
            </span>

          </div>


          {myHistory.length === 0 && (

            <p className="user-empty-history">
              아직 포인트 변경 내역이 없습니다.
            </p>

          )}


          {myHistory.map((item) => (

            <div
              className="user-history-item"
              key={item.id}
            >

              <div>

                <strong>
                  {item.reason ||
                    '포인트 변경'}
                </strong>

                <small>
                  {item.time}
                </small>

              </div>


              <span
                className={
                  item.type === 'add'
                    ? 'user-point-change add'
                    : 'user-point-change subtract'
                }
              >

                {item.type === 'add'
                  ? '+'
                  : '-'}

                {item.point.toLocaleString()}
                P

              </span>

            </div>

          ))}

        </section>

      </section>

    </main>
  )
}

export default UserPoint