import { Router, Request, Response, response } from "express";
import { sanitizeFilter } from "mongoose";
import { addNewUser, getAllUser, getUser } from "../controllers/user/index";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = Router();
//const userValidation = require("../middlewares/userValidation");
const adminValidation = require("../middlewares/adminValidation");

router.post("/", async (req: Request, res: Response) => {
  let newUser = req.body;
  try {
    let {username, _id} = await addNewUser(newUser);
    const id = _id.toString()
    const userForToken = { id, username };
    const token = jwt.sign(userForToken, process.env.SECRETKEY, {
      expiresIn: 60 * 60,
    });
    res.status(200).send({ username, token });
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error_message: error.message });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await getUser(username);

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password); // Comparamos el password de la base de datos hasheado, con el que nos viene por body

  if (!(passwordCorrect && user)) {
    res.status(401).json({ message: "Usuario o contraseña incorrecto." });
  } else {
    const userForToken = { id: user.id, username: user.username };
    const token = jwt.sign(userForToken, process.env.SECRETKEY, {
      expiresIn: 60 * 60,
    });
    res.status(200).send({ username: user.username, token: token });
  }
});

router.get("/admin", async (req: Request, res: Response) => {
  try {
    const result = await getAllUser();
    result !== null
      ? res.status(200).json(result)
      : res.status(404).json({ error_message: "Ningún usuario encontrado" });
  } catch (error: any) {
    res.status(500).json({ error_message: error.message });
  }
});

router.get("/admin/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const result = await getUser(username);
    result !== null
      ? res.status(200).json(result)
      : res.status(404).json({
        error_message: "Ningún usuario encontrado con ese username",
      });
  } catch (error: any) {
    res.status(500).json({ error_message: error.message });
  }
});

export default router;
