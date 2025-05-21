import { Task } from "../models/task.model";

interface TaskType {
  plant_id: string;
  description: string | null;
  start_month: number;
  end_month: number;
}

const taskInserter = async () => {
  const pumpkinBabyBearTasks: TaskType[] = [
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
      description: "Plant outdoors",
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
  const beetChoggiaTasks: TaskType[] = [
    {
      plant_id: "5eebf3a8-818b-4728-92db-e021b2b64627",
      description: "Sow indoors",
      start_month: 4,
      end_month: 5,
    },
    {
      plant_id: "5eebf3a8-818b-4728-92db-e021b2b64627",
      description: "Sow indoors",
      start_month: 5,
      end_month: 5,
    },
    {
      plant_id: "5eebf3a8-818b-4728-92db-e021b2b64627",
      description: "Harvest",
      start_month: 8,
      end_month: 8,
    },
    {
      plant_id: "5eebf3a8-818b-4728-92db-e021b2b64627",
      description: "Harvest",
      start_month: 9,
      end_month: 9,
    },
    {
      plant_id: "5eebf3a8-818b-4728-92db-e021b2b64627",
      description: "Harvest",
      start_month: 10,
      end_month: 10,
    },
  ];
  const onionAlisaCraigTasks: TaskType[] = [
    {
      plant_id: "7e01cefe-9560-4a75-b3ea-7fcbd0c744d6",
      description: "Sow indoors",
      start_month: 3,
      end_month: 3,
    },
    {
      plant_id: "7e01cefe-9560-4a75-b3ea-7fcbd0c744d6",
      description: "Sow indoors",
      start_month: 4,
      end_month: 4,
    },
    {
      plant_id: "7e01cefe-9560-4a75-b3ea-7fcbd0c744d6",
      description: "Plant outdoors",
      start_month: 5,
      end_month: 5,
    },
    {
      plant_id: "7e01cefe-9560-4a75-b3ea-7fcbd0c744d6",
      description: "Harvest",
      start_month: 7,
      end_month: 7,
    },
    {
      plant_id: "7e01cefe-9560-4a75-b3ea-7fcbd0c744d6",
      description: "Harvest",
      start_month: 8,
      end_month: 8,
    },
    {
      plant_id: "7e01cefe-9560-4a75-b3ea-7fcbd0c744d6",
      description: "Harvest",
      start_month: 9,
      end_month: 9,
    },
  ];
  const carrotTouchonTasks: TaskType[] = [
    {
      plant_id: "7c345fe4-03b5-4215-b939-df6c22ed7f3e",
      description: "Sow outdoors",
      start_month: 4,
      end_month: 4,
    },
    {
      plant_id: "7c345fe4-03b5-4215-b939-df6c22ed7f3e",
      description: "Sow outdoors",
      start_month: 5,
      end_month: 5,
    },
    {
      plant_id: "7c345fe4-03b5-4215-b939-df6c22ed7f3e",
      description: "Sow outdoors",
      start_month: 6,
      end_month: 6,
    },
    {
      plant_id: "7c345fe4-03b5-4215-b939-df6c22ed7f3e",
      description: "Harvest",
      start_month: 7,
      end_month: 7,
    },
    {
      plant_id: "7c345fe4-03b5-4215-b939-df6c22ed7f3e",
      description: "Harvest",
      start_month: 8,
      end_month: 8,
    },
    {
      plant_id: "7c345fe4-03b5-4215-b939-df6c22ed7f3e",
      description: "Harvest",
      start_month: 9,
      end_month: 9,
    },
    {
      plant_id: "7c345fe4-03b5-4215-b939-df6c22ed7f3e",
      description: "Sow outdoors",
      start_month: 10,
      end_month: 10,
    },
    {
      plant_id: "7c345fe4-03b5-4215-b939-df6c22ed7f3e",
      description: "Sow outdoors",
      start_month: 11,
      end_month: 11,
    },
  ];
  const kaleLerchenzungenTasks: TaskType[] = [
    {
      plant_id: "47dfb82c-082a-4f14-919f-6aeebaaa386e",
      description: "Sow outdoors",
      start_month: 4,
      end_month: 4,
    },
    {
      plant_id: "47dfb82c-082a-4f14-919f-6aeebaaa386e",
      description: "Sow outdoors",
      start_month: 5,
      end_month: 5,
    },
    {
      plant_id: "47dfb82c-082a-4f14-919f-6aeebaaa386e",
      description: "Sow outdoors",
      start_month: 6,
      end_month: 6,
    },
    {
      plant_id: "47dfb82c-082a-4f14-919f-6aeebaaa386e",
      description: "Harvest",
      start_month: 9,
      end_month: 9,
    },
    {
      plant_id: "47dfb82c-082a-4f14-919f-6aeebaaa386e",
      description: "Harvest",
      start_month: 10,
      end_month: 10,
    },
    {
      plant_id: "47dfb82c-082a-4f14-919f-6aeebaaa386e",
      description: "Harvest",
      start_month: 11,
      end_month: 11,
    },
  ];
  const salsifySandwichIslandTasks: TaskType[] = [
    {
      plant_id: "4d44eb22-de8a-48c3-899c-944d0da2e15e",
      description: "Sow outdoors",
      start_month: 4,
      end_month: 4,
    },
    {
      plant_id: "4d44eb22-de8a-48c3-899c-944d0da2e15e",
      description: "Harvest",
      start_month: 4,
      end_month: 4,
    },
    {
      plant_id: "4d44eb22-de8a-48c3-899c-944d0da2e15e",
      description: "Sow outdoors",
      start_month: 5,
      end_month: 5,
    },
    {
      plant_id: "4d44eb22-de8a-48c3-899c-944d0da2e15e",
      description: "Harvest",
      start_month: 5,
      end_month: 5,
    },
  ];
  try {
  } catch (error) {
    console.log("Failed to bulk add Tasks", error);
  }
};

export default taskInserter;
