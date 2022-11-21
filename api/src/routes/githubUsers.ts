import {Router, Request, Response} from 'express';
import passport from 'passport';
import {githubUser} from '../Types';
import {
	addNewGithubUser,
	getGithubUserById,
	getGithubUserByUsername,
}from '../controllers/githubUser/index';
const jwt = require("jsonwebtoken");

const routes = Router();
const CLIENT_URL:string = (process.env.CLIENT_URL as string);

routes.get('/github', passport.authenticate('auth-github',{
	scope:['user', 'email'],
	session:false,
}));

routes.get('/github/callback',passport.authenticate('auth-github',{
	scope:['user', 'email'],
	session:false,
}), async (req:Request, res:Response) => {
	let newUser: string= JSON.stringify(req.user);
	let newUser2: any = (JSON.parse(newUser) as object);
	//crea usuario github
	const newUserObj:githubUser = {
		username: newUser2.username,
		githubId: newUser2.nodeId,
		birthday: null,
		isAdmin: false,
		confirmed: true,
	};
	const result = await addNewGithubUser(newUserObj);
	const user= result? result: {username: '', email: '', id: ''};
	const userForToken = { id: user.id, username: user.username };
	const token = jwt.sign(userForToken, process.env.SECRETKEY);
	const response = {
		error:false,
		message: "login successful",
		user: { username: userForToken.username, token: token, origin: "github" },
	};
	const jsonResponse = JSON.stringify(response);
	res.status(200).send(
		`<!DOCTYPE HTML>
			<html lang="en">
				<body></body>
				<script>
					window.opener.postMessage(${jsonResponse}, '${CLIENT_URL}');
					console.log('aa');
				</script>
			</html>
		`
	)
});

routes.get('/:username', async (req: Request, res:Response) => {
	try{
		const result = await getGithubUserByUsername(req.params.username);
		res.status(200).json(result);
	}catch(error:any){
		res.status(500).json({error_message: error.message});
	}
});

export default routes;