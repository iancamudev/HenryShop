import {Router, Request, Response} from "express";
import{
	addNewCategory,
	getAllCategory,
	getCategoryById,
} from '../controllers/category/index';

const routes = Router();

routes.post('/admin', async (req:Request, res:Response) => {
	try{
		const newCategory = req.body;
		const result = await addNewCategory(newCategory);
		res.status(200).json(result);
	}catch(error:any){
		res.status(500).json({error_message: error.message});
	}
});

routes.get('/', async (req:Request, res:Response) => {
	try{
		const result = await getAllCategory();
		res.status(200).json(result);
	}catch(error:any){
		res.status(500).json({error_message: error.message})
	}
});

routes.get('/:id', async (req:Request, res:Response) => {
	try{
		const result = await getCategoryById(req.params.id);
		res.status(200).json(result);
	}catch(error:any){
		res.status(500).json({error_message: error.message})
	}
});

export default routes; 