import { ReactNode } from "react";
import { useAuthStore } from "../../stores/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
type PrivateRouteProps = {
  children: ReactNode;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      console.log("PrivateRoute: auth state is loading", isLoading);
      return;
    }
    if (!user || user?.is_anonymous) {
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

  if (user && !user.is_anonymous) {
    return <>{children}</>;
  }
  return null;
}

export default PrivateRoute;
