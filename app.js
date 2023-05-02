import dotenv from "dotenv";
import express, { urlencoded, json } from "express";
import { loadEnv } from "./loadEnv.cjs";
//  rateLimit

import characters from "./routes/characters.js";
import attributes from "./routes/attributes.js";
import raritys from "./routes/raritys.js";
import affinities from "./routes/affinities.js";
import elements from "./routes/elements.js";

dotenv.config();
loadEnv();
const app = express();

const BASE_URL = "api";
const VERSION = "v1";

const PORT = process.env.PORT;

app.use(urlencoded({ extended: false }));
app.use(json());

app.use(`/${BASE_URL}/${VERSION}/characters`, characters);
app.use(`/${BASE_URL}/${VERSION}/attributes`, attributes);
app.use(`/${BASE_URL}/${VERSION}/raritys`, raritys);
app.use(`/${BASE_URL}/${VERSION}/affinities`, affinities);
app.use(`/${BASE_URL}/${VERSION}/elements`, elements);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
