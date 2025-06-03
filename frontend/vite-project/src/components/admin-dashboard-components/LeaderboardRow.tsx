import { LeaderboardRowProps } from "../../types/adminDashboardTypes";
import { formatPurchaseDate } from "../../utils/formatPurchaseDate";
function LeaderBoardRow(props: LeaderboardRowProps) {
  const { index } = props;

  const isPlant = "productName" in props;

  return isPlant ? (
    <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="col-span-1 flex items-center">
        <span className="text-gray-600 font-bold">{index + 1}</span>
      </div>

      <div className="col-span-6 max-[662px]:col-span-2 flex  items-center">
        <span className="text-gray-800 font-bold">{props.productName}</span>
      </div>

      <div className="col-span-3 flex items-center justify-center">
        <span className="text-gray-700 font-bold">{props.unitsSold}</span>
      </div>

      <div className="col-span-2 flex items-center justify-end">
        <span className="text-gray-700 font-bold">{props.revenue} kr</span>
      </div>
    </div>
  ) : (
    <div className="grid grid-cols-12  gap-4 px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="col-span-1 flex items-center max-[658px]:hidden">
        <span className="text-gray-600 font-bold">{index + 1}</span>
      </div>

      <div className="col-span-3 flex items-center">
        <span className="text-gray-800 text-xs font-bold">{props.email}</span>
      </div>

      <div className="col-span-3 flex items-center justify-center">
        <span className="text-gray-700 font-bold">{props.purchaseCount}</span>
      </div>

      <div className="col-span-2 max-[658px]:col-span-3 flex items-center justify-end">
        <span className="text-gray-700 font-bold">{props.totalSpent} kr</span>
      </div>
      <div className="col-span-3  flex items-center justify-end">
        <span className="text-gray-700 font-bold">
          {formatPurchaseDate(props.created_at)}
        </span>
      </div>
    </div>
  );
}

export default LeaderBoardRow;
