import { Schema, model, PaginateModel, Document } from 'mongoose';
import { githubUser } from '../Types';
import mongoosePaginate from "mongoose-paginate-v2"

const githubUserSchema = new Schema({
  username: { type: String, required: true },
  githubId: { type: String, required: true, unique: true },
  birthday: Date,
  isAdmin: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  confirmed: { type: Boolean, default: true },
  shopping: [{ type: Schema.Types.ObjectId, ref: 'Shopping' }],
});
// modifica el _id de lo que te devuelve la base de datos por id, ademas remueve el __v
githubUserSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

interface GithubUserDocument extends Document, githubUser { }

githubUserSchema.plugin(mongoosePaginate);

export const GithubUser = model<
  GithubUserDocument,
  PaginateModel<GithubUserDocument>
>('GithubUser', githubUserSchema, 'githubUsers');

export default GithubUser