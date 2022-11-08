import express from "express"
import dotenv from "dotenv"
import routes from "./routes/index"
export const server = express();

dotenv.config()
const PORT = process.env.PORT
require("./mongo")

server.use("/", routes)

server.listen(PORT, ()=> {
    console.log(`Server Listening on port ${PORT}`)
})