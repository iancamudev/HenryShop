import {Schema, model} from 'mongoose';

const userSchema = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	username: {type: String, required: true},
	password: {type: String, required: true},
	birthday: {type: Date, required: true},
	deleted: {type: Boolean, default: false},
});
// modifica el _id de lo que te devuelve la base de datos por id, ademas remueve el __v
userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const User = model('User', userSchema);