import { useEffect, useState } from "react";
import PurchasedSeeds from "../components/purchased-seeds/PurchasedSeeds";
import axios from "axios";
import { useAuthSession, useAuthLoading } from "../stores/authStore";

function DashBoard() {
  const session = useAuthSession();
  const isLoading = useAuthLoading();
  const [userTasks, setUserTask] = useState<UserTaskData[]>([]);

  type UserTaskData = {
    user_task_data: {
      id: string;
      is_completed: boolean;
    };
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
  type UserTasksResponse = {
    tasks: UserTaskData[];
  };
  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const response = await axios.get<UserTasksResponse>(
          "http://localhost:5000/user-tasks",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );
        setUserTask(response.data.tasks);
      } catch (error) {
        console.error(error);
      }
    };

    if (!isLoading && session?.access_token) {
      fetchUserTasks();
    }
  }, [isLoading, session?.access_token]);
  return (
    <div>
      <PurchasedSeeds />
      <button onClick={() => console.log(userTasks)}>LOG TASKS</button>
    </div>
  );
}

export default DashBoard;
