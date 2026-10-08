function PointForm({
  users,
  selectedId,
  setSelectedId,
  pointType,
  setPointType,
  amount,
  setAmount,
  message,
  handlePointUpdate
}) {
  return (
    <section className="point-control">

      <h2>포인트 지급·차감</h2>

      {/* 사용자 선택 */}
      <div className="point-form">
        <label>사용자 선택</label>

        <select
          value={selectedId}
          onChange={(e) =>
            setSelectedId(e.target.value)
          }
        >
          {users.map((user) => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* 처리 유형 */}
      <div className="point-form">
        <label>처리 유형</label>

        <select
          value={pointType}
          onChange={(e) =>
            setPointType(e.target.value)
          }
        >
          <option value="add">
            포인트 적립
          </option>

          <option value="subtract">
            포인트 차감
          </option>
        </select>
      </div>

      {/* 포인트 입력 */}
      <div className="point-form">
        <label>포인트 입력</label>

        <input
          type="number"
          min="1"
          placeholder="포인트 입력"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />
      </div>

      {/* 포인트 반영 */}
      <button
        className="apply-button"
        onClick={handlePointUpdate}
      >
        포인트 반영
      </button>

      {/* 결과 메시지 */}
      {message && (
        <p className="result-message">
          {message}
        </p>
      )}

    </section>
  )
}

export default PointForm