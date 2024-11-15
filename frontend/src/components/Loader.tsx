import { Spinner } from "react-bootstrap";

interface LoaderProps {
  size?: number; // Optional size prop
  color?: string; // Optional color prop
}

const Loader = ({ size = 100, color = "primary" }: LoaderProps) => {
  return (
    <Spinner
      animation="border"
      role="status"
      aria-live="assertive"
      variant={color}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        margin: "auto",
        display: "block",
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Loader;
