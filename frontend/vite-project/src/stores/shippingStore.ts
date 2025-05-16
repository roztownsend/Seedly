import { create } from 'zustand';
import { ShippingFormTypes } from '../types/shippingFormTypes'

interface ShippingState {
  formData: ShippingFormTypes;
  actions: ShippingActions
}

const useShippingStore = create<ShippingState>((set) => ({
  formData: {
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    postalCode: '',
    city: '',
    saveContact: false,
  },
  actions:{
   setFormData: (data) => set({ formData: data }),
  updateFormField: (key, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [key]: value,
      },
  }
 
    })),
}));
export const useFormData = () => useShippingStore((state) => state.formData);
export const useShippingActions = () => useShippingStore((state) => state.actions);
