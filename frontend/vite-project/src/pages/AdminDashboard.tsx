import { useAuthActions } from "../stores/authStore";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import AnalyticsCard from "../components/admin-dashboard-components/AnalyticsCard";
import { SalesData } from "../types/adminDashboardTypes";
import AdminDashboardHome from "../components/admin-dashboard-components/AdminDashboardHome";
import { useState } from "react";
import LeaderBoardComponent from "../components/admin-dashboard-components/LeaderboardComponent";
import { TopPlants } from "../types/adminDashboardTypes";
function AdminDashboard() {
  const { signOutUser } = useAuthActions();
  const { getSales } = useAdminDashboard();
  const [salesData, setSalesData] = useState<SalesData[]>();
  const [topPlants, setTopPlants] = useState<TopPlants[]>();

  const handleSalesData = async () => {
    const data = await getSales();
    if (data) {
      setSalesData(data.generalInfo);
      setTopPlants(data.topPlants);
    }
  };

  return (
    <>
      <section className="flex flex-col w-full  justify-between">
        <div className="flex flex-col items-center">
          <h3>Seedly</h3>
          <h4>Admin Dashboard</h4>
        </div>
        {!salesData && <AdminDashboardHome />}
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

        <button onClick={handleSalesData}>Log sales</button>
        <button onClick={signOutUser}>Logout</button>
      </section>
    </>
  );
}

export default AdminDashboard;
