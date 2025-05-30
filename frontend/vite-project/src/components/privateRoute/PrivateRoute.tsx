import { ReactNode } from "react";
import { useAuthLoading, useAuthUser } from "../../stores/authStore";
import { Navigate } from "react-router-dom";
type PrivateRouteProps = {
  children: ReactNode;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  const user = useAuthUser();
  const isLoading = useAuthLoading();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }
  return <>{children}</>;
}

export default PrivateRoute;
