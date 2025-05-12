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
    if (!isLoading && !user) {
      navigate("login");
    }
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
}

export default PrivateRoute;
