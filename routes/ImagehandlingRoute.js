import express from "express";
import multer from "multer";
import path from "path";
import { Router } from "express";
import axios from "axios";

const router = Router();

router.use(express.static("public"));
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static("public"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, "../../getway/public/images"));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("icon"), async (req, res) => {
  const ADMIN_URL = process.env.ADMIN_URL;
  const data = {};
  data.name = req.body.name;
  data.icon = req.file.filename;
  try {
    const resp = await axios.post(`${ADMIN_URL}, data`);
    return res.json(resp.data);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});
export default router;
