import axios from "axios";
import { useAuthSession } from "../stores/authStore";
import {
  SalesDataResponse,
  UsersDataResponse,
} from "../types/adminDashboardTypes";

export const useAdminDashboard = () => {
  const session = useAuthSession();
  const baseUrl: string = import.meta.env.VITE_API_URL || "";
  const getSales = async (timeframe: "day" | "week" | "month") => {
    try {
      const response = await axios.get<SalesDataResponse>(
        `${baseUrl}/admin/sales/${timeframe}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Failed to fetch todays sales", error);
    }
  };

  const getUsers = async (timeframe: "day" | "week" | "month") => {
    try {
      const response = await axios.get<UsersDataResponse>(
        `${baseUrl}/admin/users/${timeframe}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Failed to fetch todays sales", error);
    }
  };
  return {
    getSales,
    getUsers,
  };
};
