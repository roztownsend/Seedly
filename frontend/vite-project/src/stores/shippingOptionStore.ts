import { create } from 'zustand';
import { GetAllOptions } from '../types/shippingOptionTypes';
import axios from 'axios';

//Get all options from backend and store.

type ShowAllOptions = {
  allShippingOptions: GetAllOptions;
  fetchAllOptions: () => void;
}

export const useAllShippingOptionsStore = create<ShowAllOptions>((set) => ({
  allShippingOptions: [],
  fetchAllOptions: async () => {
    try {
      const response = await axios.get("http://localhost:5000/shipping-options");
      console.log(response.data);
      set({
        allShippingOptions: response.data
      });
    } catch (error) {
      console.error("Error searching for shipping options:", error);
    }
  }
}));

//Save user selection (ID only) for purchase flow.

type ShippingOptionId = string;

type ShippingOptionState = {
  selection: ShippingOptionId;
  setSelectionData: (shippingOption: ShippingOptionId) => void;
};

export const useShippingSelectionState = create<ShippingOptionState>((set) => ({ selection: "",
  setSelectionData: (shippingOption) => set({ selection: shippingOption })
}));