"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = void 0;
const authenticateAdmin = async (req, res, next) => {
    const user = req.user;
    if (!user?.id) {
        res.status(401).json({ message: "Unauthorized: No user ID" });
        return;
    }
    if (user.app_metadata?.role !== "admin") {
        res.status(403).json({ message: "Forbidden: Admin privileged required." });
        return;
    }
    next();
};
exports.authenticateAdmin = authenticateAdmin;
