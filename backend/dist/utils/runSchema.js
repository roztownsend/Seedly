"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = require("../config/dbConnection");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function runSchema() {
    const schemaPath = path_1.default.join(__dirname, '../../../database/schema.sql');
    const schema = fs_1.default.readFileSync(schemaPath, 'utf-8');
    try {
        await dbConnection_1.pool.query(schema);
        console.log('Schema executed successfully');
    }
    catch (error) {
        console.error('Error running schema:', error);
    }
    finally {
        await dbConnection_1.pool.end();
    }
}
runSchema();
