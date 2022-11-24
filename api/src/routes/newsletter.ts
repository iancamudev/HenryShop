import { Router, Request, Response, response } from "express";
const bodyParser = require("body-parser");

const routes = Router();

routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

routes.post("/", (req: Request, res: Response) => {
  console.log(req.body.email);
  res.end("Ok!");
});

export default routes;
