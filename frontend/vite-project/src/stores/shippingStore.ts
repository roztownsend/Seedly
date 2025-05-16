import { create } from 'zustand';
import { ShippingFormTypes } from '../types/shippingFormTypes'

interface ShippingState {
  formData: ShippingFormTypes;
  setFormData: (data: ShippingFormTypes) => void;
  updateFormField: <K extends keyof ShippingFormTypes>(key: K, value: ShippingFormTypes[K]) => void;
}

export const useShippingStore = create<ShippingState>((set) => ({
  formData: {
    name: '',
    email: '',
    address: '',
    apartment: '',
    postalCode: '',
    city: '',
    saveContact: false,
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
