import { z } from "zod";

export const signupBody = z.object({
    firstName : z.string(),
    lastName : z.string(),
    username : z.string(),
    password : z.string(),
})

export const signinBody = z.object({
    username : z.string(),
    password : z.string(),
})

export const updateBody = z.object({
    firstName:z.string().optional(),
    lastName:z.string().optional(),
    password:z.string().optional(),

})