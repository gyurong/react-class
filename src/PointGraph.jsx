function PointGraph({ users, maxPoint }) {
  return (
    <section className="graph-area">

      <h2>사용자별 포인트 그래프</h2>

      {users.map((user) => (
        <div
          className="graph-row"
          key={user.id}
        >

          <span className="graph-name">
            {user.name}
          </span>

          <div className="graph-background">

            <div
              className="graph-bar"
              style={{
                width:
                  `${(user.point / maxPoint) * 100}%`
              }}
            />

          </div>

          <strong>
            {user.point.toLocaleString()} P
          </strong>

        </div>
      ))}

    </section>
  )
}

export default PointGraph