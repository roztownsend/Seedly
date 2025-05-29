import { UserTask } from "../../types/userTaskTypes";
import { Link } from "react-router-dom";
import { slugify } from "../../utils/slugify";
import { formatPurchaseDate } from "../../utils/formatPurchaseDate";
import { useState, useRef } from "react";

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
  const [userTasks, setUserTasks] = useState<UserTask[]>(tasks);
  const originalTasksRef = useRef(tasks);
  const hasChanges =
    JSON.stringify(userTasks) !== JSON.stringify(originalTasksRef.current);
  console.log(hasChanges);

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

  const saveChanges = () => {
    const tasksToUpdate = getChangedTasks();

    console.log(tasksToUpdate);
  };

  console.log(userTasks);
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
          className="bg-green-800 text-white text-base mt-3 p-2"
        >
          Save changes
        </button>
      )}
    </div>
  );
};

export default SeedCard;
