import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        //upload the file on cloudinary
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        //file has been uploaded successfully 
        // console.log('file is uploaded on cloudinary', res.url)
        // Delete local file after successful upload
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return res;
    } catch (error) {
        // Delete local file even if upload failed
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null
    }
}

const deleteFromCloudinary = async (url) => {
    try {
        if (!url) return null;

        const publicID = url.split('/').pop().split('.')[0]

        const res = await cloudinary.uploader.destroy(publicID)
        return res;

    } catch (error) {
        console.error("Error deleting from Cloudinary", error)
        return null;
    }

}

export { uploadOnCloudinary, deleteFromCloudinary }