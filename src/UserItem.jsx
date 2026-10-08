function UserItem({ user }) {
  return (
    <div className="user-item">
      <span>
        {user.name}
      </span>

      <strong>
        {user.point.toLocaleString()} P
      </strong>
    </div>
  )
}

export default UserItem