import { Shopping } from "../../models/Shopping";


 export const addNewShop = async (userId: String, products: Array<object>) =>{
    if(!userId || !products) throw new Error("info missing");
    const newRela = Shopping.create({userId, products});
    return newRela;

 }
 
export const getAllShopAdmin = async (page: number) => {
   const result = await Shopping.paginate( { page: page })
   return result;
}
