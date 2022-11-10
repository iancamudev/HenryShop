import { Router, Request, Response } from "express";
import { addNewUser 

} from '../controllers/user/index';

const routes = Router();

routes.post('/', async (req:Request, res:Response) => {

	try{
		const newUser = req.body;
		if (newUser){
			await addNewUser(newUser);
			res.status(200).json(newUser);
		}
	}catch(error: any){
		res.status(500).json({error_message: error.message});
	}

});

// routtes.get('/', async (req: Request, res: Response) => {
// 	try{

// 	}catch(error: any){
// 		res.status(500).json({error_message: error.message});
// 	}
// });

export default routes;