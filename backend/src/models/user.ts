import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export type UserType ={
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    
};
//we need to create schema to tell the property that a user contains
const userSchema = new mongoose.Schema({
    email: {type: String, required: true , unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
});

//this acts as middleware for mongo db
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,8);
    }
    next();
});


const User = mongoose.model<UserType>("User", userSchema);
export default User;
