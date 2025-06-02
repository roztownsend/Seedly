import { useAuthActions } from "../stores/authStore";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import AnalyticsCard from "../components/admin-dashboard-components/AnalyticsCard";
import { SalesData } from "../types/adminDashboardTypes";
import AdminDashboardHome from "../components/admin-dashboard-components/AdminDashboardHome";
import { useState } from "react";
import LeaderBoardComponent from "../components/admin-dashboard-components/LeaderboardComponent";
import { TopPlants } from "../types/adminDashboardTypes";
import TimeFrameButtons from "../components/admin-dashboard-components/TimeFrameButtonContainer";
function AdminDashboard() {
  const { signOutUser } = useAuthActions();
  const { getSales } = useAdminDashboard();
  const [salesData, setSalesData] = useState<SalesData[]>();
  const [topPlants, setTopPlants] = useState<TopPlants[]>();
  const [timeFrame, setTimeFrame] = useState<string>("day");
  const handleSalesData = async (timeframe: "day" | "week" | "month") => {
    const data = await getSales(timeframe);
    if (data) {
      setSalesData(data.generalInfo);
      setTopPlants(data.topPlants);
    }
  };
  const handleTimeFrameChange = (timeframe: "day" | "week" | "month") => {
    handleSalesData(timeframe);
    setTimeFrame(timeframe);
  };

  return (
    <>
      <section className="flex flex-col w-full items-center  justify-between">
        <div className="flex flex-col items-center">
          <h3>Seedly</h3>
          <h4>Admin Dashboard</h4>
        </div>
        {salesData && (
          <TimeFrameButtons
            handleTimeFrameChange={handleTimeFrameChange}
            timeFrame={timeFrame}
          />
        )}

        {!salesData && <AdminDashboardHome handleSalesData={handleSalesData} />}
        {salesData &&
          salesData.map((data, index) => (
            <AnalyticsCard
              key={index}
              title={data.title}
              type={data.type}
              value={data.value}
            />
          ))}
        {topPlants && <LeaderBoardComponent topPlants={topPlants} />}

        <button onClick={signOutUser}>Logout</button>
      </section>
    </>
  );
}

export default AdminDashboard;
