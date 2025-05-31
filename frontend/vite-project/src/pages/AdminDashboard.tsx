import { useAuthUser, useAuthActions } from "../stores/authStore";
import { useAdminDashboard } from "../hooks/useAdminDashboard";

import AdminDashboardHome from "../components/admin-dashboard-components/AdminDashboardHome";
function AdminDashboard() {
  const { signOutUser } = useAuthActions();
  const user = useAuthUser();
  const { getSales } = useAdminDashboard();
  return (
    <>
      <section className="flex flex-col w-full  justify-between">
        <div className="flex flex-col items-center">
          <h3>Seedly</h3>
          <h4>Admin Dashboard</h4>
        </div>
        <AdminDashboardHome />

        <button onClick={signOutUser}>Logout</button>
      </section>
    </>
  );
}

export default AdminDashboard;
