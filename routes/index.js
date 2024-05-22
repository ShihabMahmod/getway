import { Router } from "express";
import ImagehandlingRoute from "./ImagehandlingRoute.js";


const router = Router();

router.use("/admin/category-store",ImagehandlingRoute);
router.use("/admin/subcategory-store",ImagehandlingRoute);

export default router;
