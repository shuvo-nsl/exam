const userRouters = require("./../routers/userRouter");
const projectRouter = require("../routers/projectRouter");

module.exports = (app) => {
    app.use("/api/users", userRouters);
    app.use("/api/projects", projectRouter);
}