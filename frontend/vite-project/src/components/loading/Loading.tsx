import "./loading.css";
import { FaHourglassHalf } from "react-icons/fa";

export const Loading: React.FC = () => {
    return (
      <div className="loading-state">
        <FaHourglassHalf className="state-icon animate-pulse" />
        <p className="status-text state-message">Loading...</p>
      </div>
    )
};