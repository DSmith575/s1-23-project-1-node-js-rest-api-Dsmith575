import dotenv from "dotenv";
import express, { urlencoded, json } from "express";
//  rateLimit
//  loadEnv

import characters from "./routes/characters.js";
import attributes from "./routes/attributes.js";
import raritys from "./routes/raritys.js";
import affinities from "./routes/affinities.js";

dotenv.config();

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

// app.get(`/`, async (req, res) => {
//     try {
//       // Fetch the available routes from your Prisma models
//       const characters = await prisma.characters.findMany();
//       const attributes = await prisma.attributes.findMany();

//       // Format the list of available routes as a response
//       const response = {
//         message: 'Available routes:',
//         routes: [
//           `${BASE_URL}/${VERSION}/characters`,
//           `${BASE_URL}/${VERSION}/attributes`,
//           // ... add more routes here ...
//         ],
//       };

//       // Send the formatted list of available routes as the response
//       res.json(response);
//     } catch (error) {
//       // Handle any errors that may occur
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
