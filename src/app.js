import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./config/mongoDb.config.js";
import router from "./common/router.js";
import { customError } from "./common/errors/customError.js";
import swaggerUiExpress from "swagger-ui-express";
import { swaggerOptions } from "./config/swagger.config.js";

const app = express();
connectDB();

app.use(express.json());
app.use("/api", router);
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerOptions));
app.use(customError);

app.listen(process.env.PORT, () => {
  console.log(`Servidor en puerto ${process.env.PORT}`);
});
