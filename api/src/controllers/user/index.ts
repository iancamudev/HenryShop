import {user} from '../../Types';
import {User} from '../../models/User'

export const addNewUser = async (user: user) => {

	if(
		!user.name||
		!user.email||
		!user.username||
		!user.password||
		!user.birthday
	){
		throw new Error("Info Missing");
	}
	const userFind = await User.findOne({ name: user.name });
	if (!userFind) {
    const newUser = new User({
      name: user.name,
      email: user.email,
      username: user.username, 
      password: user.password,
      bithday: user.birthday,
    });
    newUser
      .save()
      .then((result) => result)
      .catch((error) => new Error(error));
  } else {
    throw new Error("User already exist");
  }
};