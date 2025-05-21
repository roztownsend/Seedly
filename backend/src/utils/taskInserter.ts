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
      description: "Plant outdoors",
      start_month: 5,
      end_month: 5,
    },
    {
      plant_id: "0d75a894-1f53-4ff8-b7aa-de8b5a83b49a",
      description: "Pollinate",
      start_month: 6,
      end_month: 7,
    },

    {
      plant_id: "0d75a894-1f53-4ff8-b7aa-de8b5a83b49a",
      description: "Harvest",
      start_month: 9,
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
      description: "Harvest",
      start_month: 8,
      end_month: 10,
    },
  ];
  const onionAlisaCraigTasks: TaskType[] = [
    {
      plant_id: "7e01cefe-9560-4a75-b3ea-7fcbd0c744d6",
      description: "Sow indoors",
      start_month: 3,
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
      end_month: 9,
    },
  ];
  const carrotTouchonTasks: TaskType[] = [
    {
      plant_id: "7c345fe4-03b5-4215-b939-df6c22ed7f3e",
      description: "Sow outdoors",
      start_month: 4,
      end_month: 6,
    },
    {
      plant_id: "7c345fe4-03b5-4215-b939-df6c22ed7f3e",
      description: "Harvest",
      start_month: 7,
      end_month: 9,
    },
    {
      plant_id: "7c345fe4-03b5-4215-b939-df6c22ed7f3e",
      description: "Sow outdoors",
      start_month: 10,
      end_month: 11,
    },
  ];
  const kaleLerchenzungenTasks: TaskType[] = [
    {
      plant_id: "47dfb82c-082a-4f14-919f-6aeebaaa386e",
      description: "Sow outdoors",
      start_month: 4,
      end_month: 6,
    },
    {
      plant_id: "47dfb82c-082a-4f14-919f-6aeebaaa386e",
      description: "Harvest",
      start_month: 9,
      end_month: 11,
    },
  ];
  const salsifySandwichIslandTasks: TaskType[] = [
    {
      plant_id: "4d44eb22-de8a-48c3-899c-944d0da2e15e",
      description: "Sow outdoors",
      start_month: 4,
      end_month: 5,
    },
    {
      plant_id: "4d44eb22-de8a-48c3-899c-944d0da2e15e",
      description: "Harvest",
      start_month: 4,
      end_month: 5,
    },
    {
      plant_id: "4d44eb22-de8a-48c3-899c-944d0da2e15e",
      description: "Sow outdoors",
      start_month: 10,
      end_month: 11,
    },
    {
      plant_id: "4d44eb22-de8a-48c3-899c-944d0da2e15e",
      description: "Harvest",
      start_month: 10,
      end_month: 11,
    },
  ];
  const cornSweetNuggetTasks: TaskType[] = [
    {
      plant_id: "0f496a3f-4085-4086-a473-9a0b93e52428",
      description: "Sow indoors",
      start_month: 3,
      end_month: 4,
    },
    {
      plant_id: "0f496a3f-4085-4086-a473-9a0b93e52428",
      description: "Plant outdoors",
      start_month: 4,
      end_month: 4,
    },
    {
      plant_id: "0f496a3f-4085-4086-a473-9a0b93e52428",
      description: "Harvest",
      start_month: 7,
      end_month: 9,
    },
  ];
  const whiteMulberryTasks: TaskType[] = [
    {
      plant_id: "cb6b40eb-0134-4921-b4bc-34f8179cf318",
      description: "Sow indoors",
      start_month: 2,
      end_month: 4,
    },
    {
      plant_id: "cb6b40eb-0134-4921-b4bc-34f8179cf318",
      description: "Plant outdoors",
      start_month: 5,
      end_month: 5,
    },
    {
      plant_id: "cb6b40eb-0134-4921-b4bc-34f8179cf318",
      description: "Harvest",
      start_month: 7,
      end_month: 9,
    },
    {
      plant_id: "cb6b40eb-0134-4921-b4bc-34f8179cf318",
      description: "Sow indoors",
      start_month: 10,
      end_month: 11,
    },
  ];
  const stawBerryMerlanTasks: TaskType[] = [
    {
      plant_id: "623369ee-8fab-4775-9a88-d32bd3c8661d",
      description: "Sow indoors",
      start_month: 2,
      end_month: 3,
    },
    {
      plant_id: "623369ee-8fab-4775-9a88-d32bd3c8661d",
      description: "Plant outdoors",
      start_month: 4,
      end_month: 5,
    },
    {
      plant_id: "623369ee-8fab-4775-9a88-d32bd3c8661d",
      description: "Harvest",
      start_month: 6,
      end_month: 8,
    },
  ];
  const rampsWildGarlic: TaskType[] = [
    {
      plant_id: "b37621c3-2f2d-4f44-b0f0-c695876a5641",
      description: "Sow indoors",
      start_month: 1,
      end_month: 4,
    },
    {
      plant_id: "b37621c3-2f2d-4f44-b0f0-c695876a5641",
      description: "Plant outdoors",
      start_month: 5,
      end_month: 5,
    },
  ];
  try {
    const tasks = await Task.bulkCreate(rampsWildGarlic);
    console.log(tasks[0] instanceof Task);
  } catch (error) {
    console.log("Failed to bulk add Tasks", error);
  }
};

export default taskInserter;
