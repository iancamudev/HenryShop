import {Router, Request, Response} from 'express';
import {
	addNewGoogleUser,
	getAllGoogleUsers,
	getGoogleUserById,
} from '../controllers/googleUser/index';
import {googleUser} from '../Types';

const routes = Router();

routes.post('/', async (req: Request, res:Response)=>{
	try{
		const user = req.body;
		const result = await addNewGoogleUser(user);
		res.status(200).json(result);
	}catch(error:any){
		res.status(500).json({error_message: error.message});
	}
});

routes.get('/admin', async (req: Request, res:Response)=> {
	try{
		const result = await getAllGoogleUsers();
		res.status(200).json(result);
	}catch(error:any){
		res.status(500).json({error_message: error.message});
	}
});

routes.get('/:id', async (req: Request, res:Response) => {
	try{
		const result = await getGoogleUserById(req.params.id);
		res.status(200).json(result);
	}catch(error:any){
		res.status(500).json({error_message: error.message});
	}
});

export default routes;