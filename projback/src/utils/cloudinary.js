import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "mohammedhamdan",
  api_key: "588658983176791",
  api_secret: "P4Cc8tIGOsSwxD8Kt_OszoICrAI",
  secure: true,
});

const uploadCloudinary = async (localpath) => {
  try {
    if (!localpath) {
      return null;
    }
    // upload on cloudinary
    const responseFile = await cloudinary.uploader.upload(localpath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully

    console.log("File is uploaded successfully on cloudinary..");
    fs.unlinkSync(localpath);
    // console.log(responseFile.url);

    return responseFile;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    fs.unlinkSync(localpath); //remove the locally saved temp file as the upload got failed.
    return null;
  }
};

export { uploadCloudinary };
