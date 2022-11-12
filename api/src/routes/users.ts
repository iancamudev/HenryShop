import { Router, Request, Response } from "express";
import { 
	addNewUser, 
	getAllUser,
	getUser
} from '../controllers/user/index';

const router = Router();

router.post('/', async (req:Request, res:Response) => {

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

router.get('/admin', async(req:Request, res:Response) => {
	try{
		const result = await getAllUser();
		result !== null? res.status(200).json(result): res.status(404).json({error_message: "Ningún usuario encontrado"});
	}catch(error:any){
		res.status(500).json({error_message: error.message});
	}
});

router.get('/admin/:username', async(req:Request, res:Response) => {
	try{
		const username = req.params.username;
		const result = await getUser(username);
		result !== null? res.status(200).json(result): res.status(404).json({error_message: "Ningún usuario encontrado con ese username"});
	}catch(error:any){
		res.status(500).json({error_message: error.message});
	}
});


export default router;