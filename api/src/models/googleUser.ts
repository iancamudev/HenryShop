import {Schema, model, PaginateModel, Document} from 'mongoose';
import { googleUser } from '../Types';
import mongoosePaginate from "mongoose-paginate-v2"

const googleUserSchema = new Schema({
	name: {type: String, required: true},
  googleId: {type: String, required: true, unique: true},
	email: {type: String, required: true, unique: true},
	birthday: Date,
  isAdmin:{type:Boolean, default: false},
	deleted: {type: Boolean, default: false},
  confirmed: { type: Boolean, default: true },
  shopping: [{ type: Schema.Types.ObjectId, ref: 'Shopping' }],
});
// modifica el _id de lo que te devuelve la base de datos por id, ademas remueve el __v
googleUserSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export interface GoogleUserDocument extends Document, googleUser {}

googleUserSchema.plugin(mongoosePaginate);

export const GoogleUser = model<
  GoogleUserDocument,
  PaginateModel<GoogleUserDocument>
>('GoogleUser', googleUserSchema, 'googleUsers');

export default GoogleUser