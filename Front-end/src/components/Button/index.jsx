import "./styles.scss";

export function Button({ title, ...rest }) {
  return (
    <button type="button" {...rest}>
      <span>{title}</span>
    </button>
  );
}

export default Button;
