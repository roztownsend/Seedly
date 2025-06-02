import { useAuthActions } from "../stores/authStore";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import { SalesData } from "../types/adminDashboardTypes";
import { useState } from "react";
import {
  TopPlants,
  SalesCachedData,
  SalesDataCahe,
} from "../types/adminDashboardTypes";
import AnalyticsCard from "../components/admin-dashboard-components/AnalyticsCard";
import TimeFrameButtons from "../components/admin-dashboard-components/TimeFrameButtonContainer";
import AdminDashboardHome from "../components/admin-dashboard-components/AdminDashboardHome";
import LeaderBoardComponent from "../components/admin-dashboard-components/LeaderboardComponent";
function AdminDashboard() {
  const { signOutUser } = useAuthActions();
  const { getSales } = useAdminDashboard();
  const [dataCache, setDataCahe] = useState<SalesDataCahe>({});
  const [salesData, setSalesData] = useState<SalesData[]>();
  const [topPlants, setTopPlants] = useState<TopPlants[]>();
  const [timeFrame, setTimeFrame] = useState<string>("day");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const currentData = dataCache[timeFrame as keyof SalesDataCahe];

  const handleSalesData = async (
    timeframePara: "day" | "week" | "month",
    forceRefresh: boolean = false
  ) => {
    if (dataCache[timeframePara] && !forceRefresh) {
      return;
    }

    if (forceRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    try {
      const data = await getSales(timeframePara);
      if (data) {
        setDataCahe((prevState) => ({
          ...prevState,
          [timeframePara]: {
            generalInfo: data.generalInfo,
            topPlants: data.topPlants,
          },
        }));
      }
    } catch (error) {
      console.error("Failed to fetch sales data:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
      console.log(dataCache);
    }
  };
  const handleTimeFrameChange = async (timeframe: "day" | "week" | "month") => {
    setTimeFrame(timeframe);
    await handleSalesData(timeframe);
  };

  const handleInitialLoad = async (timeframe: "day" | "week" | "month") => {
    setTimeFrame(timeframe);
    await handleSalesData(timeframe);
  };

  return (
    <>
      <section className="flex flex-col w-full items-center  justify-between">
        <div className="flex flex-col items-center">
          <h3>Seedly</h3>
          <h4>Admin Dashboard</h4>
        </div>
        {currentData && (
          <TimeFrameButtons
            handleTimeFrameChange={handleTimeFrameChange}
            timeFrame={timeFrame}
            isLoading={isLoading}
          />
        )}

        {!currentData && !isLoading && (
          <AdminDashboardHome handleInitialLoad={handleInitialLoad} />
        )}
        {currentData &&
          currentData.generalInfo.map((data, index) => (
            <AnalyticsCard
              key={index}
              title={data.title}
              type={data.type}
              value={data.value}
            />
          ))}
        {currentData && currentData.topPlants && (
          <LeaderBoardComponent topPlants={currentData.topPlants} />
        )}

        <button onClick={signOutUser}>Logout</button>
      </section>
    </>
  );
}

export default AdminDashboard;
