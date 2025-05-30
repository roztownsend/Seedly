export type UserTaskData = {
  id: string;
  purchase_date: string;
  purchase_items: UserTaskPurchaseItems[];
  user_tasks: UserTask[];
};
export type UserTaskPurchaseItems = {
  id: string;
  plant: UserTaskPlant;
};
export type UserTask = {
  id: string;
  is_completed: boolean;
  task: OriginalTask;
};
export type UserTasksResponse = {
  tasks: UserTaskData[];
};
export type OriginalTask = {
  id: string;
  description: string;
  start_month: number;
  end_month: number;
};
export type UserTaskPlant = {
  id: string;
  image_url: string;
  product_name: string;
};
