export type SalesDataResponse = {
  generalInfo: SalesData[];
  topPlants: TopPlants[];
};

export type SalesData = {
  type: string;
  title: string;
  value: number;
};

export type AnalyticsCardProps = {
  type: string;
  title: string;
  value: number;
};

export type TopPlants = {
  productName: string;
  revenue: string;
  unitsSold: string;
};
