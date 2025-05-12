import { useAuthStore } from "../stores/authStore";

function Dashboard() {
  const { user } = useAuthStore();
  return (
    <>
      <h1>Welcome to the Dashboard {user?.email}</h1>
      <button>Logout</button>
    </>
  );
}

export default Dashboard;
