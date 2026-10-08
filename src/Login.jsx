import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const navigate = useNavigate()

  // DB 데이터라고 가정
  const users = [
    {
      email: 'user@school.ac.kr',
      password: '1234',
      role: 'user'
    },
    {
      email: 'admin@school.ac.kr',
      password: '1234',
      role: 'admin'
    }
  ]

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    const loginUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    )

    // 로그인 실패
    if (!loginUser) {
      setMessage('이메일 또는 비밀번호가 일치하지 않습니다.')
      return
    }

    // 로그인 성공
    localStorage.setItem('isLogin', 'true')
    localStorage.setItem('role', loginUser.role)

    // 관리자 / 일반 사용자 페이지 이동
    if (loginUser.role === 'admin') {
      navigate('/admin')
    } else {
      navigate('/user')
    }
  }

  return (
    <main className="login-page">

      <section className="login-card">

        <h1>포인트 시스템 로그인</h1>

        {/* 로그인 입력 영역 */}
        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          <div className="login-row">

            <input
              className="login-input"
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              className="login-input"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              className="login-button"
              type="submit"
            >
              로그인
            </button>

          </div>

        </form>

        {/* 로그인 실패 메시지 */}
        {message && (
          <p className="login-message">
            {message}
          </p>
        )}

        {/* 계정 안내 */}
        <div className="login-account-info">

          <div className="account-item">
            <span>일반 사용자</span>

            <strong>
              user@school.ac.kr / 1234
            </strong>
          </div>

          <div className="account-item">
            <span>관리자</span>

            <strong>
              admin@school.ac.kr / 1234
            </strong>
          </div>

        </div>

      </section>

    </main>
  )
}

export default Login