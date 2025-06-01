import { useCartTotal, useCartItems, useCartQuantitiesTotal } from "../stores/cartStore";
import { useAuthUser, useAuthLoading } from "../stores/authStore";
import { useSelectedShippingOption } from "../stores/shippingOptionStore";
import { useFormData } from "../stores/paymentStore";
import { useShippingFormData } from "../stores/shippingStore";

export type TransactionPayload = {
  userId: string;
  totalItems: number;
  shippingPrice: number;
  totalAmount: number;
  purchaseItems: PurchaseItemsPayloadData[];
  paymentMethod: string; 
  shippingInfo: ShippingPayloadData;
};

export type PurchaseItemsPayloadData = {
  quantity: number;
  plantId: string;
}

export type ShippingPayloadData = {
    name: string;
    email: string;
    address: string;
    apartment?: string;
    postalCode: string;
    city: string;
}


export const useTransactionPayload = (): TransactionPayload | null => {
  const loading = useAuthLoading();
  const user = useAuthUser();
  const userId = user?.id;
  const totalItems = useCartQuantitiesTotal();
  const shippingSelection = useSelectedShippingOption();
  const shippingPriceString = shippingSelection?.price;
  const shippingPrice = shippingPriceString ? parseFloat(shippingPriceString) : NaN;
  const cartTotal = useCartTotal();
  const totalAmount = cartTotal + shippingPrice;

  const purchaseItemsArray = () => {
    const items = useCartItems();
    const mappedItems = items.map((product) => ({ quantity: product.quantity, plantId: product.id }));
    return mappedItems;
  };
  
  const purchaseItems = purchaseItemsArray();

  const paymentData = useFormData();
  const paymentMethod = paymentData.paymentMethod;

  const shippingForm = useShippingFormData();

  const shippingInfo = {
    name: shippingForm.name,
    email: shippingForm.email,
    address: shippingForm.address,
    apartment: shippingForm.apartment,
    postalCode: shippingForm.postalCode,
    city: shippingForm.city,
  };

  if (
    loading || 
    typeof userId !== "string" ||
    typeof paymentMethod !== "string"
  ) { 
    console.log("Transaction data is incomplete.")
    return null;
  };


  if (!user) {
    console.log("Not signed in.");
    return null;
  }

  const transaction = {
    userId,
    totalItems,
    shippingPrice,
    totalAmount,
    purchaseItems,
    paymentMethod,
    shippingInfo,
  };

  return transaction;
};
