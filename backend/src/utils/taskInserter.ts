import { Task } from "../models/task.model";

interface TaskType {
  plant_id: string;
  description: string | null;
  start_month: number;
  end_month: number;
}

const taskInserter = async () => {
  const taskData: TaskType[] = [
    {
      plant_id: "0d75a894-1f53-4ff8-b7aa-de8b5a83b49a",
      description: "Sow indoors",
      start_month: 4,
      end_month: 5,
    },
    {
      plant_id: "0d75a894-1f53-4ff8-b7aa-de8b5a83b49a",
      description: "Sow indoors",
      start_month: 5,
      end_month: 5,
    },
    {
      plant_id: "0d75a894-1f53-4ff8-b7aa-de8b5a83b49a",
      description: "Pollinate",
      start_month: 6,
      end_month: 6,
    },
    {
      plant_id: "0d75a894-1f53-4ff8-b7aa-de8b5a83b49a",
      description: "Pollinate",
      start_month: 7,
      end_month: 7,
    },
    {
      plant_id: "0d75a894-1f53-4ff8-b7aa-de8b5a83b49a",
      description: "Harvest",
      start_month: 9,
      end_month: 9,
    },
    {
      plant_id: "0d75a894-1f53-4ff8-b7aa-de8b5a83b49a",
      description: "Harvest",
      start_month: 10,
      end_month: 10,
    },
  ];
  try {
  } catch (error) {
    console.log("Failed to bulk add Tasks", error);
  }
};

export default taskInserter;
