import {GoogleUser} from '../../models/googleUser';
import {googleUser} from '../../Types';

export const addNewGoogleUser = async ({name, email, birthday}:googleUser) => {

	const googleUserFind = GoogleUser.findOne({email: email});
	if(!name || !email || !birthday) throw new Error('incomplete information');
	if(googleUserFind.hasOwnProperty('email')) throw new Error('user already exists');
	else {
		const result = await GoogleUser.create({name, email, birthday});
		return result;
	}

};

export const getGoogleUserById = async (id:string) => {

	const result = await GoogleUser.findOne({_id: id});
	return result;

};

export const getAllGoogleUsers = async () => {
	const result = await GoogleUser.find();
	return result;	
}