import { UserTask } from "../../types/userTaskTypes";
import { Link } from "react-router-dom";
import { slugify } from "../../utils/slugify";
import { formatPurchaseDate } from "../../utils/formatPurchaseDate";
import { useState, useRef } from "react";
import axios from "axios";
import { useAuthSession } from "../../stores/authStore";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const SeedCard = ({
  name,
  plantId,
  purchaseDate,
  imageUrl,
  tasks,
}: {
  name: string;
  plantId: string;
  purchaseDate: string;
  imageUrl: string;
  tasks: UserTask[];
}) => {
  const session = useAuthSession();
  const [userTasks, setUserTasks] = useState<UserTask[]>(tasks);
  const [isLoadingSaveChanges, setIsLoadingSaveChanges] =
    useState<boolean>(false);
  const originalTasksRef = useRef(tasks);
  const hasChanges =
    JSON.stringify(userTasks) !== JSON.stringify(originalTasksRef.current);

  const toggleTaskCompletion = (taskId: string) => {
    setUserTasks((prevState) =>
      prevState.map((task) =>
        task.task_id === taskId
          ? { ...task, is_completed: !task.is_completed }
          : task
      )
    );
  };
  const getChangedTasks = () => {
    const updatedTasks = userTasks.filter((currentTask) => {
      const originalTask = originalTasksRef.current.find(
        (task) => task.user_task_id === currentTask.user_task_id
      );
      return (
        originalTask && originalTask.is_completed !== currentTask.is_completed
      );
    });
    return updatedTasks.map((task) => ({
      user_task_id: task.user_task_id,
      is_completed: task.is_completed,
    }));
  };

  const saveChanges = async () => {
    const tasksToUpdate = getChangedTasks();

    setIsLoadingSaveChanges(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user-tasks/update`,
        tasksToUpdate,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      console.log(response.data);
      originalTasksRef.current = [...userTasks];
      setIsLoadingSaveChanges(false);
    } catch (error) {
      console.error("Failed to update tasks", error);
    }
  };

  return (
    <div className="seed-card">
      <div className="top-section">
        <div className="seed-image-placeholder">
          <img
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="seed-info">
          <h2>{name}</h2>
          <p>Purchased: {formatPurchaseDate(purchaseDate)}</p>
          <Link
            to={`/products/${slugify(name)}`}
            state={{ id: plantId }}
            className="repurchase-link"
          >
            Re-purchase
          </Link>
        </div>
      </div>

      <table className="seed-task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {userTasks.map((task, index) => (
            <tr key={index}>
              <td>
                <strong>{months[task.start_month - 1]} to </strong>
                <strong>{months[task.end_month - 1]}</strong> -{" "}
                {task.description}
              </td>
              <td>
                <input
                  type="checkbox"
                  disabled={isLoadingSaveChanges}
                  checked={task.is_completed}
                  onChange={() => toggleTaskCompletion(task.task_id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasChanges && (
        <button
          onClick={saveChanges}
          disabled={isLoadingSaveChanges}
          className="bg-green-800 text-white text-base mt-3 p-2"
        >
          Save changes
        </button>
      )}
    </div>
  );
};

export default SeedCard;
