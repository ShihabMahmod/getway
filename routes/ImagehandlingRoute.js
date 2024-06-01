import express from "express";
import multer from "multer";
import path from "path";
import { Router } from "express";
import axios from "axios";
import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';


const router = Router();

router.use(express.static("public"));


  cloudinary.config({ 
    cloud_name: "dlg2emvsz", 
    api_key: "448797641344156", 
    api_secret: "De_TouHvQDd0xmGDbQyTeI0W0co"
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'uploads', 
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    },
  });
  const upload = multer({ storage: storage });
  router.post("/", upload.single("icon"), async (req, res) => {

    try {

    const result = await cloudinary.uploader.upload(req.file.path,{
        public_id: "event"
    }).catch((error)=>{console.log(error)});
    
    const optimizeUrl = cloudinary.url("shoes", {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    const autoCropUrl = cloudinary.url("shoes", {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
  
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
