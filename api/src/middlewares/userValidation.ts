import { Request, Response } from "express";
const { request } = require("http");
const jwt = require("jsonwebtoken");

module.exports = (req: Request, res: any, next: any) => {
  const authorization = req.get("authorization");

  let token = null;
  if (authorization && authorization.toLocaleLowerCase().startsWith("bearer")) {
    token = authorization.split(" ")[1]; // obtenemos el token del authorization 'bearer token'
  }
  const decodedToken = jwt.verify(token, process.env.SECRETKEY);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  const { id } = decodedToken;
  next();
};
