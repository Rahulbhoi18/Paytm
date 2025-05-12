import dotenv from "dotenv"
dotenv.config();
import express from "express";
import userRouter from "./routes/user.routes.js";

const app = express();
app.use(express.json());
app.use(cors())


app.use("/api/v1/users" , userRouter)

app.listen(3000 , () => {
    console.log("App is Listining on port 3000")
})
