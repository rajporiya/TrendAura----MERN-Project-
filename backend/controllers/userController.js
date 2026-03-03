import handleAsyncError from "../middleware/handleAsyncError.js";
import User from "../model/user.models.js";
import HandleErroe from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendMail } from "../utils/sendEmail.js";
import crypto from "crypto";
import { v2 as cloudinary} from 'cloudinary'
// import {generateResetPassordToken} from  '../model/user.models.js'
// register user
export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, password, email, avatar } = req.body;
  
  console.log("Registration request received:", { name, email, hasAvatar: !!avatar });
  
  // Validate required fields
  if (!avatar) {
    return next(new HandleErroe("Avatar is required", 400));
  }
  
  try {
    console.log("Uploading to Cloudinary...");
    const myCloud = await cloudinary.uploader.upload(avatar, {
      folder: 'avatar',
      width: 150,
      crop: 'scale',
      resource_type: 'auto'
    });
    
    console.log("Cloudinary upload successful:", myCloud.public_id);
    
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    
    console.log("User created successfully:", user._id);
    sendToken(user, 201, res);
  } catch (cloudinaryError) {
    console.error("Cloudinary upload error:", {
      message: cloudinaryError.message,
      status: cloudinaryError.http_code,
      error: cloudinaryError.error?.message || cloudinaryError.error
    });
    return next(new HandleErroe("Failed to upload avatar: " + cloudinaryError.message, 500));
  }
});

// login user
export const loginUSer = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body || {};
  // console.log(req.body);

  if (!email || !password) {
    return next(new HandleErroe("Email / password cannot be empty", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new HandleErroe("Invalid email or password", 400));
  }

  const isPasswordValid = await user.verifyPassword(password);
  if (!isPasswordValid) {
    return next(new HandleErroe("invalid email or password", 400));
  }

  sendToken(user, 201, res);
  // token function call
  // const token = user.getJWTToken();
  // res.status(200).json({
  //   success :true,
  //   user,
  //   token
  // })
});

// logout
export const logout = handleAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "looged out successfully",
  });
});

// Forgit Password Reset Link

export const requestPasswordReset = handleAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new HandleErroe("User does not exist", 404));
  }

  let resetToken;
  try {
    // Generate reset token
    resetToken = user.generateResetPasswordToken();
    // console.log(resetToken);

    // Save token in DB
    await user.save({ validateBeforeSave: false });
    // TODO: send resetToken via email here
    // Respond to client
    // console.log(resetToken);
  } catch (error) {
    console.error("Error saving reset token:", error);
    return next(
      new HandleErroe("Could not save reset token, try again later", 400),
    );
  }
  const resetPasswordUrl = `http://localhost:8181/reset/${resetToken}`;
  const message = `use the link for reset password${resetPasswordUrl}`;
  try {
    // send email functionality
    await sendMail({
      email: user.email,
      subject: "password reset reqest",
      message,
    });
    res.status(200).json({
      success: true,
      message: `email send to ${user.email} successfully`,
    });
  } catch (error) {
    // token expire or not send email
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    // save database
    await user.save({ validateBeforeSave: false });
    return next(new HandleErroe("email not send", 500));
  }
});

// reset password
export const resetPassword = handleAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  // console.log(user);
  if (!user) {
    return next(
      new HandleErroe("reset password token is invalid / expired", 404),
    );
  }

  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(new HandleErroe("password not match", 404));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save(user, 200, res);
  // getting user detaild
});
export const getUserDetails = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const updatePassword = handleAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");
  const checkPasswordMatch = await user.verifyPassword(oldPassword);

  if (!checkPasswordMatch) {
    return next(new HandleErroe("old pas not correct", 404));
  }
  if (newPassword !== confirmPassword) {
    return next(new HandleErroe("password not match", 404));
  }
  user.password = newPassword;
  await user.save();
  sendToken(user, 200, res);
});

//  Profile Update

export const updateProfile = handleAsyncError(async (req, res, next) => {
  const { name, email } = req.body;
  const updateUserDetails = {
    name,
    email,
  };
  const user = await User.findById(req.user.id, updateUserDetails, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: "profele update s",
    user,
  });
});

// admin get all user

export const getUseList = handleAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Admin get single user

export const getSingleUser = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new HandleErroe("User doesnot exist", 400));
    
  }
    res.status(200).json({
      success: true,
      user,
    });
});

// Admin Update user role
export const updateUserRole = handleAsyncError(async (req, res, next) => {

  const { role } = req.body;  

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    return next(new HandleErroe("User does not exist", 404));
  }

  res.status(200).json({
    success: true,
    message: "User role updated successfully",
    user
  });
});

// Admin Delete user profie

export const deleteUser = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id)
   if (!user) {
    return next(new HandleErroe("User does not exist", 400));
  }
  await User.findByIdAndDelete(req.params.id)
  
  res.status(200).json({
    success : true,
    message : " profile deleted successfully"
  })
}); 