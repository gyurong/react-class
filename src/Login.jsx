import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const navigate = useNavigate()

  const users = [
    {
      id: 1,
      name: '이규원',
      email: 'gyuwon@school.ac.kr',
      password: '1234',
      role: 'user'
    },
    {
      id: 2,
      name: '안민혁',
      email: 'minhyuk@school.ac.kr',
      password: '1234',
      role: 'user'
    },
    {
      id: 3,
      name: '개호두',
      email: 'hodu@school.ac.kr',
      password: '1234',
      role: 'user'
    },
    {
      id: 0,
      name: '관리자',
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

    const inputEmail = email.trim().toLowerCase()
    const inputPassword = password.trim()

    const loginUser = users.find(
      (user) =>
        user.email.toLowerCase() === inputEmail &&
        user.password === inputPassword
    )

    if (!loginUser) {
      setMessage(
        '이메일 또는 비밀번호가 일치하지 않습니다.'
      )
      return
    }

    localStorage.removeItem('isLogin')
    localStorage.removeItem('role')
    localStorage.removeItem('userId')

    localStorage.setItem('isLogin', 'true')
    localStorage.setItem('role', loginUser.role)

    setMessage('')

    if (loginUser.role === 'admin') {
      navigate('/admin')
      return
    }

    localStorage.setItem(
      'userId',
      String(loginUser.id)
    )

    navigate('/user')
  }

  return (
    <main className="login-page">

      <section className="login-card">

        <div className="login-header">

          <h1>
            포인트 시스템 로그인
          </h1>

          <p>
            사용자 또는 관리자 계정으로 로그인해주세요.
          </p>

        </div>

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

        {message && (
          <p className="login-message">
            {message}
          </p>
        )}

        <section className="test-account-section">

          <div className="test-account-header">

            <h2>
              테스트 계정
            </h2>

            <span>
              공통 비밀번호 <strong>1234</strong>
            </span>

          </div>


          {/* 일반 사용자 */}
          <div className="account-group">

            <div className="account-group-title">

              <span className="user-dot"></span>

              일반 사용자

            </div>

            <div className="account-table">

              <div className="account-row">
                <strong>이규원</strong>
                <span>gyuwon@school.ac.kr</span>
              </div>

              <div className="account-row">
                <strong>안민혁</strong>
                <span>minhyuk@school.ac.kr</span>
              </div>

              <div className="account-row">
                <strong>개호두</strong>
                <span>hodu@school.ac.kr</span>
              </div>

            </div>

          </div>


          {/* 관리자 */}
          <div className="account-group admin-group">

            <div className="account-group-title">

              <span className="admin-dot"></span>

              관리자

            </div>

            <div className="account-table">

              <div className="account-row">
                <strong>관리자</strong>
                <span>admin@school.ac.kr</span>
              </div>

            </div>

          </div>

        </section>

      </section>

    </main>
  )
}

export default Login