import cloudinary from "cloudinary";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import multer from "multer";
import verifyToken from "../middleware/auth";
import Hotel, { HotelType } from "../models/hotel";

const router=express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});

router.post("/",
    verifyToken,
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("city").notEmpty().withMessage("City is required"),
        body("country").notEmpty().withMessage("Country is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("type").notEmpty().withMessage("Hotel type is required"),
        body("pricePerNight").notEmpty().isNumeric().withMessage("Price per nigh is required and must be a number"),
        body("facility").notEmpty().isArray().withMessage("Facilities are required"),
        
    ],
    upload.array("imageFiles",6),
    async(req:Request,res:Response)=>{
        try{
            const imageFiles = req.files as Express.Multer.File[];
            const newHotel: HotelType=req.body;
            newHotel.userId = req.userId;

            const uploadPromises = imageFiles.map(async(image)=> {
                const b64 = Buffer.from(image.buffer).toString("base64");
                let dataURI="data:" + image.mimetype + ";base64," + b64;
                const res = await cloudinary.v2.uploader.upload(dataURI);
                return res.url;
            }
        );
        
            const imageUrls = await Promise.all(uploadPromises);

            newHotel.imageUrls = imageUrls;

            newHotel.lastUpdated = new Date();

            newHotel.userId = req.userId;

            const hotel = new Hotel(newHotel);
            await hotel.save();

            res.status(201).send({message:"Hotel created successfully"});

        }catch(e){
            console.log("Error creating hotel",e);
            res.status(500).json({message:"Something went wrong"});

        }
    }
);
export default router;
//upload to cloudinary,add url to new hotel,save new hotel to database,return 201 status