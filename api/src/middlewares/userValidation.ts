import { Request, Response } from "express";
import { User } from "../models/User";
import { GoogleUser } from "../models/googleUser";
import { GithubUser } from "../models/githubUser";
const { request } = require("http");
const jwt = require("jsonwebtoken");

module.exports = async (req: any, res: any, next: any) => {
  console.log("user middleware");
  const authorization = req.get("authorization");
  let token = null;

  if (authorization && authorization.toLocaleLowerCase().startsWith("bearer")) {
    token = authorization.split(" ")[1]; // obtenemos el token del authorization 'bearer token'
  }
  if (!token) {
    return res.status(401).json({ error: "token missing or invalid admin" });
  } else {
    const decodedToken = jwt.verify(token, process.env.SECRETKEY);

    let user = null;
    if (decodedToken) {
      user = await User.findOne({ _id: decodedToken.id });
    }
    if(!user){
      user = await GoogleUser.findOne({ email: decodedToken.email });
    }
    if(!user){
      user = await GithubUser.findOne({ username: decodedToken.username });
    }
    console.log(user);
    console.log(decodedToken);
    if (!decodedToken.id) {
      console.log('userrrrrrr');
      return res.status(401).json({ error: "token missing or invalid admin" });
    }
    const { id } = decodedToken;
    req.id = id;
    next();
  }
};
