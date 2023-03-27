import dotenv from "dotenv";
import express, { urlencoded, json } from "express";

import institutions from "./routes/institutions.js";
import departments from "./routes/departments.js";
import courses from "./routes/courses.js";

dotenv.config();

const app = express();

const BASE_URL = "api";
const VERSION = "v1";

const PORT = process.env.PORT;

app.use(urlencoded({ extended: false }));
app.use(json());

app.use(`/${BASE_URL}/${VERSION}/institutions`, institutions);
app.use(`/${BASE_URL}/${VERSION}/departments`, departments);
app.use(`/${BASE_URL}/${VERSION}/courses`, courses)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});