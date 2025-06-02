import { useAuthUser, useAuthActions } from "../stores/authStore";

function TestDashboard() {
  const { signOutUser } = useAuthActions();
  const user = useAuthUser();
  return (
    <>
      <h1>Welcome to the Dashboard {user?.email}</h1>
      <button onClick={signOutUser}>Logout</button>
    </>
  );
}

export default TestDashboard;
