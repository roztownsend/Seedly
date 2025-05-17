// import { allowedNodeEnvironmentFlags } from "process";
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize('postgres');

const User = sequelize.define(
    'User',
    {
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
            defaultValue: 'customer',
            allowNull: false,
        },
        purchases: {
            type: DataTypes.ARRAY(DataTypes.UUID)
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }
);


const Plant = sequelize.define(
    'Plant',
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
            defaultValue: 'More info coming soon.',
            allowNull: false,
        },
        cycle: {
            type: DataTypes.ENUM,
            values: ['Annual', 'Biennial', 'Perennial']
        },
        image_url: {
            type: DataTypes.TEXT
        },
        is_edible: {
            type: DataTypes.BOOLEAN
        },
        sunlight: {
            type: DataTypes.ENUM,
            values: ['Full', 'Full to part shade', 'Partial shade to full shade']
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }
);

const Purchase = sequelize.define(
    'Purchase',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
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
        }
    }
);

const PurchaseItem = sequelize.define(
    'PurchaseItem',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        purchase_id: {
            type: DataTypes.UUID,
            unique: true,
        },
        plant_id: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    }
);

const ShippingInfo = sequelize.define(
    'ShippingInfo',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
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
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shipping_option: {
            type: DataTypes.ENUM,
            values: ["PostNord Snigelpost", "Bootbee Box"]
        }
    }
);

const Payment = sequelize.define(
    'Payment',
    {
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
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        expiry_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cvv_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }
);



//Relationships

User.hasMany(Purchase, { foreignKey: 'user_id' });
Purchase.belongsTo(User, { foreignKey: 'user_id' });


Purchase.hasOne(ShippingInfo, { foreignKey: 'id' });
ShippingInfo.belongsTo(Purchase, { foreignKey: 'id' });

Purchase.hasMany(PurchaseItem, { foreignKey: 'id' });
PurchaseItem.belongsTo(Purchase, { foreignKey: 'id' });

//would this actually be a hasMany? You could use a card for multiple purchases...
Payment.hasOne(Purchase, { foreignKey: 'id' });
Purchase.belongsTo(Payment, { foreignKey: 'id' });