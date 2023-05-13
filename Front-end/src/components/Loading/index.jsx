import "./styles.scss";

import { AiOutlineLoading } from "react-icons/ai";

export function Loading({ size, color }) {
  return (
    <div className="loading">
      <AiOutlineLoading size={size} color={color} />
    </div>
  );
}
