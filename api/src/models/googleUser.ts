import {Schema, model, PaginateModel, Document} from 'mongoose';
import { googleUser } from '../Types';
import mongoosePaginate from "mongoose-paginate-v2"

const googleUserSchema = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	birthday: {type: String, required: true},
	deleted: {type: Boolean, default: false},
});
// modifica el _id de lo que te devuelve la base de datos por id, ademas remueve el __v
googleUserSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

interface GoogleUserDocument extends Document, googleUser {}

googleUserSchema.plugin(mongoosePaginate);

export const GoogleUser = model<
  GoogleUserDocument,
  PaginateModel<GoogleUserDocument>
>('GoogleUser', googleUserSchema, 'googleUsers');