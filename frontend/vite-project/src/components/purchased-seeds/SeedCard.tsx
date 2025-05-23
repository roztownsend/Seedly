const seedTasks = [
  { period: "April-May", task: "Sow indoors" },
  { period: "May-June", task: "Plant outdoors" },
  { period: "June-August", task: "Pollinate" },
  { period: "September-October", task: "Harvest" },
];
const SeedCard = ({ name, purchaseDate }: { name: string; purchaseDate: string }) => (
  <div className="seed-card">
    <div className="seed-image-placeholder" />
    <div className="seed-details">
      <h2>{name}</h2>
      <p>Purchased: {purchaseDate}</p>
      <a href="#" className="repurchase-link">Re-purchase</a>

      <table className="seed-task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Mark Complete</th>
          </tr>
        </thead>
        <tbody>
          {seedTasks.map((task, index) => (
            <tr key={index}>
              <td><strong>{task.period}:</strong> {task.task}</td>
              <td><input type="checkbox" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default SeedCard
