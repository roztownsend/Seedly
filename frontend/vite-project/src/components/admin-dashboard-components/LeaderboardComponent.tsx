import LeaderBoardRow from "./LeaderboardRow";
import { LeaderboardProps } from "../../types/adminDashboardTypes";
function LeaderBoardComponent({ topPlants }: LeaderboardProps) {
  return (
    <>
      <div className="w-full p-4 mt-10 mb-10 max-w-[800px] min-h-[250px] bg-white/90 backdrop-blur-sm rounded-3xl  shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer group border-2 border-transparent">
        <div className="flex mb-2 border-b-2 p-3">
          <h3>Top-Selling Products</h3>
        </div>
        <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-100 border-b">
          <div className="col-span-1 text-gray-500 text-base font-medium">
            #
          </div>
          <div className="col-span-6 text-gray-500 text-base font-medium">
            PRODUCT NAME
          </div>
          <div className="col-span-3 text-gray-500 text-base font-medium text-center">
            UNITS SOLD
          </div>
          <div className="col-span-2 text-gray-500 text-base font-medium text-right">
            REVENUE
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
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
      </div>
    </>
  );
}

export default LeaderBoardComponent;
