import dotenv from "dotenv"
dotenv.config();
import express from "express";
import userRouter from "./routes/user.routes.js";
import { connectDb } from "./db/db.js";
import cors from "cors";
import accountRouter from "./routes/account.routes.js";

const app = express();
app.use(express.json());
app.use(cors())


app.use("/api/v1/users" , userRouter)
app.use("/api/v1/account" , accountRouter)

app.listen(3000 , () => {
    connectDb();
    console.log("App is Listining on port 3000")
})
