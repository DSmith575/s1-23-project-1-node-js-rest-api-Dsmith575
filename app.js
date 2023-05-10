import dotenv from "dotenv";
import express, { urlencoded, json } from "express";
import { loadEnv } from "./loadEnv.cjs";
import rateLimit from "express-rate-limit";
import cors from "cors";

import characters from "./routes/characters.js";
import attributes from "./routes/attributes.js";
import raritys from "./routes/raritys.js";
import affinities from "./routes/affinities.js";
import elements from "./routes/elements.js";
import personality from "./routes/personalities.js";

dotenv.config();
loadEnv();
const app = express();

const BASE_URL = "api";
const VERSION = "v1";

const PORT = process.env.PORT;

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.use(`/${BASE_URL}/${VERSION}/characters`, characters);
app.use(`/${BASE_URL}/${VERSION}/attributes`, attributes);
app.use(`/${BASE_URL}/${VERSION}/rarities`, raritys);
app.use(`/${BASE_URL}/${VERSION}/affinities`, affinities);
app.use(`/${BASE_URL}/${VERSION}/elements`, elements);
app.use(`/${BASE_URL}/${VERSION}/personalities`, personality);

app.get("/", (req, res) => {
  return res.json({
    endpoints: [
      `http://localhost:3000/${BASE_URL}/${VERSION}/characters`,
      `http://localhost:3000/${BASE_URL}/${VERSION}/attributes`,
      `http://localhost:3000/${BASE_URL}/${VERSION}/rarities`,
      `http://localhost:3000/${BASE_URL}/${VERSION}/affinities`,
      `http://localhost:3000/${BASE_URL}/${VERSION}/elements`,
      `http://localhost:3000/${BASE_URL}/${VERSION}/personalities`,
    ],
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
