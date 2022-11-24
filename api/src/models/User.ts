import { Schema, model, PaginateModel, Document } from "mongoose";
import { user } from "../Types";
import mongoosePaginate from "mongoose-paginate-v2";
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  confirmed: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthday: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Reviews' }],
  shopping: [{ type: Schema.Types.ObjectId, ref: 'Shopping' }],
});

// modifica el _id de lo que te devuelve la base de datos por id, ademas remueve el __v
userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

//Hasheamos la password
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});

interface UserDocument extends Document, user { }

userSchema.plugin(mongoosePaginate);

export const User = model<
  UserDocument,
  PaginateModel<UserDocument>
>('Users', userSchema, 'users');

export default User;
