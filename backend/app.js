import express from "express";
import product from "./routes/productRoutes.js";
import errorHandleMiddleware from './middleware/error.js'
import user from './routes/userRoute.js'
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
// import authRoutes from "./routes/userRoute.js"
const app = express();

// IMPORTANT: parse JSON middleware
app.use(express.json({ limit: '50mb' }));
// cookie parser
app.use(cookieParser()); 
// fileupload
app.use(fileUpload())

// mount routes product route
app.use("/api/v1", product);
// user route
app.use("/api/v1", user);
// auth route
// app.use("/api/v1", authRoutes);


app.use(errorHandleMiddleware)

export default app;