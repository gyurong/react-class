import UserItem from './UserItem.jsx'

function UserList({ users }) {
  return (
    <section>

      <h2>사용자 목록</h2>

      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
        />
      ))}

      <p className="user-count">
        전체 사용자: {users.length}명
      </p>

    </section>
  )
}

export default UserList