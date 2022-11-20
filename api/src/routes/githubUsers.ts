import {Router, Request, Response} from 'express';
import passport from 'passport';
import {githubUser} from '../Types';
import {
	addNewGithubUser,
	getGithubUserById,
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
	};
	const result = await addNewGithubUser(newUserObj);
	const user= result? result: {username: '', email: '', id: ''};
	const userForToken = { id: user.id, username: user.username, github: true };
	const token = jwt.sign(userForToken, process.env.SECRETKEY);
	const response = {
		error:false,
		message: "login successful",
		user: { username: userForToken.username, token: token },
	};
	const jsonResponse = JSON.stringify(response);
	res.status(200).send(
		`<!DOCTYPE HTML>
			<html lang="en">
				<body></body>
				<script>
					window.opener.postMessage(${jsonResponse}, '${CLIENT_URL}')
				</script>
			</html>
		`
	)
});

export default routes;