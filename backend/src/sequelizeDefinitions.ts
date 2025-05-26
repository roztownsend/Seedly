import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../src/config/sequelizeConnect";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "customer",
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

const Plant = sequelize.define(
  "Plant",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "More info coming soon.",
      allowNull: false,
    },
    cycle: {
      type: DataTypes.ENUM,
      values: ["Annual", "Biennial", "Perennial"],
    },
    image_url: {
      type: DataTypes.TEXT,
    },
    isedible: {
      type: DataTypes.BOOLEAN,
    },
    sunlight: {
      type: DataTypes.ENUM,
      values: ["Full", "Full to part shade", "Partial shade to full shade"],
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "plants", // 👈 Match your Supabase table name
    freezeTableName: true,
    timestamps: false, // 👈 THIS disables the automatic "createdAt" and "updatedAt"
  }
);

const Purchase = sequelize.define("Purchase", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: true, // Nullable for guest checkout
  },
  total_items: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shipping_selection: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipping_price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  total_amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  purchase_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

const PurchaseItem = sequelize.define("PurchaseItem", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  purchase_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  plant_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

const ShippingInfo = sequelize.define("ShippingInfo", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  purchase_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  customer_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  apartment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  postcode: {
    type: DataTypes.STRING, // Changed to STRING to support leading zeros, etc.
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipping_option: {
    type: DataTypes.ENUM,
    values: ["PostNord Snigelpost", "Bootbee Box"],
  },
});

const ShippingOption = sequelize.define("Shipping Option", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  min_days: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  max_days: {
    type: DataTypes.NUMBER,
    allowNull: false,
  } 
});

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  purchase_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  cardnumber: {
    type: DataTypes.STRING, // Changed to STRING for security and formatting
    allowNull: false,
  },
  expiry_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cvv_number: {
    type: DataTypes.STRING, // Changed to STRING for security reasons
    allowNull: false,
  },
});

// Associations

User.hasMany(Purchase, { foreignKey: "user_id" });
Purchase.belongsTo(User, { foreignKey: "user_id" });

Purchase.hasMany(PurchaseItem, { foreignKey: "purchase_id" });
PurchaseItem.belongsTo(Purchase, { foreignKey: "purchase_id" });

Plant.hasMany(PurchaseItem, { foreignKey: "plant_id" });
PurchaseItem.belongsTo(Plant, { foreignKey: "plant_id" });

Purchase.hasOne(ShippingInfo, { foreignKey: "purchase_id" });
ShippingInfo.belongsTo(Purchase, { foreignKey: "purchase_id" });

Purchase.hasOne(Payment, { foreignKey: "purchase_id" });
Payment.belongsTo(Purchase, { foreignKey: "purchase_id" });

export {
  sequelize,
  User,
  Plant,
  Purchase,
  PurchaseItem,
  ShippingInfo,
  Payment,
};
