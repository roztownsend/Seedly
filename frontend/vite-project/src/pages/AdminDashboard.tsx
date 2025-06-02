import { useAuthActions } from "../stores/authStore";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import { useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { SalesDataCahe } from "../types/adminDashboardTypes";
import { ClipLoader } from "react-spinners";
import AnalyticsCard from "../components/admin-dashboard-components/AnalyticsCard";
import TimeFrameButtons from "../components/admin-dashboard-components/TimeFrameButtonContainer";
import AdminDashboardHome from "../components/admin-dashboard-components/AdminDashboardHome";
import LeaderBoardComponent from "../components/admin-dashboard-components/LeaderboardComponent";
import logoImage from "../assets/image/order-confirmation.png";
function AdminDashboard() {
  const { signOutUser } = useAuthActions();
  const { getSales, getUsers } = useAdminDashboard();
  const [dataCache, setDataCahe] = useState<SalesDataCahe>({});
  const [timeFrame, setTimeFrame] = useState<string>("day");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const currentData = dataCache[timeFrame as keyof SalesDataCahe];

  const handleUsersData = async () => {
    const userData = await getUsers();
    console.log(userData);
  };

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
  const handleRefresh = async () => {
    await handleSalesData(timeFrame as "day" | "week" | "month", true);
  };
  return (
    <>
      <section className="flex flex-col w-full items-center  justify-between">
        <div className="flex flex-col w-full max-w-[450px] items-center py-8 px-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 shadow-sm mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-white shadow-lg ring-4 ring-green-100 mb-4">
            <img
              src={logoImage}
              alt="seedly logo cat"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-700 tracking-wide">
              Admin Dashboard
            </h2>
          </div>
        </div>
        {currentData && (
          <div className="flex items-center gap-4 mb-4">
            <TimeFrameButtons
              timeFrame={timeFrame}
              handleTimeFrameChange={handleTimeFrameChange}
              isLoading={isLoading}
            />
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex tracking-wide items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {!isRefreshing ? (
                <IoMdRefresh size={20} />
              ) : (
                <ClipLoader color="white" size={15} />
              )}

              {isRefreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
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
        {isLoading && !currentData && (
          <div className="flex items-center flex-col gap-4 py-12">
            <h2 className="text-xl font-semibold text-gray-700 tracking-wide">
              Loading Sales...
            </h2>
            <ClipLoader color="#22c55e" size={32} />
          </div>
        )}
        <button onClick={handleUsersData}>Log user data</button>
        <button onClick={signOutUser}>Logout</button>
      </section>
    </>
  );
}

export default AdminDashboard;
