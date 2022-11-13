import { v2 as cloudinary } from 'cloudinary'
import dotenv from "dotenv";
dotenv.config();


//conect con mi cuenta de cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET,
    secure: true
  });
//function para subir imagenes a cloudinary
export async function uploadImage(filePath:any){
 return await  cloudinary.uploader.upload(filePath, { folder: "dbimg"})
};