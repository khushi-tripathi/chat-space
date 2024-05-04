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

const deleteFromCloudinary = async (id, num = 1) => {
    return new Promise(async (resolve, reject) => {
        try {

            let res = true;
            console.log("DElete process start : ")
            const response = await cloudinary.uploader.destroy(id, {
                resource_type: "auto",
                timeout: 120000,
            })
            // const response = { result: 'ok' }

            // result :  { result: 'ok' }
            // result :  { result: 'not found' }
            console.log("Deleted")
            console.log("result : ", response)
            if (response?.result !== 'ok' && num <= 5) {
                res = deleteFromCloudinary(id, num + 1)
            } else if (num > 5) {
                resolve(false);
            } else resolve(true)

            console.log("Checking  : ", num)
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

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
        console.log("result : ", response)

        // setTimeout(() => {
        //     console.log("timeout ::: ")
        //     deleteFromCloudinary()
        // }, 5000);

        if (response?.url?.length) {
            returnResult = {
                url: response.url,
                public_id: response.public_id
            }
        }
        fs.unlinkSync(localFilePath)
        return returnResult;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        console.log("catch : ", error)
        return undefined;
    }
}
module.exports.uploadOnCloudinary = uploadOnCloudinary;
module.exports.cloudinary = cloudinary;
module.exports.deleteFromCloudinary = deleteFromCloudinary;
