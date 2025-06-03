import { LeaderboardRowProps } from "../../types/adminDashboardTypes";
import { formatPurchaseDate } from "../../utils/formatPurchaseDate";
function LeaderBoardRow(props: LeaderboardRowProps) {
  const { index } = props;

  const isPlant = "productName" in props;

  return isPlant ? (
    <div className="grid grid-cols-12 gap-2 sm:gap-4 px-2 sm:px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="col-span-1 flex items-center">
        <span className="text-gray-600 font-bold text-sm">{index + 1}</span>
      </div>

      <div className="col-span-7 sm:col-span-6 flex items-center">
        <span className="text-gray-800 font-bold text-sm truncate">
          {props.productName}
        </span>
      </div>

      <div className="col-span-2 sm:col-span-3 flex items-center justify-center">
        <span className="text-gray-700 font-bold text-sm">
          {props.unitsSold}
        </span>
      </div>

      <div className="col-span-2 flex items-center justify-end">
        <span className="text-gray-700 font-bold text-sm">
          {props.revenue} kr
        </span>
      </div>
    </div>
  ) : (
    <div className="grid grid-cols-12 gap-2 sm:gap-4 px-2 sm:px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="hidden sm:flex col-span-1 items-center">
        <span className="text-gray-600 text-xs font-bold">{index + 1}</span>
      </div>

      <div className="col-span-4 sm:col-span-3 flex items-center">
        <span className="text-gray-800 text-xs font-bold truncate pr-1">
          {props.email}
        </span>
      </div>

      <div className="col-span-2 sm:col-span-3 flex items-center justify-center">
        <span className="text-gray-700 text-xs font-bold">
          {props.purchaseCount}
        </span>
      </div>

      <div className="col-span-3 sm:col-span-2 flex items-center justify-center sm:justify-end">
        <span className="text-gray-700 text-xs font-bold">
          {props.totalSpent} kr
        </span>
      </div>

      <div className="col-span-3 sm:col-span-3 flex items-center justify-end">
        <span className="text-gray-700 text-xs font-bold text-right">
          <span className="hidden sm:inline">
            {formatPurchaseDate(props.created_at)}
          </span>
          <span className="sm:hidden">
            {formatPurchaseDate(props.created_at).split(" ")[0]}
          </span>
        </span>
      </div>
    </div>
  );
}

export default LeaderBoardRow;
