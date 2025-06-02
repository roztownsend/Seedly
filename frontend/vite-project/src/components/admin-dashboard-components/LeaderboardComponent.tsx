import LeaderBoardRow from "./LeaderboardRow";
import { LeaderboardProps } from "../../types/adminDashboardTypes";
import { memo } from "react";
import { FaBox } from "react-icons/fa";

function LeaderBoardComponent({ topPlants }: LeaderboardProps) {
  return (
    <>
      <div className="w-full px-4 py-6 mt-10 mb-10 max-w-[800px] min-h-[250px] bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl l  border-2 border-transparent">
        <div
          className="flex mb-4 border-b-2 items-center gap-3
         "
        >
          <FaBox size={25} />
          <h3 className="mb-4">Top-Selling Products</h3>
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

export default memo(LeaderBoardComponent);
