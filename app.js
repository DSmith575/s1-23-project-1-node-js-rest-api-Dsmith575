import dotenv from "dotenv";
import express, { urlencoded, json } from "express";
//  rateLimit
//  loadEnv

import characters from "./routes/characters.js";
import attributes from "./routes/attributes.js";

dotenv.config();

const app = express();

const BASE_URL = "api";
const VERSION = "v1";

const PORT = process.env.PORT;

app.use(urlencoded({ extended: false }));
app.use(json());

app.use(`/${BASE_URL}/${VERSION}/characters`, characters);
app.use(`/${BASE_URL}/${VERSION}/attributes`, attributes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

export default app;