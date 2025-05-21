import { create } from 'zustand';
import { GetAllOptions } from '../types/shippingOptionTypes';

//Get all options from backend and store.

//to be processed from backend
const shippingOptions: GetAllOptions = [
    {id: "11-111", label: "PostNord SnigelPost", price: "49 kr", min_days: 4, max_days: 197},
    {id: "11-112", label: "BootBee Box", price: "59 kr", min_days: 10, max_days: 21},
    {id: "11-113", label: "DB Stinker Ombud", price: "79 kr", min_days: 7, max_days: 19}
];

type ShowAllOptions = {
  allShippingOptions: GetAllOptions;
  fetchAllOptions: () => void;
}

export const useAllShippingOptionsStore = create<ShowAllOptions>((set) => ({
  allShippingOptions: [],
  fetchAllOptions: () => set({ allShippingOptions: shippingOptions })
}));

//Save user selection for purchase flow.

type ShippingOptionId = string;

type ShippingOptionState = {
  selection: ShippingOptionId;
  setSelectionData: (shippingOption: ShippingOptionId) => void;
};

export const useShippingSelectionState = create<ShippingOptionState>((set) => ({ selection: "",
  setSelectionData: (shippingOption) => set({ selection: shippingOption })
}));