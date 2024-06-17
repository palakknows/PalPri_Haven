import express, { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import User from '../models/user';

const router= express.Router();
router.post("/register",async (req: Request,res:Response)=> {
    try{
        let user= await User.findOne({
            //we will find the user by email if the email matches one in the database
            email: req.body.email,

        });
        //to show its a bad request
        if(user){
            return res.status(400).json({message: "User already exists!"});
        }

        user=new User(req.body);
        await user.save();

        const token=jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET_KEY as string,
            {expiresIn: "1d",

            }
            );
            res.cookie("auth_token",token,{
                httpOnly: true,
                secure: process.env.NODE_ENV==="production",
                maxAge: 86400000,

            })
            return res.sendStatus(200).send({ message: "User registered OK" });


    }catch (error) {
        console.log(error);
        res.status(500).send({message: "Something went wrong!"});

        }
}
);
/**
 * Express router for handling user routes.
 */
export default router;