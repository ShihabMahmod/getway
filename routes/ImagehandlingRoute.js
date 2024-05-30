import express from "express";
import multer from "multer";
import path from "path";
import { Router } from "express";
import axios from "axios";
import {v2 as cloudinary} from 'cloudinary';
const { CloudinaryStorage } = require('multer-storage-cloudinary');


const router = Router();

router.use(express.static("public"));

router.post("/", upload.single("icon"), async (req, res) => {
  
  try {
   
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
