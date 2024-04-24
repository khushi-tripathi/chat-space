import { asyncHandler } from "./asyncHandler";

const registerUser = asyncHandler(async (req, res) => {
    const imageLocalPath = req.files?.image[0]?.path;

    if (!imageLocalPath) {
        throw new Error(400, "image file is required")
    }

    const image = await uploadOnCloudinary(imageLocalPath)
    // const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    // if (!image) {
    //     throw new ApiError(400, "image file is required")
    // }


    // const user = await User.create({
    //     fullName,
    //     image: image.url,
    //     coverImage: coverImage?.url || "",
    //     email, 
    //     password,
    //     username: username.toLowerCase()
    // })

    // const createdUser = await User.findById(user._id).select(
    //     "-password -refreshToken"
    // )

    // if (!createdUser) {
    //     throw new ApiError(500, "Something went wrong while registering the user")
    // }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})


export {
    registerUser
}