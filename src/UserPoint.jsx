import { Navigate, useNavigate } from 'react-router-dom'
import './UserPoint.css'
import './Userpoint.css'

function UserPoint() {
  const navigate = useNavigate()

  // 로그인 정보 확인
  const isLogin = localStorage.getItem('isLogin')
  const role = localStorage.getItem('role')

  // 일반 사용자만 접근
  if (isLogin !== 'true' || role !== 'user') {
    return <Navigate to="/" replace />
  }

  // 포인트 내역
  const points = [
    {
      id: 1,
      title: '가입 축하 포인트',
      point: 10000
    },
    {
      id: 2,
      title: '상품 구매',
      point: 2000
    },
    {
      id: 3,
      title: '후기 작성',
      point: 500
    }
  ]

  // 총 포인트
  const totalPoint = points.reduce(
    (sum, item) => sum + item.point,
    0
  )

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem('isLogin')
    localStorage.removeItem('role')

    navigate('/')
  }

  return (
    <main className="user-point-page">

      <section className="user-point-card">

        {/* 상단 */}
        <div className="user-point-header">

          <div>
            <p className="user-point-label">
              MY POINT
            </p>

            <h1>내 포인트</h1>

            <p className="user-point-description">
              적립된 포인트와 이용 내역을 확인할 수 있습니다.
            </p>
          </div>

          <button
            className="user-logout-button"
            onClick={handleLogout}
          >
            로그아웃
          </button>

        </div>


        {/* 총 포인트 */}
        <section className="total-point-box">

          <span>현재 보유 포인트</span>

          <strong>
            {totalPoint.toLocaleString()}
            <small> P</small>
          </strong>

        </section>


        {/* 포인트 내역 */}
        <section className="point-history-section">

          <div className="section-title-row">

            <h2>포인트 내역</h2>

            <span>
              총 {points.length}건
            </span>

          </div>


          <div className="point-list">

            {points.map((item) => (

              <div
                className="point-item"
                key={item.id}
              >

                <div className="point-item-info">

                  <div className="point-item-icon">
                    P
                  </div>

                  <span>
                    {item.title}
                  </span>

                </div>

                <strong>
                  +{item.point.toLocaleString()} P
                </strong>

              </div>

            ))}

          </div>

        </section>

      </section>

    </main>
  )
}

export default UserPoint