import {Router, Request, Response} from 'express';
import {
	addNewGoogleUser,
	getAllGoogleUsers,
	getGoogleUserById,
} from '../controllers/googleUser/index';
import {googleUser} from '../Types';
import passport from 'passport';

const CLIENT_URL:string = (process.env.CLIENT_URL as string);
console.log(CLIENT_URL);
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

routes.get('/login/success', (req:Request, res:Response)=>{
	console.log(req.user);
	if(req.user){
		res.status(200).json({
			error:false,
			message: "login succesful",
			user: req.user,
		})
	}
});

routes.get('/login/failed', (req:Request, res:Response) => {
	res.status(401).json({error: true, message: "login failed"})
})

routes.get('/google/callback', passport.authenticate('google',{
		successRedirect: CLIENT_URL,
		failureRedirect: '/login/failed',
	}
))

routes.get('/google', passport.authenticate('google', {scope: ['google', 'email']}));

routes.get('/google/logout', (req:Request, res:Response)=>{
	req.logout((err) => {
    if (err) { console.log(err); }
    res.redirect(CLIENT_URL);
  });
	res.redirect(CLIENT_URL);
})

routes.get('/:id', async (req: Request, res:Response) => {
	try{
		const result = await getGoogleUserById(req.params.id);
		res.status(200).json(result);
	}catch(error:any){
		res.status(500).json({error_message: error.message});
	}
});

export default routes;