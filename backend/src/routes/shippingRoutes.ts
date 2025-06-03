import { Router, Request, Response } from "express";
import { ShippingOption } from "../models/shippingOption.model";
import sequelize from "../config/sequelizeConnect";
import { initModels } from "../models/initModels";

const router = Router();

initModels(sequelize);

//get shipping options

router.get("/", async (_req: Request, res: Response): Promise<void> => {
  console.log("GET /shipping-options triggered");
  try {
    const shippingOptions = await ShippingOption.findAll();
    res.json(shippingOptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Nooo. Internal server error." });
  }
});

export default router;
