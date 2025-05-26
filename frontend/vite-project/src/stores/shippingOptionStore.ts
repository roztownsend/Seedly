import { create } from "zustand";
import { GetAllOptions } from "../types/shippingOptionTypes";
import axios from "axios";
import { useShallow } from "zustand/shallow";

//Get all options from backend and store.

type ShippingOptionsActions = {
  fetchAllOptions: () => void;
  setSelectionData: (shippingOption: string) => void;
};

type ShippingOptionsState = {
  allShippingOptions: GetAllOptions;
  selection: string;
  actions: ShippingOptionsActions;
};

const useShippingOptionsStore = create<ShippingOptionsState>((set) => ({
  allShippingOptions: [],
  selection: "",
  actions: {
    fetchAllOptions: async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/shipping-options"
        );
        console.log(response.data);
        set({
          allShippingOptions: response.data,
        });
      } catch (error) {
        console.error("Unexpected error fetching shipping options", error);
      }
    },
    setSelectionData: (shippingOption) => set({ selection: shippingOption }),
  },
}));

//Save user selection (ID only) for purchase flow.

export const useAllShippingOptions = () =>
  useShippingOptionsStore(useShallow((state) => state.allShippingOptions));

export const useSelection = () =>
  useShippingOptionsStore((state) => state.selection);

export const useShippingOptionsActions = () =>
  useShippingOptionsStore((state) => state.actions);

export const useIsSelected = (optionId: string): boolean =>
  useShippingOptionsStore((state) => state.selection === optionId);
