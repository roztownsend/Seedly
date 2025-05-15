import { create } from 'zustand';
import { PaymentFormTypes, PaymentState } from '../types/paymentFormTypes';

export const usePaymentStore = create<PaymentState>((set) => ({
    formData: {
        cardholderName: '',
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvc: '',
        saveCard: false,
    },
    setFormData: (data) => set({ formData: data }),
    updateFormField: (key, value) =>
        set((state) => ({
            formData: {
                ...state.formData,
                [key]: value,
            },
        })),
}));