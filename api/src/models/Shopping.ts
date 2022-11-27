import { Schema, model, SchemaTypes, PaginateModel} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import { shopping } from "../Types";

export const shoppingSchema = new Schema({
    userId: {type: SchemaTypes.ObjectId, ref: "User"},
    products: Array<{type: Schema.Types.ObjectId, ref: "Product"}>,
    time : { type : Date, default: Date.now }
  });

shoppingSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id;
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });

  interface ShoppingDocument extends Document, shopping {}

  shoppingSchema.plugin(mongoosePaginate);
  
  export const Shopping = model<
    ShoppingDocument,
    PaginateModel<ShoppingDocument>
  >('Shopping', shoppingSchema, 'shopping');
  
