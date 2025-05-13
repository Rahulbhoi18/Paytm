import  {Router} from "express"
import { getUsers, signin, signup, updateUser , getUser } from "../controllers/user.controller.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
const userRouter = Router()


userRouter.route("/signup").post(signup)
userRouter.route("/signin").post(signin)
userRouter.route("/user-update").post(authMiddleware ,updateUser)
userRouter.route("/getUser").get(authMiddleware ,getUser)
userRouter.route("/bulk").get(authMiddleware ,getUsers)

export default userRouter