// import { v2 as cloudinary } from "cloudinary"
// import fs from "fs"

const fs = require("fs");
const cloudinary = require("cloudinary");

require('dotenv').config()

// const credential = {
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// }

cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        let returnResult;
        console.log("tru : ", localFilePath)
        if (!localFilePath) return null
        //upload the file on cloudinary
        console.log("uploadding : ", localFilePath)

        // cloudinary.v2.uploader.upload_large(localFilePath, {
        //     timeout: 120000,
        //     resource_type: "auto"
        // }, (error, result) => {
        //     console.log(error, " KKKKKKKKKKKKK ", result?.url)
        //     fs.unlinkSync(localFilePath)
        //     returnResult = error === undefined ? result?.url : "error";
        // });

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            timeout: 120000,
        })
        console.log("result : ", response?.url)

        if (response?.url?.length) {
            returnResult = response.url
        }
        fs.unlinkSync(localFilePath)
        return returnResult;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        console.log("catch : ", error)
        return null;
    }
}
module.exports.uploadOnCloudinary = uploadOnCloudinary;
module.exports.cloudinary = cloudinary;
