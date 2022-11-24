import {Router, Request, Response} from "express";
import { bestRating } from "../controllers/carrousel";
const routes = Router();

routes.get('/', async (req:Request, res:Response) => {
	try{
        const result = await bestRating();

		res.status(200).send(result);
	}catch(error:any){
		res.status(500).json({error_message: error.message})
	}
});


export default routes; 