

// ActionCard.jsx
function ActionCard({ title = "Actions rapides", buttons = [] }) {
  return (
    <div className="card action">
      <div>
        <h2>{title}</h2>
      </div>

      <div className="choiceButton">
        {buttons.map((button, index) => (
          <button key={index} onClick={button.onClick}>
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ActionCard;