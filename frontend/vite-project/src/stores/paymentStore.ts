import { create } from 'zustand';
import { PaymentFormTypes } from '../types/paymentFormTypes';

interface PaymentState {
    formData: PaymentFormTypes;
    setFormData: (data: PaymentFormTypes) => void;
    updateFormField: <K extends keyof PaymentFormTypes>(key: K, value: PaymentFormTypes[K]) => void;
}

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