import LeaderBoardRow from "./LeaderboardRow";
import { LeaderboardProps } from "../../types/adminDashboardTypes";
function LeaderBoardComponent({ topPlants }: LeaderboardProps) {
  return (
    <>
      <div className="w-full max-w-[800px] min-h-[250px] bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer group border-2 border-transparent hover:border-green-300 transform hover:-translate-y-2">
        {topPlants.map((plant, index) => (
          <LeaderBoardRow
            key={index}
            productName={plant.productName}
            revenue={plant.revenue}
            unitsSold={plant.unitsSold}
            index={index}
          />
        ))}
      </div>
    </>
  );
}

export default LeaderBoardComponent;
