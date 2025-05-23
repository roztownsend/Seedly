import { ShippingOption } from "../models/shippingOption.model";

interface OptionType {
    label: string;
    price: number;
    min_days: number;
    max_days: number;
};

const optionsInserter = async () => {
    const optionsData: OptionType[] = [
    {label: "PostNord SnigelPost", price: 49, min_days: 4, max_days: 197},
    {label: "BootBee Box", price: 59, min_days: 10, max_days: 21},
    {label: "DB Stinker Ombud", price: 79, min_days: 7, max_days: 19}
];
try {
    const shippingOptions = await ShippingOption.bulkCreate(optionsData);
    console.log(shippingOptions);
} catch (error) {
        console.error("Failed to bulk insert shipping options", error);
}};

export default optionsInserter;