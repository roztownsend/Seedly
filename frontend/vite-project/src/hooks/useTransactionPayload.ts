import { useCartTotal, useCartQuantitiesTotal } from "../stores/cartStore";
import { useAuthUser, useAuthLoading } from "../stores/authStore";
import { useSelectedShippingOption } from "../stores/shippingOptionStore";

export type TransactionPayload = {
  userId: string;
  totalItems: number;
  shippingPrice: number;
  cartTotal: number;
  totalAmount: number;
};

export const useTransactionPayload = (): TransactionPayload | null => {
  const loading = useAuthLoading();
  const user = useAuthUser();
  const userId = user?.id;
  const totalItems = useCartQuantitiesTotal();
  const shippingSelection = useSelectedShippingOption();
  const shippingPriceString = shippingSelection?.price;
  const shippingPrice = shippingPriceString ? parseFloat(shippingPriceString) : NaN;
  const cartTotal = useCartTotal();
  
  if (
    loading || 
    typeof userId !== "string"
  ) { 
    console.log("Transaction data is incomplete.")
    return null;
  };

  const totalAmount = cartTotal + shippingPrice;

  if (!user) {
    console.log("Not signed in.");
    return null;
  }

  const transaction = {
    userId,
    totalItems,
    cartTotal,
    shippingPrice,
    totalAmount,
  };

  return transaction;
};
