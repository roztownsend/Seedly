import { create } from 'zustand';
import { ShippingFormTypes } from '../types/shippingFormTypes';

interface ShippingState {
  formData: ShippingFormTypes;
  submittedData: ShippingFormTypes | null;
  setFormData: (data: ShippingFormTypes) => void;
  updateFormField: <K extends keyof ShippingFormTypes>(key: K, value: ShippingFormTypes[K]) => void;
  resetForm: () => void;
  saveSubmission: () => void;
}

const emptyForm: ShippingFormTypes = {
  name: '',
  email: '',
  address: '',
  apartment: '',
  postalCode: '',
  city: '',
  saveContact: false,
};

export const useShippingStore = create<ShippingState>((set, get) => ({
  formData: { ...emptyForm },
  submittedData: null,

  setFormData: (data) => set({ formData: data }),

  updateFormField: (key, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [key]: value,
      },
    })),

  resetForm: () => set({ formData: { ...emptyForm } }),

  saveSubmission: () => set({ submittedData: get().formData }),
}));

export const useShippingFormData = () => useShippingStore((state) => state.formData);