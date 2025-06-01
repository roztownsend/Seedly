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

  try {
    const response = await axios.post(
      "http://localhost:5000/purchase",
      payload,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
