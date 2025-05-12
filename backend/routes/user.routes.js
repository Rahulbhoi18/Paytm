import  {Router} from "express"
import { getUsers, signin, signup, updateUser } from "../controllers/user.controllers.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
const userRouter = Router()


userRouter.route("/signup").post(signup)
userRouter.route("/signin").post(signin)
userRouter.route("/user-update").post(authMiddleware ,updateUser)
userRouter.route("/bulk").post(authMiddleware ,getUsers)

export default userRouter