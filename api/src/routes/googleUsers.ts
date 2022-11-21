import {Router, Request, Response} from 'express';
import {
	addNewGoogleUser,
	getAllGoogleUsers,
	getGoogleUserById,
} from '../controllers/googleUser/index';
import {googleUser} from '../Types';
import passport from 'passport';
const jwt = require("jsonwebtoken");

const CLIENT_URL:string = (process.env.CLIENT_URL as string);
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

routes.get('/login/success', async (req:Request, res:Response)=>{
	if(req.user){
		console.log('hay usuario');
		let newUser: string= JSON.stringify(req.user);
		let newUser2: any = (JSON.parse(newUser) as object);
		const user = await getGoogleUserById(newUser2.id);
		const user2 = user? user: {name: '', email: '', id: ''};
		const userForToken = { id: user2.id, email: user2.email };
    const token = jwt.sign(userForToken, process.env.SECRETKEY);
		res.status(200).json({
			error:false,
			message: "login succesful",
			user: { name: user2.name, token: token, origin: 'google' },
		})
	}
});

routes.get('/login/failed', (req:Request, res:Response) => {
	res.status(401).json({error: true, message: "login failed"})
})

routes.get('/google/callback', passport.authenticate('google',{
		failureRedirect: '/login/failed',
	}
),(req:Request, res:Response) => {
		try{
			let newUser: string= JSON.stringify(req.user);
			let newUser2: any = (JSON.parse(newUser) as object);
			console.log(newUser2.emails[0].value);
			const newUserObj:googleUser | null = typeof newUser2 === 'object'? {
				name: newUser2.displayName,
				googleId: newUser2.id,
				email: newUser2.emails[0].value,
				birthday:null,
				isAdmin:false,
				confirmed: true,
			}: null;
			const result:object | null = typeof newUserObj !== null? addNewGoogleUser((newUserObj as googleUser)): null;
			res.redirect(CLIENT_URL);
		}catch(error:any){
			console.log(error.message);
			res.redirect(CLIENT_URL);
		}
})

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