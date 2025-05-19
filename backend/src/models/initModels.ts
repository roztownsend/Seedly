import { Sequelize } from "sequelize";
import { initPlantModel } from "./plant.model";

export const initModels = (sequelize: Sequelize) => {
  initPlantModel(sequelize);
};
