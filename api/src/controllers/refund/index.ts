import { Refund } from "../../models/Refund"; 

export const newRefund = async (body:any) => {

    try {
   //   if(!body.purchase_id || !body.product_name || !body.buyer_name || !body.reason || !body.quantity || !body.customer_email){
   //      return "Faltan datos para la devolución";
   //   }else {
        const result = await Refund.create(body)
        
        return result;
     
        
    } catch (error) {
        console.log(error);
       return error;
    }
    
}