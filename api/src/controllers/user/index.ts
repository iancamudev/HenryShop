import { user } from '../../Types';
import { User } from '../../models/User'
const jwt = require("jsonwebtoken");

export const addNewUser = async (user: user) => {
  if (
    !user.name ||
    !user.email ||
    !user.username ||
    !user.password ||
    !user.birthday
  ) {
    throw new Error("Flata enviar datos");
  }
  const userFind = await User.findOne({ name: user.username });
  if (!userFind) {
    let newUser = await User.create(
      { ...user }
    )
    return newUser;
  } else {
    throw new Error("Username ingresado ya existe");
  }
};

const pageSize = 10;

export const getAllUser = async () => {
  const resultUsers: object = await User.paginate({ deleted: false });
  console.log(typeof resultUsers);
  return resultUsers;
}

export const getUser = async (username: string) => {
  const resultUser = await User.findOne({ username: username }).exec();
  console.log("result: ", resultUser);
  return resultUser;
}

export const updateEmail = async (id: string) => {
  const result = await User.findOneAndUpdate({ _id: id }, { confirmed: true });

  if (!result) {
    throw new Error("No se puede cambiar la propiedad confirmed");
  }
  return result;
};

export const compareUsernames = async (username: string, token: string) => {
  const decodedToken = jwt.verify(token, process.env.SECRETKEY);
  if(username !== decodedToken.username)
    throw new Error("No autorizado");
}