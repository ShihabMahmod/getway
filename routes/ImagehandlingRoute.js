import express from "express";
import multer from "multer";
import path from "path";
import { Router } from "express";
import axios from "axios";



const router = Router();

router.use(express.static("public"));






router.post("/", upload.single("icon"), async (req, res) => {
  
  try {
   
  // Upload an image

  
  
  let data = {};
  data.name = req.body && req.body.name ? req.body.name : '';
  if(req.file){
    data.icon = result.url;
  }
  const finalData = Object.keys(data).length > 0 ? data : {};
    const resp = await axios.post("http://localhost:4000/category", finalData);
    return res.json(resp.data);
  } catch (error) {
    res.status(500).send(error);
  }
});
export default router;
