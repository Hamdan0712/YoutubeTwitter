import { ApiError } from "../utils/apierror.js";
import { asyncHandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    // the req.header is for mobile users..they might send it thro a different manner or like that ..reading about that in detail.
    console.log("Token:", token);
    console.log("Headers:", req.headers);

    if (!token) {
      throw new ApiError(401, "Unauthorized Request");
    }

    // const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decodedToken);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Access Token has expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Malformed Access Token");
    } else {
      throw new ApiError(401, error?.message || "Invalid AccessToken");
    }
  }
});
