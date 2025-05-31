import { useCartItems, useCartTotal, CartItem } from "../stores/cartStore";
import { useShippingStore } from "../stores/shippingStore";
import { useSelection } from "../stores/shippingOptionStore";
import { GetAllOptions } from "../types/shippingOptionTypes";
import { useFormData } from "../stores/paymentStore";
import { PaymentFormTypes } from "../types/paymentFormTypes";
import { ShippingFormTypes } from "../types/shippingFormTypes";
import { useAuthUser, useAuthLoading } from "../stores/authStore";
import { CustomAuthUser } from "../types/authTypes";

export type TransactionPayload = {
    user: CustomAuthUser;
    cart: CartItem[];
    cartTotal: number;
    shippingFormData: ShippingFormTypes;
    shippingOption: GetAllOptions[number];
    paymentInfo: PaymentFormTypes;
};


export const useTransactionPayload = () => {
    const user = useAuthUser();
    const loading = useAuthLoading();
    const cart = useCartItems();
    const cartTotal = useCartTotal();
    const { formData: shippingFormData } = useShippingStore();
    const shippingOption = useSelection();
    const paymentInfo = useFormData();

    if (loading || !shippingOption) return null;

    if (!user) {
        console.log("Not signed in.");
        return null;
    };

    const transaction = {
        user, 
        cart, 
        cartTotal, 
        shippingFormData, 
        shippingOption, 
        paymentInfo
    };

    return transaction;
};