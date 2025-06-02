import axios from "axios";
import { useAuthSession } from "../stores/authStore";
import { SalesDataResponse } from "../types/adminDashboardTypes";

export const useAdminDashboard = () => {
  const session = useAuthSession();

  const getTodaysSales = async () => {
    try {
      const response = await axios.get<SalesDataResponse>(
        "http://localhost:5000/admin/sales/month",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch todays sales", error);
    }
  };
  return {
    getSales: getTodaysSales,
  };
};
