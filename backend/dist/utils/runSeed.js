"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./db");
async function runSeed() {
    const seedPath = path_1.default.join(__dirname, '../../../database/seed.sql');
    const seedSQL = fs_1.default.readFileSync(seedPath, 'utf-8');
    try {
        await db_1.db.query(seedSQL);
        console.log('Seed data inserted successfully.');
    }
    catch (err) {
        console.error('Failed to insert seed data:', err);
    }
    finally {
        await db_1.db.pool.end();
    }
}
runSeed();
