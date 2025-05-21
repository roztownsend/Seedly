import { create } from 'zustand';
import { ShippingOptionType, GetAllOptions } from '../types/shippingOptionTypes';

//Get all options from backend and store.

//to be processed from backend
const shippingOptions: GetAllOptions = [
    {id: "11-111", label: "PostNord SnigelPost", price: "49 kr", timeframe: "4-197"},
    {id: "11-112", label: "BootBee Box", price: "59 kr", timeframe: "10-21"},
    {id: "11-113", label: "DB Stinker Ombud", price: "79 kr", timeframe: "7-19"}
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

type ShippingOptionState = {
  selection: ShippingOptionType;
  setSelectionData: (shippingOption: ShippingOptionType) => void;
};

export const useShippingSelectionState = create<ShippingOptionState>((set) => ({ selection: {
    id: "",
    label: "",
    timeframe: "",
    price: ""
  },
  setSelectionData: (shippingOption) => set({ selection: shippingOption })
}));