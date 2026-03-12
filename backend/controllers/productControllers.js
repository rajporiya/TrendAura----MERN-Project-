  import handleAsyncError from "../middleware/handleAsyncError.js";
import Product from "../model/product.models.js";
import User from '../model/user.models.js'
import ApiFunctionality from "../utils/apiFunctioanality.js";
import HandleErroe from "../utils/handleError.js";
import {v2 as cloudinary  } from 'cloudinary'

/* send products details by POST request
/ req = data send by client is received and access.  res= served send is accessed 
 send data from databe and hold in variable product ||  data fetch from Product
*/
export const createProduct = handleAsyncError (async (req, res,next) => {
  let image = [];
  if (req.files?.image) {
    if (Array.isArray(req.files.image)) {
      image = req.files.image.map((file) => {
        if (file.tempFilePath) return file.tempFilePath;
        return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
      });
    } else {
      const file = req.files.image;
      image = [file.tempFilePath || `data:${file.mimetype};base64,${file.data.toString("base64")}`];
    }
  } else if (typeof req.body.image === 'string') {
    image = [req.body.image];
  } else if (Array.isArray(req.body.image)) {
    image = req.body.image;
  }

  if (!image || image.length === 0) {
    return next(new HandleErroe("At least one product image is required", 400));
  }

  const imageLinks=[]
  for(let i = 0; i < image.length; i++){
    const result = await cloudinary.uploader.upload(image[i],{
      folder : 'products'
    })
    // store in database
    imageLinks.push({
      public_id : result.public_id,
      url: result.secure_url
    })
  }
  req.body.image = imageLinks;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });

});

// get products. post Get request
export const getAllProduct = handleAsyncError(async (req, res, next) => {
  const resultPerPage =3;
  // search by product name
  const apiFeature = new ApiFunctionality(Product.find(), req.query).search().filter();
  // pagination
  const filterQuery = apiFeature.query.clone();
  const productCount = await filterQuery.countDocuments();
  const totalPages = Math.ceil(productCount /resultPerPage);
  const page = Number(req.query.page) || 1;
  if(page > totalPages && productCount > 0){
    return next (new HandleErroe("This page doen not exists", 404))
  }
  apiFeature.pagination(resultPerPage)
  // find data from databe and hold in variable products ||  data fetch from Products
  const products = await apiFeature.query ;
  if(!products || products.length === 0){
    return next(new HandleErroe("No Product Found", 404 ))
  }
  res.status(200).json({
    success: true,
    products,
    productCount,
    totalPages,
    currentPage : page ,
    resultPerPage
  });
});

// updata products
export const updateProduct = handleAsyncError (async (req, res, next) => {
  
    let product = await Product.findById(req.params.id, req.body)
// // product not available
   if (!product) {
    return next(new HandleErroe("Product Not Found", 404))
  }
  // Handle

  let images= [];
  if (req.files?.image) {
    if (Array.isArray(req.files.image)) {
      images = req.files.image.map((file) => {
        if (file.tempFilePath) return file.tempFilePath;
        return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
      });
    } else {
      const file = req.files.image;
      images = [file.tempFilePath || `data:${file.mimetype};base64,${file.data.toString("base64")}`];
    }
  } else if (typeof req.body.image === 'string') {
    images = [req.body.image];
  } else if (Array.isArray(req.body.image)) {
    images = req.body.image;
  }

  if (!images || images.length === 0) {
    // No new images uploaded — use the remaining old images sent from frontend
    let oldImages = [];
    if (req.body.oldImages) {
      const raw = Array.isArray(req.body.oldImages) ? req.body.oldImages : [req.body.oldImages];
      oldImages = raw.map((img) => (typeof img === 'string' ? JSON.parse(img) : img));
    }
    if (oldImages.length === 0) {
      return next(new HandleErroe("At least one product image is required", 400));
    }
    req.body.image = oldImages;
  } else {
    // New images uploaded — delete old ones from Cloudinary and upload new
    if (product.image && product.image.length > 0) {
      for (let i = 0; i < product.image.length; i++) {
        await cloudinary.uploader.destroy(product.image[i].public_id);
      }
    }
    const imageLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], { folder: 'products' });
      imageLinks.push({ public_id: result.public_id, url: result.secure_url });
    }
    req.body.image = imageLinks;
  }
  delete req.body.oldImages;
   product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new : true,
    runValidators : true,
  })
   res.status(200).json({
    success: true,
    product,
  });

});

