function UserItem({ user }) {

  const getGrade = (point) => {

    if (point >= 15000) {
      return 'PLATINUM'
    }

    if (point >= 10000) {
      return 'GOLD'
    }

    if (point >= 5000) {
      return 'SILVER'
    }

    return 'BASIC'
  }

  const grade = getGrade(user.point)

  return (
    <div className="user-item">

      <div className="user-summary">

        <span className="user-name">
          {user.name}
        </span>

        <span
          className={`grade-badge ${grade.toLowerCase()}`}
        >
          {grade}
        </span>

      </div>

      <strong>
        {user.point.toLocaleString()} P
      </strong>

    </div>
  )
}

export default UserItem