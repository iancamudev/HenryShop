import { Router, Request, Response, response } from "express";
import { newRefund } from "../controllers/refund";
import { Refund } from "../models/Refund";
import { mailRefund, transporter } from "../transport";

const routes = Router();


routes.post("/", async (req: Request, res: Response) => {
        console.log(req.body.purchase_id)
        const {purchase_id, product_name, buyer_name, reason, quantity, customer_email} = req.body;
    try {
        if(!purchase_id || !product_name || !buyer_name || !reason || !quantity || !customer_email){
          res.status(400).send("Faltan datos del Form");
        }else {
            
            transporter.sendMail(
                mailRefund(purchase_id, product_name, buyer_name, reason, quantity, customer_email),
                (err: any, info: any) =>
                  err ? console.log(err) : console.log(info.response)
              )
            const result = await newRefund(req.body);
            
            res.status(200).send(result);
        } 
    } catch (error) {
     res.status(400).send(error);
    }
  });

  export default routes;