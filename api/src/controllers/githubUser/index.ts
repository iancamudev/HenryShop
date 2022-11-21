import {GithubUser} from '../../models/githubUser';
import {githubUser} from '../../Types';

export const addNewGithubUser = async ({username, githubId, birthday, isAdmin}: githubUser) => {
	const githubUserFind = await GithubUser.findOne({username: username});
	if(!username || !githubId) {
		console.log('incomplete information');
	}
	if(githubUserFind){
		return githubUserFind;
	}
	else {
		const result = await GithubUser.create({username, githubId});
		return result;
	}
};

export const getGithubUserById = async (id: string) => {
	const result = GithubUser.findOne({githubId: id});
	return result;
}

export const getGithubUserByUsername = async (username: string) => {
	const result = GithubUser.findOne({username: username});
	return result;
}