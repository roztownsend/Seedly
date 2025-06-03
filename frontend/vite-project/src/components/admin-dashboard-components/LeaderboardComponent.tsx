import LeaderBoardRow from "./LeaderboardRow";
import {
  LeaderboardProps,
  TopUsers,
  TopList,
  TopPlants,
} from "../../types/adminDashboardTypes";
import { memo } from "react";
import { FaBox } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";

function LeaderBoardComponent({ topList }: LeaderboardProps) {
  const isTopPlantList = (list: TopList[]): list is TopPlants[] => {
    return list.length > 0 && "productName" in list[0];
  };
  const isTopUserList = (list: TopList[]): list is TopUsers[] => {
    return list.length > 0 && "email" in list[0];
  };

  const renderHeader = () => {
    if (isTopPlantList(topList)) {
      return (
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
      );
    }
    if (isTopUserList(topList)) {
      return (
        <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-100 border-b items-center">
          <div className="col-span-1 text-gray-500 max-[781px]:text-xs max-[658px]:hidden text-base font-medium">
            #
          </div>
          <div className="col-span-3  text-gray-500 max-[781px]:text-xs text-base font-medium">
            USER EMAIL
          </div>
          <div className="col-span-3 text-gray-500 max-[781px]:text-xs text-base font-medium text-center">
            ORDERS
          </div>
          <div className="col-span-2 text-gray-500 max-[781px]:text-xs text-base font-medium text-right">
            TOTAL SPENT
          </div>
          <div className="col-span-3 text-gray-500 max-[781px]:text-xs text-base font-medium text-right">
            MEMBER SINCE
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="w-full px-4 py-6 mt-10 mb-10 max-w-[800px] min-h-[250px] bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl l  border-2 border-transparent">
        {isTopPlantList(topList) ? (
          <div
            className="flex mb-4 border-b-2 items-center gap-3
         "
          >
            <FaBox size={25} />
            <h3 className="mb-4">Top-Selling Products</h3>
          </div>
        ) : (
          <div
            className="flex mb-4 border-b-2 items-center gap-3
         "
          >
            <FaUserFriends size={30} />
            <h3 className="mb-4">Top Users</h3>
          </div>
        )}

        {renderHeader()}

        {isTopPlantList(topList) ? (
          topList.map((item, index) => (
            <LeaderBoardRow
              key={index}
              productName={item.productName}
              revenue={item.revenue}
              unitsSold={item.unitsSold}
              index={index}
            />
          ))
        ) : isTopUserList(topList) ? (
          topList.map((item, index) => (
            <LeaderBoardRow
              key={index}
              email={item.email}
              created_at={item.created_at}
              purchaseCount={item.purchaseCount}
              totalSpent={item.totalSpent}
              index={index}
            />
          ))
        ) : (
          <div>No data available</div>
        )}
      </div>
    </>
  );
}

export default memo(LeaderBoardComponent);
