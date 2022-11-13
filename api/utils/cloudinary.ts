import { v2 as cloudinary } from 'cloudinary'

import dotenv from "dotenv";
// const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env;

//conect con mi cuenta de cloudinary
cloudinary.config({ 
    cloud_name: "dn13gifly", 
    api_key: "138323822818154", 
    api_secret: "14dmAK9K42EL1UPdY_wILwCj9XE",
    secure: true
  });
//function para subir imagenes a cloudinary
export async function uploadImage(filePath:any){
 return await  cloudinary.uploader.upload(filePath, { folder: "dbimg"})
};