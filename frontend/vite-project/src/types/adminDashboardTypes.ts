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

export type LeaderboardRowProps = TopPlants & { index: number };

export type LeaderboardProps = {
  topPlants: TopPlants[];
};

export type AdminDashboardHomeProps = {
  handleSalesData: (timeframe: "day" | "week" | "month") => void;
};
