import express from "express";
import "dotenv/config";
import cors from "cors";
import proxy from "express-http-proxy";

import Routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(Routes);

const ADMIN_URL = process.env.ADMIN_URL;
const ORGANIZER_URL = process.env.ORGANIZER_URL;
const USER_URL = process.env.USER_URL;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", proxy(ADMIN_URL));
app.use('/organizer',proxy(ORGANIZER_URL));
app.use("/", proxy(USER_URL));



app.listen(PORT, () => console.log(`Getway server is running on PORT ${PORT}`));