// delete product
export const deleteProduct = handleAsyncError(async (req, res, next)=>{
  let product = await Product.findById(req.params.id);

  if(!product){
     return next(new HandleErroe("Product Not Found", 404))
  }
  // delete image
  for(let i = 0; i<product.image.length; i++){
    await cloudinary.uploader.destroy(product.image[i].public_id)
  }
product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success:true,
    message : " Product Deleted Successfully"
  })
})

// Access single product
export const getProductDetails = handleAsyncError(async (req,res, next)=>{
  const product = await Product.findById(req.params.id);

  
  if(!product){
    return next(new HandleErroe("Product Not Found", 500))
     
  }

  res.status(200).json({
    succes:true,
    product
  })
})


//Product review 
export const createReviewForProducts= handleAsyncError(async(req,res,next)=>{
  // console.log(req.body);
  const {rating,comment,productId}=req.body
  if(!productId){
    return next(new HandleErroe("Product Id is required", 400))
  }

  if(rating === undefined){
    return next(new HandleErroe("Rating is required", 400))
  }

  const numericRating = Number(rating);
  if(Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5){
    return next(new HandleErroe("Rating must be a number between 1 and 5", 400))
  }

  const review = {
    user : req.user._id,
    name : req.user.name,
    rating: numericRating,
    comment
  }
  const product = await Product.findById(productId);
  if(!product){
    return next(new HandleErroe("No product Found", 404))
  }
  
  const reviewExists = product.reviews.find(review=>review.user.toString() === req.user._id.toString());
  if(reviewExists){
    // Update review
    product.reviews.forEach(review=>{
      if(review.user.toString() === req.user._id.toString()){
        review.rating = numericRating;
        review.comment = comment;
      }
    })
  }else{
    product.reviews.push(review)
  }

  product.numOfReview = product.reviews.length;
  const sum = product.reviews.reduce((acc, item) => acc + Number(item.rating), 0);
  product.ratting = product.reviews.length ? sum / product.reviews.length : 0;

  await product.save({validateBeforeSave: false})
  res.status(200).json({
    success:true,
    product
  })

  
})

// get product review
export const getProductReviews = handleAsyncError(async(req,res,next)=>{
  const productId = req.query.productId || req.query.id;
  if(!productId){
    return next(new HandleErroe("Product Id is required", 400))
  }

  const product = await Product.findById(productId);
  if(!product){
    return next(new HandleErroe("No Product Found", 400))
  }

  res.status(200).json({
    success: true,
    reviews : product.reviews
  })
  
})

// delete product review
export const deleteProductReview = handleAsyncError(async(req,res,next)=>{
  const productId = req.query.productId;
  const reviewId = req.query.reviewId || req.query.id;

  if(!productId || !reviewId){
    return next(new HandleErroe("Product Id and Review Id are required", 400))
  }

  const product = await Product.findById(productId);
  if(!product){
    return next(new HandleErroe("No Product Found", 400))
  }

  const reviews = product.reviews.filter(review=>review._id.toString()!==reviewId.toString())
  if(reviews.length === product.reviews.length){
    return next(new HandleErroe("Review Not Found", 404))
  }

  const numOfReview = reviews.length;
  // after delete avg num of review
  const ratting = numOfReview
    ? reviews.reduce((acc, item) => acc + Number(item.rating), 0) / numOfReview
    : 0;

  await Product.findByIdAndUpdate(productId, {
    reviews,
    numOfReview,
    ratting,
  }, {
    new: true,
    runValidators: true,
  })
  
  res.status(200).json({
    success: true,
    message : "Review Deleted Successfully"
  })
  
})
// Admin get all products
export const getAdminProducts = handleAsyncError(async(req,res,next)=>{
  const products = await Product.find();
  res.status(200).json({
    success : true,
    products
  })
})























/*

export const getSingleProduct = (req, res) => {
  res.status(200).json({
    message: "Single Product",
  });
 
};



import Product from "../model/product.models.js";

// Create Product
export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

// Get All Products
export const getAllProduct = async (req, res) => {
  const products = await Product.find();   // ✅ FIXED HERE
  res.status(200).json({
    success: true,
    products,
  });
};
*/
