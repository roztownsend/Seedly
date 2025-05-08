export type tempCardType = {
  item: TempCartItem;
};

export type TempCartItem = {
  id: number;
  seedName: string;
  price: number;
  imageUrl: string;
  quantity: number;
};
