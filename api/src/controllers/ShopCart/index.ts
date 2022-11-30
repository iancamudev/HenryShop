import { Shopping } from "../../models/Shopping";


 export const addNewShop = async (userId: String, products: Array<object>) =>{
    if(!userId || !products) throw new Error("info missing");
    const newRela = Shopping.create({userId, products});
    return newRela;

 }
 
export const getAllShopAdmin = async (page: number, id: String) => {
 console.log("controller", page, id);
   if(id !== "undefined"){
      console.log("hola");
      const result = await Shopping.paginate({_id: id}, {page: page, limit: 6});
      console.log("controller1", result);
      return result;
   }else{

      const result = await Shopping.paginate({}, { page: page, limit: 6 });
      console.log("controller2", result);
      return result;
   }

}

export const getShop = async (id: string) => {
   let resultUser = null;
   resultUser = await Shopping.findOne({ _id: id }).exec();
   return resultUser;
 };
