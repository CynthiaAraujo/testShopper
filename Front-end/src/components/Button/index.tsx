import "./styles.scss";

interface ButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ title, onClick, className, disabled = false }: ButtonProps) => {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={className}>
      <span>{title}</span>
    </button>
  );
}

export { Button };

