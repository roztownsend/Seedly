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
    {
      plant_id: "b37621c3-2f2d-4f44-b0f0-c695876a5641",
      description: "Harvest",
      start_month: 5,
      end_month: 6,
    },
  ];
  const dillComoTasks: TaskType[] = [
    {
      plant_id: "e59590a8-a73b-4f72-ae55-27d1cbf55231",
      description: "Sow outdoors",
      start_month: 4,
      end_month: 6,
    },
    {
      plant_id: "e59590a8-a73b-4f72-ae55-27d1cbf55231",
      description: "Harvest",
      start_month: 8,
      end_month: 8,
    },
  ];
  const LavanderLovelySky: TaskType[] = [
    {
      plant_id: "bd23198f-c89c-4aee-93e2-34827d0c5ab6",
      description: "Sow indoors",
      start_month: 1,
      end_month: 3,
    },
    {
      plant_id: "bd23198f-c89c-4aee-93e2-34827d0c5ab6",
      description: "Plant outdoors",
      start_month: 4,
      end_month: 5,
    },
    {
      plant_id: "bd23198f-c89c-4aee-93e2-34827d0c5ab6",
      description: "Harvest",
      start_month: 7,
      end_month: 9,
    },
  ];
  const BasilGenovese: TaskType[] = [
    {
      plant_id: "e8deb8d1-0b29-4b8e-b611-04eb9528da73",
      description: "Sow indoors",
      start_month: 2,
      end_month: 4,
    },
    {
      plant_id: "e8deb8d1-0b29-4b8e-b611-04eb9528da73",
      description: "Plant outdoors",
      start_month: 5,
      end_month: 5,
    },
    {
      plant_id: "e8deb8d1-0b29-4b8e-b611-04eb9528da73",
      description: "Harvest",
      start_month: 7,
      end_month: 8,
    },
  ];
  const TomatoPaola: TaskType[] = [
    {
      plant_id: "40e3ed99-bea0-4ce9-9027-d3711edb3793",
      description: "Sow indoors",
      start_month: 2,
      end_month: 4,
    },
    {
      plant_id: "40e3ed99-bea0-4ce9-9027-d3711edb3793",
      description: "Sow indoors",
      start_month: 5,
      end_month: 5,
    },
    {
      plant_id: "40e3ed99-bea0-4ce9-9027-d3711edb3793",
      description: "Harvest",
      start_month: 7,
      end_month: 10,
    },
  ];
  const cucumberMax: TaskType[] = [
    {
      plant_id: "117ff8e0-f5d1-4f77-8e8a-5e96a7742416",
      description: "Sow indoors",
      start_month: 2,
      end_month: 3,
    },
    {
      plant_id: "117ff8e0-f5d1-4f77-8e8a-5e96a7742416",
      description: "Plant outdoors",
      start_month: 5,
      end_month: 5,
    },
    {
      plant_id: "117ff8e0-f5d1-4f77-8e8a-5e96a7742416",
      description: "Harvest",
      start_month: 7,
      end_month: 9,
    },
  ];
  const calendula: TaskType[] = [
    {
      plant_id: "cce3db2e-8e2a-42b2-b1d0-04327acc6240",
      description: "Sow outdoors",
      start_month: 4,
      end_month: 5,
    },
    {
      plant_id: "cce3db2e-8e2a-42b2-b1d0-04327acc6240",
      description: "Harvest",
      start_month: 8,
      end_month: 9,
    },
    {
      plant_id: "cce3db2e-8e2a-42b2-b1d0-04327acc6240",
      description: "Sow outdoors",
      start_month: 10,
      end_month: 11,
    },
  ];
  const chessFlower: TaskType[] = [
    {
      plant_id: "5c3ee920-8ad6-436c-b09c-84d1a47e4e40",
      description: "Sow outdoors",
      start_month: 1,
      end_month: 3,
    },
    {
      plant_id: "5c3ee920-8ad6-436c-b09c-84d1a47e4e40",
      description: "Sow outdoors",
      start_month: 10,
      end_month: 1,
    },
  ];
  const sunflowerRingOfFire: TaskType[] = [
    {
      plant_id: "79cd838f-d82f-4981-b513-bb565293000b",
      description: "Sow indoors",
      start_month: 4,
      end_month: 4,
    },
    {
      plant_id: "79cd838f-d82f-4981-b513-bb565293000b",
      description: "Plant outdoors",
      start_month: 5,
      end_month: 5,
    },
  ];
  const nasturtium: TaskType[] = [
    {
      plant_id: "bebbab4f-8e20-4e36-a93c-cf78c77f7c45",
      description: "Sow indoors",
      start_month: 4,
      end_month: 4,
    },
    {
      plant_id: "bebbab4f-8e20-4e36-a93c-cf78c77f7c45",
      description: "Plant outdoors",
      start_month: 5,
      end_month: 5,
    },
  ];
  const poppyLadyBird: TaskType[] = [
    {
      plant_id: "5fd334dc-67f7-40b3-989a-e8d8fe69fec4",
      description: "Sow outdoors",
      start_month: 4,
      end_month: 5,
    },
    {
      plant_id: "5fd334dc-67f7-40b3-989a-e8d8fe69fec4",
      description: "Sow outdoors",
      start_month: 9,
      end_month: 10,
    },
  ];
  const zinnia: TaskType[] = [
    {
      plant_id: "aee2ef2e-c93a-4835-b6cf-abcbef5a8fad",
      description: "Sow indoors",
      start_month: 3,
      end_month: 4,
    },
    {
      plant_id: "aee2ef2e-c93a-4835-b6cf-abcbef5a8fad",
      description: "Plant outdoors",
      start_month: 5,
      end_month: 5,
    },
  ];
  const petuniaNightSky: TaskType[] = [
    {
      plant_id: "08782500-3b8c-41f5-b4e9-acc06fe80095",
      description: "Sow indoors",
      start_month: 2,
      end_month: 4,
    },
    {
      plant_id: "08782500-3b8c-41f5-b4e9-acc06fe80095",
      description: "Plant outdoors",
      start_month: 5,
      end_month: 5,
    },
  ];
  const lingonBerry: TaskType[] = [
    {
      plant_id: "4238991b-47cd-4017-9eb2-3e1020443938",
      description: "Sow indoors",
      start_month: 1,
      end_month: 3,
    },
    {
      plant_id: "4238991b-47cd-4017-9eb2-3e1020443938",
      description: "Plant outdoors",
      start_month: 4,
      end_month: 4,
    },
    {
      plant_id: "4238991b-47cd-4017-9eb2-3e1020443938",
      description: "Harvest",
      start_month: 7,
      end_month: 8,
    },
    {
      plant_id: "4238991b-47cd-4017-9eb2-3e1020443938",
      description: "Plant outdoors",
      start_month: 9,
      end_month: 10,
    },
  ];
  const alpineStawberryRegina: TaskType[] = [
    {
      plant_id: "99fe3c50-bc77-4fa1-8783-29cd08683e2f",
      description: "Sow indoors",
      start_month: 1,
      end_month: 4,
    },
    {
      plant_id: "99fe3c50-bc77-4fa1-8783-29cd08683e2f",
      description: "Plant outdoors",
      start_month: 5,
      end_month: 5,
    },
    {
      plant_id: "99fe3c50-bc77-4fa1-8783-29cd08683e2f",
      description: "Harvest",
      start_month: 6,
      end_month: 8,
    },
  ];
  const bogMyrtle: TaskType[] = [
    {
      plant_id: "59bf72dc-6d67-43b1-90aa-0b2e07ef3527",
      description: "Sow outdoors",
      start_month: 3,
      end_month: 4,
    },
    {
      plant_id: "59bf72dc-6d67-43b1-90aa-0b2e07ef3527",
      description: "Sow outdoors",
      start_month: 9,
      end_month: 10,
    },
  ];
  const pepperCaliforniaWonder: TaskType[] = [
    {
      plant_id: "c44051c8-9aa0-4773-9bbf-c21d7601725b",
      description: "Sow indoors",
      start_month: 2,
      end_month: 3,
    },
    {
      plant_id: "c44051c8-9aa0-4773-9bbf-c21d7601725b",
      description: "Plant outdoors",
      start_month: 5,
      end_month: 5,
    },
    {
      plant_id: "c44051c8-9aa0-4773-9bbf-c21d7601725b",
      description: "Harvest",
      start_month: 6,
      end_month: 9,
    },
  ];
  const pepperChocobell: TaskType[] = [
    {
      plant_id: "459d36db-ecb1-4c07-97d7-754cfb9e44a8",
      description: "Sow indoors",
      start_month: 2,
      end_month: 3,
    },
    {
      plant_id: "459d36db-ecb1-4c07-97d7-754cfb9e44a8",
      description: "Plant outdoors",
      start_month: 5,
      end_month: 5,
    },
    {
      plant_id: "459d36db-ecb1-4c07-97d7-754cfb9e44a8",
      description: "Harvest",
      start_month: 6,
      end_month: 9,
    },
  ];
  const borage: TaskType[] = [
    {
      plant_id: "b2a13fe6-09f5-4592-afb1-fb626bcf32c1",
      description: "Sow outdoors",
      start_month: 4,
      end_month: 6,
    },
  ];
  const cabbageSunta: TaskType[] = [
    {
      plant_id: "325eb37b-b8df-4461-8976-c5d7282c0b44",
      description: "Sow outdoors",
      start_month: 4,
      end_month: 4,
    },
    {
      plant_id: "325eb37b-b8df-4461-8976-c5d7282c0b44",
      description: "Plant outdoors",
      start_month: 5,
      end_month: 5,
    },
    {
      plant_id: "325eb37b-b8df-4461-8976-c5d7282c0b44",
      description: "Harvest",
      start_month: 7,
      end_month: 8,
    },
  ];
  const raddishRedCelebration: TaskType[] = [
    {
      plant_id: "077770a3-3430-4adb-a9b1-38e8a2df020e",
      description: "Sow outdoors",
      start_month: 4,
      end_month: 9,
    },
    {
      plant_id: "077770a3-3430-4adb-a9b1-38e8a2df020e",
      description: "Harvest",
      start_month: 5,
      end_month: 9,
    },
  ];
  const squashWalthamButternut: TaskType[] = [
    {
      plant_id: "2d068f16-b60e-4914-b867-03e54bb9589a",
      description: "Sow indoors",
      start_month: 4,
      end_month: 5,
    },
    {
      plant_id: "2d068f16-b60e-4914-b867-03e54bb9589a",
      description: "Plant outdoors",
      start_month: 5,
      end_month: 5,
    },
    {
      plant_id: "2d068f16-b60e-4914-b867-03e54bb9589a",
      description: "Pollinate",
      start_month: 6,
      end_month: 7,
    },
    {
      plant_id: "2d068f16-b60e-4914-b867-03e54bb9589a",
      description: "Harvest",
      start_month: 9,
      end_month: 10,
    },
  ];
  try {
  } catch (error) {
    console.log("Failed to bulk add Tasks", error);
  }
};

export default taskInserter;
