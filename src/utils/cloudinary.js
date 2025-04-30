const cloudinary = require("cloudinary").v2;
const fs = require('fs');

const uploadFileCloudinary = async (localPath, folderName) => {
  try {
    console.log("localPath, folderName", localPath, folderName);
    
    cloudinary.config({
      cloud_name: 'dtgmk4sdv',
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(
        localPath, {
        folder: folderName,
      }
      )
      .catch((error) => {
        console.log(error);
      });

    console.log(uploadResult);

    fs.unlinkSync(localPath);

    return uploadResult

  } catch (error) {
    throw new Error("Error in upload file in cloudinary");
  }
}

module.exports = uploadFileCloudinary