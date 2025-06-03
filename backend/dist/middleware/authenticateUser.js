"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const supabaseClient_1 = require("../config/supabaseClient");
const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.error("AuthMiddleware: No token or malformed token. Header", authHeader);
        res.status(401).json({
            message: "Unauthorized: Acces token is missing or improperly formatted",
        });
        return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        console.error("AuthMiddleware: Token not found");
        res.status(401).json({ message: "Unathorized: Acces token not found" });
        return;
    }
    try {
        const { data: { user }, error, } = await supabaseClient_1.supabaseAdmin.auth.getUser(token);
        if (error) {
            console.error(`AuthMiddleware: Token verification error from Supbase ${error.message}`);
        }
        if (!user) {
            console.error("AuthMiddleware: No user found for token");
            res.status(401).json({
                message: "Unauthorized: No active user found for the provided acces token",
            });
            return;
        }
        req.user = user;
        console.log(user?.id, user?.email);
        next();
    }
    catch (error) {
        console.error("AuthMiddleware: Unexpected error during authentication process", error);
        res.status(500).json({
            message: "Internal Server Error: An unexpectes issue occurred during authentication",
        });
    }
};
exports.authenticateUser = authenticateUser;
