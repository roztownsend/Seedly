import { ReactNode } from "react";
import {
  useAuthLoading,
  useAuthUser,
  useIsAdmin,
} from "../../stores/authStore";
import { Navigate } from "react-router-dom";
type PrivateRouteProps = {
  children: ReactNode;
};

function AdminRoute({ children }: PrivateRouteProps) {
  const user = useAuthUser();
  const isLoading = useAuthLoading();
  const isAdmin = useIsAdmin();

  if (isLoading) {
    return <div>Loading Admin Access....</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return <>{children}</>;
}

export default AdminRoute;
