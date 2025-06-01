import { useEffect, useState, useRef } from "react";
import PurchasedSeeds from "../components/purchased-seeds/PurchasedSeeds";
import axios from "axios";
import {
  useAuthSession,
  useAuthLoading,
  useAuthActions,
} from "../stores/authStore";
import { UserTaskData, UserTasksResponse } from "../types/userTaskTypes";
import { Loading } from "../components/loading/Loading";

function DashBoard() {
  const { signOutUser } = useAuthActions();
  const session = useAuthSession();
  const isLoading = useAuthLoading();
  const [userTasks, setUserTask] = useState<UserTaskData[]>([]);
  const [isFetchingTasks, setIsFetchingTasks] = useState<boolean>(false);
  const hasFetchedInitiallyRef = useRef(false);

  useEffect(() => {
    const fetchUserTasks = async () => {
      setIsFetchingTasks(true);
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
        console.log("FETCHING TRIGGERD");
        setUserTask(response.data.tasks);
        console.log(response.data.tasks);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetchingTasks(false);
      }
    };

    if (
      !isLoading &&
      session?.access_token &&
      !hasFetchedInitiallyRef.current
    ) {
      hasFetchedInitiallyRef.current = true;
      fetchUserTasks();
    }
  }, [isLoading, session?.access_token]);

  if (isFetchingTasks) {
    return <Loading />;
  }

  return (
    <div>
      <PurchasedSeeds userTasks={userTasks} />
      <button
        className="bg-blue-800 font-bold rounded-lg text-white p-4 mb-3"
        onClick={signOutUser}
      >
        Logout
      </button>
    </div>
  );
}

export default DashBoard;
