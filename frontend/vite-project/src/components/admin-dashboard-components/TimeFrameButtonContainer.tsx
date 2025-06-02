import { useState } from "react";

type TimeFrameButtonsProps = {
  timeFrame: string;
  handleTimeFrameChange: (timeframe: "day" | "week" | "month") => void;
};

function TimeFrameButtons({
  timeFrame,
  handleTimeFrameChange,
}: TimeFrameButtonsProps) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const getButtonClass = (buttonType: string) => {
    const isActive = timeFrame === buttonType;
    const isHovered = hoveredButton === buttonType;
    const isAnyInactiveHovered = hoveredButton && hoveredButton !== timeFrame;

    const baseClass =
      "px-6 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 ease-out transform hover:scale-105 shadow-md hover:shadow-lg";

    if (isActive && !isAnyInactiveHovered) {
      return `${baseClass} bg-gradient-to-r from-green-500 to-green-600 text-white border-2 border-transparent shadow-green-200`;
    } else if (isActive && isAnyInactiveHovered) {
      return `${baseClass} bg-white text-gray-700 border-2 border-gray-300 shadow-gray-100 scale-95`;
    } else if (!isActive && isHovered) {
      return `${baseClass} bg-gradient-to-r from-green-500 to-green-600 text-white border-2 border-transparent shadow-green-200`;
    } else {
      return `${baseClass} bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-300 shadow-gray-100`;
    }
  };

  return (
    <div className="flex items-center gap-4 mt-4 mb-4">
      <button
        className={getButtonClass("day")}
        onMouseEnter={() => setHoveredButton("day")}
        onMouseLeave={() => setHoveredButton(null)}
        onClick={() => handleTimeFrameChange("day")}
      >
        Today's sales
      </button>
      <button
        className={getButtonClass("week")}
        onMouseEnter={() => setHoveredButton("week")}
        onMouseLeave={() => setHoveredButton(null)}
        onClick={() => handleTimeFrameChange("week")}
      >
        Weekly sales
      </button>
      <button
        className={getButtonClass("month")}
        onMouseEnter={() => setHoveredButton("month")}
        onMouseLeave={() => setHoveredButton(null)}
        onClick={() => handleTimeFrameChange("month")}
      >
        Monthly sales
      </button>
    </div>
  );
}

export default TimeFrameButtons;
