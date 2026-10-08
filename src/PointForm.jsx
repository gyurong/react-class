function PointForm({
  users,
  selectedId,
  setSelectedId,
  pointType,
  setPointType,
  amount,
  setAmount,
  reason,
  setReason,
  message,
  handlePointUpdate
}) {
  return (
    <section className="point-control">

      <h2>포인트 지급·차감</h2>

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


      {/* 새 기능 */}
      <div className="point-form">

        <label>변경 사유</label>

        <input
          type="text"
          placeholder="예: 이벤트 참여, 후기 작성"
          value={reason}
          onChange={(e) =>
            setReason(e.target.value)
          }
        />

      </div>


      <button
        className="apply-button"
        onClick={handlePointUpdate}
      >
        포인트 반영
      </button>


      {message && (
        <p className="result-message">
          {message}
        </p>
      )}

    </section>
  )
}

export default PointForm