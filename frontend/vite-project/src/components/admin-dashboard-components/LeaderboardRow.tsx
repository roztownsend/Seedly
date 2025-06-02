import { LeaderboardRowProps } from "../../types/adminDashboardTypes";

function LeaderBoardRow({
  productName,
  revenue,
  unitsSold,
  index,
}: LeaderboardRowProps) {
  return (
    <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="col-span-1 flex items-center">
        <span className="text-gray-600 font-bold">{index + 1}</span>
      </div>

      <div className="col-span-6 flex items-center">
        <span className="text-gray-800 font-bold">{productName}</span>
      </div>

      <div className="col-span-3 flex items-center justify-center">
        <span className="text-gray-700 font-bold">{unitsSold}</span>
      </div>

      <div className="col-span-2 flex items-center justify-end">
        <span className="text-gray-700 font-bold">{revenue} kr</span>
      </div>
    </div>
  );
}

export default LeaderBoardRow;
