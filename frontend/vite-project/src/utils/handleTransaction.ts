import { TransactionPayload } from "./useTransactionPayload";
import axios from "axios";

export const handleTransaction = async (
  payload: TransactionPayload,
  token: string | undefined
) => {
  if (!payload) {
    console.log("No transaction payload or problem with user authentication!");
    return;
  }

  let endpoint: string;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
    endpoint = "purchase/user";
  } else {
    endpoint = "purchase/anon-user";
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/${endpoint}`,
      payload,
      {
        method: "POST",
        headers,
      }
    );
    console.log("Transaction complete", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Transaction failed");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred");
    }
  }
};
