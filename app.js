import dotenv from "dotenv";
import express, { urlencoded, json } from "express";
import rateLimit from "express-rate-limit";

import institutions from "./routes/institutions.js";
import departments from "./routes/departments.js";
import courses from "./routes/courses.js";

require('dotenv').config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to x requests per windowMs
});

const BASE_URL = "api";
const VERSION = "";

const PORT = process.env.PORT;

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(limiter);


app.use(`/${BASE_URL}/${VERSION}/institutions`, institutions);
app.use(`/${BASE_URL}/${VERSION}/departments`, departments);
app.use(`/${BASE_URL}/${VERSION}/courses`, courses);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});