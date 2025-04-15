import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiShoppingCart, FiList, FiCreditCard, FiBox, FiUser } from "react-icons/fi";
import { useUserStore } from "../store/user.js";
import { toast } from "react-toastify";

function SideBar() {
  const [showAccountOptions, setShowAccountOptions] = useState(false);
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  console.log("Current user in SideBar:", user);

  const handleLogout = async () => {
    console.log("Logging out..."); // Debug: Checking if logout is triggered.
  
    // Clear the user data and token from the store or localStorage (depending on how it's stored)
    await logout();
    
    // Debug: After logout, check if the token is removed and user is cleared
    const token = localStorage.getItem('token');  // Assuming you store the token in localStorage
    const user = useUserStore.getState().user;  // Checking the user state from the store
  
    if (!token && !user) {
      console.log("Token is removed and user is logged out:", true); // Debug: Confirming token removal and user logout.
    } else {
      console.log("Token or user data still exists:", { token, user }); // Debug: Token or user data exists, check why.
    }
  
    toast.success("Đăng xuất thành công! 👋", {
      position: "top-right",
      autoClose: 3000,
    });
    
    navigate("/dangnhap");
  };
  const handleLogin = () => {
    navigate("/dangnhap");
  }

  return (
    <div className="h-screen w-[14%] p-6 fixed left-0 top-0 geo-regular">
      <div className="text-2xl font-bold text-red-900 mb-4">Brick & Beam</div>
      <ul className="space-y-4 my-4">
        {/* CHO KHÁCH HÀNG */}
        {user?.role === "customer" && (
          <>
            <li>
              <Link to="/" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
                <FiBox size={18} /> Sản phẩm
              </Link>
            </li>
            <li>
              <Link to="/giohang" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
                <FiShoppingCart size={18} /> Giỏ hàng
              </Link>
            </li>
            <li>
              <Link to="/donhang" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
                <FiList size={18} /> Đơn hàng
              </Link>
            </li>
          </>
        )}

        {/* CHO ADMIN */}
        {user?.role === "admin" && (
          <>
            <li>
              <Link to="/donhangad" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
                <FiList size={18} /> Đơn hàng (Admin)
              </Link>
            </li>
            <li>
              <Link to="/khachhang" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
                <FiBox size={18} /> Khách hàng
              </Link>
            </li>
          </>
        )}
      </ul>
      <div className="relative mt-6">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          onClick={() => setShowAccountOptions(!showAccountOptions)}
        >
          <FiUser size={18} /> Tài khoản
        </button>
        {showAccountOptions && (
  <ul className="absolute left-0 mt-2 w-full bg-white shadow-lg rounded-lg border">
    {user && localStorage.getItem("token") ? (
      <>
        <li className="px-4 py-2 text-sm text-gray-600 border-b">
          👤 <span className="font-semibold">{user.name}</span> <br />
          🔑 <span className="text-xs capitalize">{user.role}</span>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
          >
            Đăng xuất
          </button>
        </li>
      </>
    ) : (
      <li>
        <button
          onClick={handleLogin}
          className="w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          Đăng nhập
        </button>
      </li>
    )}
  </ul>
)}

      </div>
    </div>
  );
}

export default SideBar;
