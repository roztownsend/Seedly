import { useAuthUser, useAuthActions } from "../stores/authStore";

function AdminDashboard() {
  const { signOutUser } = useAuthActions();
  const user = useAuthUser();
  return (
    <>
      <h1>Welcome to the Admin Dashboard {user?.email}</h1>
      <button onClick={signOutUser}>Logout</button>
    </>
  );
}

export default AdminDashboard;
