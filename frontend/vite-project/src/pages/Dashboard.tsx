import { useAuthStore } from "../stores/authStore";

function Dashboard() {
  const { user, signOutUser } = useAuthStore();
  return (
    <>
      <h1>Welcome to the Dashboard {user?.email}</h1>
      <button onClick={signOutUser}>Logout</button>
    </>
  );
}

export default Dashboard;
