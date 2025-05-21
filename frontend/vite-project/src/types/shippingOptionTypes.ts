export type ShippingOptionType = {
    id: string;
    label: string;
    price: string;
    min_days: number;
    max_days: number;
}

export type GetAllOptions = ShippingOptionType[];
