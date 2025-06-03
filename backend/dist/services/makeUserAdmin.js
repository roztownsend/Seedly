"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserAdmin = void 0;
const supabaseClient_1 = require("../config/supabaseClient");
const makeUserAdmin = async (userId) => {
    console.log(`Attempting to make user ${userId} admin`);
    const { data, error } = await supabaseClient_1.supabaseAdmin.auth.admin.updateUserById(userId, { app_metadata: { role: "admin" } });
    if (error) {
        console.error(`Error making user ${userId} admin`, error.message);
    }
    else {
        console.log(`Successfully made user ${userId} an admin`);
        console.log("Response -", data.user.app_metadata);
    }
};
exports.makeUserAdmin = makeUserAdmin;
