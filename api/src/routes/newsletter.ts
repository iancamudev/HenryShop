import { Router, Request, Response, response } from "express";
const bodyParser = require("body-parser");

const routes = Router();

routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

routes.post("/", (req: Request, res: Response) => {
  addEmailToMailchimp(req.body.email);
  res.end("Ok!");
});

function addEmailToMailchimp(email: string) {
  let nl = process.env.MCHIMP_URL;

  var request = require("request");
  var options = {
    method: "POST",
    url: `${nl}`,
    headers: {
      Authorization:
        "Basic YW55c3RyaW5nOjZkYjEyMDM3OWM2MjA0MjE3NWIxMDg3NDg3OTc1MDhiLXVzMTM=",
      "Content-Type": "application/json",
      Cookie:
        "ak_bmsc=D41A905E1FD522B1EBE3E83B6262D53A~000000000000000000000000000000~YAAQVqtLaIqE6XqEAQAAF+puqREeDEzc5bIxDnERsyesqcn1jkXuUSiQtRpzrkp5kpRDZ8i2/HELD1kS01nIUCp6xPDGHt4yPcDWWz+fM9QACPjjdBaK5G3fRPDRKa1cOeEfkpZ2YQ0nPzNgla7azuPveyXq7/LnKrxB+3TGSogP1l8NyXXsOCc63WnDOOddIULQU33bvMtZzYIz00vlvJdLvqRfIZAF2W91VpWLKT6/62wHkL6BGSawul7LboykAuzqUQrjNdD/cRr2ISzhVpfWx+hqh3RlZh/kv8P4+98W+d4f3YiZmxzQ4EJ+btOWoCW29CZkmK834PZoaajy8Nxxnq0+4aOu4M08Z4ChyoZBItRmuXPYT/rHs/eA491eEIi9uWw=; bm_sv=3B3D0A49627E94EB7C364F963F53DB3D~YAAQVqtLaCne6XqEAQAAQVJ9qRH4gJ3v5VuyQE+AdpQQZbVkoRd/LVEyl8+cWRTS4reSeJuk2s++WuX+nNN7XmSV3AjJXtX+d4gpSUgFoVLJsq8ZpCFvd3RjF5dLn79PoL0aZbqOMXtCYYQIDcbVJJs3obRkzm0tYt+jPCCrWAHgApCxfvRYQuzHAyw6ieiLtMJgbM2ZLppTjYMzbkrfoCCR5cBRwPpX0NC5SZSODKDVmMSF8yxB/yfa5tl4Js43Ss16E5jaLQ==~1",
    },
    body: JSON.stringify({
      email_address: email,
      status: "subscribed",
    }),
  };
  request(options, function (error: any, response: any) {
    if (error) throw new Error(error);
  });
}

export default routes;
