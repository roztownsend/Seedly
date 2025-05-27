import { ReactNode } from "react";
import { useAuthLoading, useAuthUser } from "../../stores/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
type PrivateRouteProps = {
  children: ReactNode;
};

function AdminRoute({ children }: PrivateRouteProps) {
  const user = useAuthUser();
  const isLoading = useAuthLoading();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      console.log("PrivateRoute: auth state is loading", isLoading);
      return;
    }
    if (user?.app_metadata.role !== "admin") {
      console.log(
        "PrivateRoute: No user found and loading completed redirecting to /login"
      );
      navigate("/login");
      return;
    }
  }, [user, navigate, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user && user.app_metadata.role === "admin") {
    return <>{children}</>;
  }
  return null;
}

export default AdminRoute;
