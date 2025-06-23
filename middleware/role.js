const roleCheck = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next();
        } else {
            return res.status(403).json({ message: "Access denied." });
        }
    };
};

const roleMiddleware = {
    onlyTeacher: roleCheck('teacher'),
    onlyStudent: roleCheck('student'),
};

export default roleMiddleware;