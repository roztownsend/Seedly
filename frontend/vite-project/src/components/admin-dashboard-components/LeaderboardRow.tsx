import { LeaderboardRowProps } from "../../types/adminDashboardTypes";

function LeaderBoardRow({
  productName,
  revenue,
  unitsSold,
  index,
}: LeaderboardRowProps) {
  return (
    <>
      <div className="flex w-full justify-between">
        <div className="flex gap-3">
          <h4>{index + 1}</h4>
          <h4>{productName}</h4>
        </div>
        <h4>{unitsSold}</h4>
        <h4>{revenue}kr</h4>
      </div>
    </>
  );
}

export default LeaderBoardRow;
