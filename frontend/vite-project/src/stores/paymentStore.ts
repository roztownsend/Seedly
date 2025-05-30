import { create } from 'zustand';
import { PaymentFormTypes, PaymentState } from '../types/paymentFormTypes';

const usePaymentStore = create<PaymentState>((set) => ({
    formData: {
        cardholderName: '',
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvc: '',
        saveCard: false,
        paymentMethod: 'card',
    },
    actions: {
        setFormData: (data) => set({ formData: data }),
        updateFormField: (key, value) =>
            set((state) => ({
                formData: {
                    ...state.formData,
                    [key]: value,
                },
            })),
    }
}));

export const useFormData = () => usePaymentStore((state) => state.formData);
export const usePaymentActions = () => usePaymentStore((state) => state.actions)