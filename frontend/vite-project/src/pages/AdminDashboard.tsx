import { useAuthUser, useAuthActions } from "../stores/authStore";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
function AdminDashboard() {
  const { signOutUser } = useAuthActions();
  const user = useAuthUser();
  const { getSales } = useAdminDashboard();
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          <h3>Welcome to the Seedly Admin Dashboard </h3>
          <h4>{user?.email}</h4>
          <div className="flex gap-4 mb-3">
            <button
              onClick={getSales}
              className="bg-green-600 text-white p-2 w-32 rounded-lg font-bold"
            >
              Sales
            </button>
            <button className="bg-white w-32 rounded-lg p-2 font-bold">
              Users
            </button>
          </div>
          <div className="flex gap-4">
            <button className="bg-green-600 text-white p-2 w-32 rounded-lg font-bold">
              Today
            </button>
            <button className="bg-white w-32 rounded-lg p-2 font-bold">
              This week
            </button>
          </div>
        </div>

        <button onClick={signOutUser}>Logout</button>
      </div>
    </>
  );
}

export default AdminDashboard;
