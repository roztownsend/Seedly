import { useAuthUser, useAuthActions } from "../stores/authStore";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import AnalyticsCard from "../components/admin-dashboard-components/AnalyticsCard";

import AdminDashboardHome from "../components/admin-dashboard-components/AdminDashboardHome";
import { useState } from "react";
function AdminDashboard() {
  const { signOutUser } = useAuthActions();
  const user = useAuthUser();
  const { getSales } = useAdminDashboard();
  const [salesData, setSalesData] = useState([]);

  const handleSalesData = async () => {
    const data = await getSales();
    setSalesData(data);
  };

  return (
    <>
      <section className="flex flex-col w-full  justify-between">
        <div className="flex flex-col items-center">
          <h3>Seedly</h3>
          <h4>Admin Dashboard</h4>
        </div>
        <AnalyticsCard />

        <button onClick={async () => await getSales()}>Log sales</button>
        <button onClick={signOutUser}>Logout</button>
      </section>
    </>
  );
}

export default AdminDashboard;
