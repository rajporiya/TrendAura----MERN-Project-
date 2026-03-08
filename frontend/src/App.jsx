import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './Pages/Home';
import ProductDetails from "./Pages/ProductDetails";
import Products from "./Pages/Products";
import Register from "./User/Register";
import Login from "./User/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./feature/user/userSlice";
import UserDashboard from "./User/UserDashboard";
import Profile from "./User/Profile";
import ProtectedRoutes from "./componant/ProtectedRoutes";
import UpdateProfile from "./User/UpdateProfile";
import UpdatePassword from "./User/UpdatePassword";
import ForgotPassword from "./User/ForgotPassword";
import ResetPassword from "./User/ResetPassword";
import Cart from "./cart/Cart";
import Shipping from "./cart/Shipping";
import OrderConfirm from "./cart/OrderConfirm";
import Payment from "./cart/Payment";
import PaymentSuccess from "./cart/PaymentSuccess";

function App() {
  const {isAuthenticated, user}=useSelector(state=>state.user);
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(loadUser())
  },[dispatch])
  
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/product/:id" element={<ProductDetails />}/>
        <Route path="/products" element={<Products />}/>
        <Route path="/products/:keyword" element={<Products />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/forgot/password" element={<ForgotPassword />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/profile" element={<ProtectedRoutes element={<Profile />}  />}/>
        <Route path="/profile/update" element={<ProtectedRoutes element={<UpdateProfile />}  />}/>
        <Route path="/password/update" element={<ProtectedRoutes element={<UpdatePassword />}  />}/>
        <Route path="/reset/:token" element={<ResetPassword />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/shipping" element={<ProtectedRoutes element={<Shipping />}  />}/>
        <Route path="/order/confirm" element={<ProtectedRoutes element={<OrderConfirm />}  />}/>
        <Route path="/process/payment" element={<ProtectedRoutes element={<Payment />}  />}/>
        <Route path="/paymentSuccess" element={<ProtectedRoutes element={<PaymentSuccess  />}  />}/>


      </Routes>
      {isAuthenticated && <UserDashboard  user={user}/>}
    </Router>
    </>
  )
}

export default App
