import { LeaderboardRowProps } from "../../types/adminDashboardTypes";

function LeaderBoardRow({
  productName,
  revenue,
  unitsSold,
  index,
}: LeaderboardRowProps) {
  return (
    <>
      <div className="col-span-1 flex items-center">
        <span className="text-gray-600 font-medium">{index + 1}</span>
      </div>

      <div className="col-span-6 flex items-center">
        <span className="text-gray-800 font-medium">{productName}</span>
      </div>

      <div className="col-span-3 flex items-center justify-center">
        <span className="text-gray-700">{unitsSold}</span>
      </div>

      <div className="col-span-2 flex items-center justify-end">
        <span className="text-gray-800 font-medium">{revenue}kr</span>
      </div>
    </>
  );
}

export default LeaderBoardRow;
