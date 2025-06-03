export type SalesDataResponse = {
  generalInfo: SalesData[];
  topPlants: TopPlants[];
};
export type UsersDataResponse = {
  generalInfo: UserGeneralData[];
  topUsers: TopUsers[];
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
export type TopList = TopPlants | TopUsers;
export type LeaderboardRowProps =
  | (TopPlants & { index: number })
  | (TopUsers & { index: number });

export type LeaderboardProps = {
  topList: TopList[];
};

export type AdminDashboardHomeProps = {
  handleInitialLoad: (
    timeframe: "day" | "week" | "month",
    page: "users" | "sales"
  ) => void;
};

export type SalesCachedData = {
  generalInfo: SalesData[];
  topPlants: TopPlants[];
};

export type SalesDataCache = {
  day?: SalesCachedData;
  week?: SalesCachedData;
  month?: SalesCachedData;
};

export type UsersCachedData = {
  generalInfo: UserGeneralData[];
  topUsers: TopUsers[];
};
export type UsersDataCache = {
  day?: UsersCachedData;
  week?: UsersCachedData;
  month?: UsersCachedData;
};
export type UserGeneralData = {
  type: string;
  title: string;
  value: number;
};

export type TopUsers = {
  email: string;
  created_at: string;
  purchaseCount: string;
  totalSpent: string;
};
