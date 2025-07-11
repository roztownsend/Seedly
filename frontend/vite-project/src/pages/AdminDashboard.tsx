import { useAuthActions } from "../stores/authStore";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import { useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { SalesDataCache } from "../types/adminDashboardTypes";
import { UsersDataCache } from "../types/adminDashboardTypes";
import { ClipLoader } from "react-spinners";
import AnalyticsCard from "../components/admin-dashboard-components/AnalyticsCard";
import TimeFrameButtons from "../components/admin-dashboard-components/TimeFrameButtonContainer";
import AdminDashboardHome from "../components/admin-dashboard-components/AdminDashboardHome";
import LeaderBoardComponent from "../components/admin-dashboard-components/LeaderboardComponent";
import logoImage from "../assets/image/order-confirmation.png";
import { MdHome } from "react-icons/md";

function AdminDashboard() {
  const { signOutUser } = useAuthActions();
  const { getSales, getUsers } = useAdminDashboard();
  const [salesDataCache, setSalesDataCache] = useState<SalesDataCache>({});
  const [userDataCache, setUserDataCache] = useState<UsersDataCache>({});
  const [timeFrame, setTimeFrame] = useState<string>("day");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [page, setPage] = useState<"sales" | "users" | "">("");

  const currentSalesData = salesDataCache[timeFrame as keyof SalesDataCache];
  const currentUsersData = userDataCache[timeFrame as keyof UsersDataCache];

  const hasData = currentSalesData || currentUsersData;
  const handleUsersData = async (
    timeframePara: "day" | "week" | "month",
    forceRefresh: boolean = false
  ) => {
    if (userDataCache[timeframePara] && !forceRefresh) {
      return;
    }

    if (forceRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    try {
      const data = await getUsers(timeframePara);
      if (data) {
        setUserDataCache((prevState) => ({
          ...prevState,
          [timeframePara]: {
            generalInfo: data.generalInfo,
            topUsers: data.topUsers,
          },
        }));
      }
    } catch (error) {
      console.error("Failed to fetch sales data:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
      console.log(currentUsersData);
    }
  };

  const handleSalesData = async (
    timeframePara: "day" | "week" | "month",
    forceRefresh: boolean = false
  ) => {
    if (salesDataCache[timeframePara] && !forceRefresh) {
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
        setSalesDataCache((prevState) => ({
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
    }
  };
  const handleTimeFrameChange = async (timeframe: "day" | "week" | "month") => {
    setTimeFrame(timeframe);
    if (page === "sales") {
      await handleSalesData(timeframe);
    } else if (page === "users") {
      await handleUsersData(timeframe);
    }
  };

  const handleInitialLoad = async (
    timeframe: "day" | "week" | "month",
    page: "sales" | "users"
  ) => {
    setPage(page);
    setTimeFrame(timeframe);
    if (page === "sales") {
      await handleSalesData(timeframe);
    } else if (page === "users") {
      await handleUsersData(timeframe);
    }
  };
  const handleRefresh = async () => {
    await handleSalesData(timeFrame as "day" | "week" | "month", true);
  };

  const resetDashboard = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPage("");
      setIsLoading(false);
      setSalesDataCache({});
      setUserDataCache({});
    }, 100);
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
        {hasData && page && (
          <div className="flex flex-col flex-wrap sm:flex-row items-center gap-3 sm:gap-4 mb-4 justify-center w-full">
            <button
              onClick={resetDashboard}
              className="flex tracking-wide items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-200   justify-center"
            >
              <MdHome size={20} />
              Dashboard
            </button>

            <div className="w-full sm:w-auto flex justify-center">
              <TimeFrameButtons
                timeFrame={timeFrame}
                handleTimeFrameChange={handleTimeFrameChange}
                isLoading={isLoading}
              />
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex tracking-wide items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200  justify-center"
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

        {!page && !isLoading && (
          <AdminDashboardHome handleInitialLoad={handleInitialLoad} />
        )}
        {page === "users" &&
          currentUsersData &&
          currentUsersData.generalInfo.map((data, index) => (
            <AnalyticsCard
              key={index}
              title={data.title}
              type={data.type}
              value={data.value}
            />
          ))}
        {page === "sales" &&
          currentSalesData &&
          currentSalesData.generalInfo.map((data, index) => (
            <AnalyticsCard
              key={index}
              title={data.title}
              type={data.type}
              value={data.value}
            />
          ))}
        {page === "sales" && currentSalesData && currentSalesData.topPlants && (
          <LeaderBoardComponent topList={currentSalesData.topPlants} />
        )}

        {page === "users" && currentUsersData && currentUsersData.topUsers && (
          <LeaderBoardComponent topList={currentUsersData.topUsers} />
        )}

        {isLoading && !hasData && (
          <div className="flex items-center flex-col gap-4 py-12">
            <h2 className="text-xl font-semibold text-gray-700 tracking-wide">
              Loading Sales...
            </h2>
            <ClipLoader color="#22c55e" size={32} />
          </div>
        )}
      </section>
    </>
  );
}

export default AdminDashboard;
