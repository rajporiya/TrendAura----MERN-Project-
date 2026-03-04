import express from "express";
import { allMyOrder, createNewOrder, getAllOrders, getSingleOrder, updateOrderStatus } from "../controllers/orderController.js";
import { roleBaseAccess, verifyUserAuth } from "../middleware/userAuth.js";
const router = express.Router();


router.route("/new/order").post( verifyUserAuth,createNewOrder)
router
.route("/admin/order/:id")
.get( verifyUserAuth,roleBaseAccess("admin"),getSingleOrder)
.put(verifyUserAuth,roleBaseAccess("admin"),updateOrderStatus)

router
.route("/admin/orderds")
.get( verifyUserAuth,roleBaseAccess("admin"),getAllOrders)


router
.route("/orders/user").get( verifyUserAuth, allMyOrder)


export default router;      