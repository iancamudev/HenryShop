import { Request, Response } from "express";
import { User } from "../models/User";
import { GoogleUser } from "../models/googleUser";
import { GithubUser } from "../models/githubUser";
const { request } = require("http");
const jwt = require("jsonwebtoken");
import { getUserById, getDateShop } from '../controllers/user'
import { Shopping } from "../models/Shopping";

module.exports = async (req: any, res: any, next: any) => {
  const { productId } = req.body;
  const authorization = req.get("authorization");
  let token = null;
  if (authorization && authorization.toLocaleLowerCase().startsWith("bearer")) {
    token = authorization.split(" ")[1]; // obtenemos el token del authorization 'bearer token'
  }
  if (!token) {
    return res.status(401).json({ error: "token missing or invalid admin" });
  } else {
    const decodedToken = jwt.verify(token, process.env.SECRETKEY);
    let user = await User.findOne({ _id: decodedToken.id });
    if (!decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid admin" });
    }
    const shop = await getDateShop(user.username as string)
    let buyed = false;
    console.log('productID by me: ', productId)
    shop.forEach(sh => {
      sh.products.forEach((pr: any) => {
        console.log('product buyed: ', pr.id)
        if (pr.id === productId) {
          buyed = true;
        }
      })
    })
    console.log('buyed ', buyed)
    if (!buyed)
      return res.status(500).send({ message: 'Debe comprar este producto antes de poder dejar una reseña' })
    next();
  }
}