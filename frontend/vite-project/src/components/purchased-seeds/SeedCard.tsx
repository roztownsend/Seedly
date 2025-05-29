import { UserTask } from "../../types/userTaskTypes";
import { Link } from "react-router-dom";
import { slugify } from "../../utils/slugify";
import { formatPurchaseDate } from "../../utils/formatPurchaseDate";

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
}) => (
  <div className="seed-card">
    <div className="top-section">
      <div className="seed-image-placeholder">
        <img src={imageUrl} alt={name} className="object-cover w-full h-full" />
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
        {tasks.map((task, index) => (
          <tr key={index}>
            <td>
              <strong>{months[task.start_month]} to </strong>
              <strong>{months[task.end_month]}</strong> - {task.description}
            </td>
            <td>
              <input type="checkbox" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SeedCard;
