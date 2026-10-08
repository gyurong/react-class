import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import './App.css'

import PointForm from './PointForm.jsx'
import UserList from './UserList.jsx'
import PointGraph from './PointGraph.jsx'
import PointHistory from './PointHistory.jsx'

function App() {
  const navigate = useNavigate()

  const defaultUsers = [
    { id: 1, name: '이규원', point: 8500 },
    { id: 2, name: '안민혁', point: 12000 },
    { id: 3, name: '개호두', point: 5500 }
  ]


  /* 사용자 데이터 */
  const [users, setUsers] = useState(() => {

    const savedUsers =
      localStorage.getItem('pointUsers')

    if (savedUsers) {
      try {
        return JSON.parse(savedUsers)
      } catch {
        return defaultUsers
      }
    }

    return defaultUsers
  })


  const [showGraph, setShowGraph] =
    useState(false)

  const [selectedId, setSelectedId] =
    useState('1')

  const [pointType, setPointType] =
    useState('add')

  const [amount, setAmount] =
    useState('')

  // 새 기능
  const [reason, setReason] =
    useState('')

  const [message, setMessage] =
    useState('')


  /* 변경 이력 */
  const [history, setHistory] =
    useState(() => {

      const savedHistory =
        localStorage.getItem(
          'pointHistory'
        )

      if (savedHistory) {
        try {
          return JSON.parse(
            savedHistory
          )
        } catch {
          return []
        }
      }

      return []
    })


  const [searchTerm, setSearchTerm] =
    useState('')

  const [sortType, setSortType] =
    useState('default')


  /* 사용자 데이터 저장 */
  useEffect(() => {

    localStorage.setItem(
      'pointUsers',
      JSON.stringify(users)
    )

  }, [users])


  /* 이력 저장 */
  useEffect(() => {

    localStorage.setItem(
      'pointHistory',
      JSON.stringify(history)
    )

  }, [history])


  /* 로그인 권한 */
  const isLogin =
    localStorage.getItem('isLogin')

  const role =
    localStorage.getItem('role')

  if (
    isLogin !== 'true' ||
    role !== 'admin'
  ) {
    return <Navigate to="/" replace />
  }


  /* 전체 포인트 */
  const totalPoint =
    users.reduce(
      (sum, user) =>
        sum + user.point,
      0
    )


  /* 평균 포인트 */
  const averagePoint =
    users.length > 0
      ? Math.round(
          totalPoint /
          users.length
        )
      : 0


  /* 최고 포인트 사용자 */
  const topUser =
    users.length > 0
      ? users.reduce(
          (maxUser, user) =>
            user.point >
            maxUser.point
              ? user
              : maxUser
        )
      : null


  /* 검색 */
  let displayedUsers =
    users.filter((user) =>
      user.name.includes(
        searchTerm.trim()
      )
    )


  /* 정렬 */
  displayedUsers =
    [...displayedUsers].sort(
      (a, b) => {

        if (sortType === 'high') {
          return b.point - a.point
        }

        if (sortType === 'low') {
          return a.point - b.point
        }

        if (sortType === 'name') {
          return a.name.localeCompare(
            b.name,
            'ko'
          )
        }

        return a.id - b.id
      }
    )


  /* 그래프 최대값 */
  const visiblePoints =
    displayedUsers.map(
      (user) => user.point
    )

  const maxPoint =
    visiblePoints.length > 0
      ? Math.max(
          Math.max.apply(
            null,
            visiblePoints
          ),
          1
        )
      : 1


  /* 시간 만들기 */
  const getCurrentTime = () => {

    const now = new Date()

    const year =
      now.getFullYear()

    const month =
      String(
        now.getMonth() + 1
      ).padStart(2, '0')

    const day =
      String(
        now.getDate()
      ).padStart(2, '0')

    const hour =
      String(
        now.getHours()
      ).padStart(2, '0')

    const minute =
      String(
        now.getMinutes()
      ).padStart(2, '0')

    return `${year}.${month}.${day} ${hour}:${minute}`
  }


  /* 포인트 변경 */
  const handlePointUpdate = () => {

    const pointValue =
      Number(amount)

    const userId =
      Number(selectedId)


    if (
      amount === '' ||
      pointValue <= 0
    ) {
      setMessage(
        '1 이상의 포인트를 입력하세요.'
      )

      return
    }


    /* 변경 사유 검사 */
    if (
      reason.trim() === ''
    ) {
      setMessage(
        '포인트 변경 사유를 입력하세요.'
      )

      return
    }


    const selectedUser =
      users.find(
        (user) =>
          user.id === userId
      )


    if (!selectedUser) {
      setMessage(
        '사용자를 찾을 수 없습니다.'
      )

      return
    }


    if (
      pointType === 'subtract' &&
      pointValue >
        selectedUser.point
    ) {
      setMessage(
        '현재 보유 포인트보다 많이 차감할 수 없습니다.'
      )

      return
    }


    const updatedUsers =
      users.map((user) => {

        if (
          user.id !== userId
        ) {
          return user
        }

        let newPoint

        if (
          pointType === 'add'
        ) {
          newPoint =
            user.point +
            pointValue
        } else {
          newPoint =
            user.point -
            pointValue
        }

        return {
          ...user,
          point: newPoint
        }
      })


    setUsers(updatedUsers)


    /* 변경 이력 */
    const newHistory = {

      id: Date.now(),

      userId: userId,

      name:
        selectedUser.name,

      type:
        pointType,

      point:
        pointValue,

      reason:
        reason.trim(),

      time:
        getCurrentTime()
    }


    setHistory(
      (prevHistory) => [
        newHistory,
        ...prevHistory
      ]
    )


    setMessage(
      '포인트가 정상적으로 반영되었습니다.'
    )

    setAmount('')

    setReason('')
  }


  /* 이력 초기화 */
  const handleClearHistory = () => {

    if (
      history.length === 0
    ) {
      return
    }

    const isConfirm =
      window.confirm(
        '포인트 변경 이력을 모두 삭제하시겠습니까?'
      )

    if (isConfirm) {
      setHistory([])
    }
  }


  /* 로그아웃 */
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
    <main className="admin-page">

      <h1>
        관리자 포인트 관리
      </h1>

      <p className="admin-description">
        사용자 포인트와 변경 이력을
        관리할 수 있습니다.
      </p>


      {/* 통계 */}
      <section className="stats-grid">

        <div className="stat-card">

          <span>전체 사용자</span>

          <strong>
            {users.length}
            <small> 명</small>
          </strong>

        </div>


        <div className="stat-card">

          <span>전체 포인트</span>

          <strong>
            {totalPoint.toLocaleString()}
            <small> P</small>
          </strong>

        </div>


        <div className="stat-card">

          <span>평균 포인트</span>

          <strong>
            {averagePoint.toLocaleString()}
            <small> P</small>
          </strong>

        </div>


        <div className="stat-card">

          <span>최고 포인트</span>

          <strong className="top-user">
            {topUser
              ? topUser.name
              : '-'}
          </strong>

          {topUser && (
            <small className="top-point">

              {topUser.point.toLocaleString()}
              {' '}P

            </small>
          )}

        </div>

      </section>


      {/* 검색 */}
      <section className="admin-tools">

        <div className="tool-group">

          <label>사용자 검색</label>

          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
          />

        </div>


        <div className="tool-group">

          <label>정렬</label>

          <select
            value={sortType}
            onChange={(e) =>
              setSortType(
                e.target.value
              )
            }
          >

            <option value="default">
              기본 순서
            </option>

            <option value="high">
              포인트 높은 순
            </option>

            <option value="low">
              포인트 낮은 순
            </option>

            <option value="name">
              이름순
            </option>

          </select>

        </div>

      </section>


      <p className="search-result">
        검색 결과 {displayedUsers.length}명
      </p>


      {/* 포인트 지급 / 차감 */}
      <PointForm
        users={users}

        selectedId={selectedId}
        setSelectedId={setSelectedId}

        pointType={pointType}
        setPointType={setPointType}

        amount={amount}
        setAmount={setAmount}

        reason={reason}
        setReason={setReason}

        message={message}

        handlePointUpdate={
          handlePointUpdate
        }
      />


      {/* 사용자 목록 */}
      <UserList
        users={displayedUsers}
      />


      <div className="button-area">

        <button
          onClick={() =>
            setShowGraph(
              !showGraph
            )
          }
        >
          {showGraph
            ? '그래프 닫기'
            : '그래프 보기'}
        </button>


        <button
          onClick={handleLogout}
        >
          로그아웃
        </button>

      </div>


      {showGraph && (

        <PointGraph
          users={displayedUsers}
          maxPoint={maxPoint}
        />

      )}


      <PointHistory
        history={history}
        onClear={
          handleClearHistory
        }
      />

    </main>
  )
}

export default App