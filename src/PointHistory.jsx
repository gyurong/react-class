function PointHistory({
  history,
  onClear
}) {
  return (
    <section className="history-area">

      <div className="history-header">

        <div>
          <h2>
            포인트 변경 이력
          </h2>

          <p>
            최근 포인트 처리 내역입니다.
          </p>
        </div>


        <button
          className="history-clear-button"
          onClick={onClear}
          disabled={history.length === 0}
        >
          이력 초기화
        </button>

      </div>


      {history.length === 0 && (
        <p className="empty-history">
          아직 포인트 변경 이력이
          없습니다.
        </p>
      )}


      {history.map((item) => (

        <div
          className="history-item"
          key={item.id}
        >

          <div className="history-user">

            <span>
              {item.name}
            </span>

            <small>
              {item.time}
            </small>

          </div>


          <span
            className={
              item.type === 'add'
                ? 'history-type add'
                : 'history-type subtract'
            }
          >
            {item.type === 'add'
              ? '적립'
              : '차감'}
          </span>


          <strong
            className={
              item.type === 'add'
                ? 'history-point add'
                : 'history-point subtract'
            }
          >
            {item.type === 'add'
              ? '+'
              : '-'}
            {item.point.toLocaleString()} P
          </strong>

        </div>

      ))}

    </section>
  )
}

export default PointHistory