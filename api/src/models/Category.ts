import { Schema, model, PaginateModel, Document } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import {category} from '../Types';

const categorySchema = new Schema({
  name: String,
});

// modifica el _id de lo que te devuelve la base de datos por id, ademas remueve el __v
categorySchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

interface CategoryDocument extends Document, category {}

categorySchema.plugin(mongoosePaginate);

export const Category = model<
  CategoryDocument,
  PaginateModel<CategoryDocument>
>('Categories', categorySchema, 'categories');
