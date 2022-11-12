import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index";
import morgan from "morgan";
import fileUpload from "express-fileupload";
export const server = express();
const FRONT_URL = process.env.FRONT_URL || "http://localhost:3000";

dotenv.config();
const PORT = process.env.PORT;
require("./mongo");
server.use(express.json());
server.use(morgan("dev"));
server.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

//Admitir llamados del front
server.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", FRONT_URL); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

server.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
