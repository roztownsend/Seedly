export const formatPurchaseDate = (purchaseDate: string) => {
  const date = new Date(purchaseDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getHours()).padStart(2, "0");

  return `${year}/${month}/${day}`;
};
