const Button = ({ buttonType, children, onClick }) => {

  const className = buttonType === "secondary"
    ? "btn--secondary"
    : "";

  return (
    <button
      onClick={onClick}
      className={`btn ${className}`}>
      {children}
    </button>  )
}

export default Button;
