export type UserTaskData = {
  user_task_data: {
    id: string;
    is_completed: boolean;
    task_data: {
      id: string;
      description: string;
      start_month: string;
      end_month: string;
    };
    plant_data: {
      id: string;
      image_url: string;
      product_name: string;
    };
    purchase_data: {
      id: string;
      purchase_date: string;
    };
  };
};
export type UserTasksResponse = {
  tasks: UserTaskData[];
};
