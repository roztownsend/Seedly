export type UserTaskData = {
  plant_data: {
    id: string;
    image_url: string;
    product_name: string;
  };
  purchase_data: {
    id: string;
    purchase_date: string;
  };
  tasks: UserTask[];
};
export type UserTask = {
  user_task_id: string;
  is_completed: boolean;
  task_id: string;
  description: string;
  start_month: number;
  end_month: number;
};
export type UserTasksResponse = {
  tasks: UserTaskData[];
};
