"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const dbConnection_1 = require("../config/dbConnection");
//query wrapper
exports.db = {
    async query(text, params) {
        const start = Date.now();
        try {
            const result = await dbConnection_1.pool.query(text, params);
            const duration = Date.now() - start;
            console.log('DB Query', { text, duration, rows: result.rowCount });
            return result;
        }
        catch (err) {
            console.error('DB Query Failed', { text, error: err });
            throw err;
        }
    },
    // optional: expose the pool if someone needs transactions
    pool: dbConnection_1.pool,
};
