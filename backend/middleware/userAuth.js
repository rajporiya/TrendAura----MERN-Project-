import handleAsyncError from "./handleAsyncError.js";
import HandleErroe from "../utils/handleError.js";
import jwt from "jsonwebtoken";
import User from '../model/user.models.js'


export const verifyUserAuth = handleAsyncError(async (req, res, next) => {
  // get token from cookie or Authorization header
  let token = req.cookies.token;
  
  if (!token && req.headers.authorization) {
    token = req.headers.authorization.replace("Bearer ", "");
  }
  
  console.log(token);

  if (!token) {
    return next(new HandleErroe("authentication missing plz login first", 400));
  }

  try {
    const decodeData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodeData.id);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
});

export const roleBaseAccess = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new HandleErroe(`Role ${req.user.role} is not allowed to  access the resourse`, 400))
        }
        next();
    }
}
// roleBaseAccess("admin", "superadmin")