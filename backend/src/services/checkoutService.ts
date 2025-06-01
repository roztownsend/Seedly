import { Transaction } from "sequelize";
import { Purchase } from "../models/purchase.model";
import { PurchaseItem } from "../models/purchaseItem.model";
import { checkoutSchema } from "../schemas/checkoutSchema";
import { z } from "zod";

type CheckoutData = z.infer<typeof checkoutSchema>;

export const processCheckout = async (
  data: CheckoutData,
  transaction: Transaction
) => {
  const {
    userId,
    paymentMethod,
    purchaseItems,
    shippingInfo,
    shippingPrice,
    totalAmount,
    totalItems,
  } = data;

  const purchase = await Purchase.create(
    {
      user_id: userId,
      total_items: totalItems,
      total_amount: totalAmount,
      shipping_price: shippingPrice,
    },
    { transaction }
  );
  await PurchaseItem.bulkCreate(
    purchaseItems.map((item) => ({
      purchase_id: purchase.id,
      plant_id: item.plantId,
      quantity: item.quantity,
    })),
    { transaction }
  );
  await purchase.createPayment(
    {
      payment_method: paymentMethod,
    },
    { transaction }
  );

  await purchase.createShipping_info(
    {
      customer_name: shippingInfo.name,
      email: shippingInfo.email,
      address: shippingInfo.address,
      apartment: shippingInfo.apartment,
      postcode: shippingInfo.postalCode,
      city: shippingInfo.city,
      shipping_option_id: shippingInfo.shippingOptionId,
    },
    { transaction }
  );
};
