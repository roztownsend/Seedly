import { useEffect, useState } from "react";
import PurchasedSeeds from "../components/purchased-seeds/PurchasedSeeds";
import axios from "axios";
import {
  useAuthSession,
  useAuthLoading,
  useAuthActions,
} from "../stores/authStore";
import { UserTaskData, UserTasksResponse } from "../types/userTaskTypes";

function DashBoard() {
  const { signOutUser } = useAuthActions();
  const session = useAuthSession();
  const isLoading = useAuthLoading();
  const [userTasks, setUserTask] = useState<UserTaskData[]>([]);

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
      <PurchasedSeeds userTasks={userTasks} />
      <button onClick={signOutUser}>Logout</button>
      <button onClick={() => console.log(userTasks)}>LOG TASKS</button>
    </div>
  );
}

export default DashBoard;
