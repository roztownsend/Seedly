import { create } from "zustand";
import { GetAllOptions } from "../types/shippingOptionTypes";
import axios from "axios";
import { useShallow } from "zustand/shallow";

//Get all options from backend and store.

type ShippingOptionsActions = {
  fetchAllOptions: () => void;
  setSelectionData: (shippingOption: GetAllOptions[number]) => void;
  reset: () => void;
};

type ShippingOptionsState = {
  allShippingOptions: GetAllOptions;
  selection: GetAllOptions[number] | null;
  actions: ShippingOptionsActions;
};

export const useSelectedShippingOption = () =>
  useShippingOptionsStore((state) => state.selection);

const useShippingOptionsStore = create<ShippingOptionsState>((set) => {
  const fetchAllOptions = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");
      const response = await axios.get(`${baseUrl}/shipping-options`);
      set({ allShippingOptions: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  const setSelectionData = (shippingOption: GetAllOptions[number]) => {
    set({ selection: shippingOption });
  };

  const reset = () => set({ selection: null });

  return {
    allShippingOptions: [],
    selection: null,
    actions: {
      fetchAllOptions,
      setSelectionData,
      reset,
    },
  };
});

//Save user selection (ID only) for purchase flow.

export const useAllShippingOptions = () =>
  useShippingOptionsStore(useShallow((state) => state.allShippingOptions));

export const useSelection = () =>
  useShippingOptionsStore((state) => state.selection);

export const useShippingOptionsActions = () =>
  useShippingOptionsStore((state) => state.actions);

export const useIsSelected = (optionId: string): boolean =>
  useShippingOptionsStore((state) => state.selection?.id === optionId);
