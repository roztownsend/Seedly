export type tempCardType = {
  item: TempProductItem;
};

export type TempProductItem = {
  id: number;
  seedName: string;
  price: number;
  imageUrl: string;
};

export type TempCartItem = {
  id: number;
  seedName: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export type TempCardCartType = {
  item: TempCartItem;
};
