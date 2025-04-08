import { Link } from "react-router-dom";
import { useState } from "react";
import { FiShoppingCart, FiList, FiCreditCard, FiBox, FiUser } from "react-icons/fi"; 

function SideBar() {
  const [showAccountOptions, setShowAccountOptions] = useState(false);

  return (
    <div className="h-screen w-[14%] p-6 fixed left-0 top-0 geo-regular">
      {/* Logo */}
      <div className="text-2xl font-bold text-red-900 mb-4 ">Brick & Beam</div>
      <hr/>
      {/* Menu */}
      <ul className="space-y-4 my-4">
        <li>
          <Link to="/products" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
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
        <li>
          <Link to="/donhangad" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
            <FiList size={18} /> Đơn hàng (Admin)
          </Link>
        </li>
        <li>
          <Link to="/thanhtoan" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
            <FiCreditCard size={18} /> Thanh toán
          </Link>
        </li>
        <li>
          <Link to="/khachhang" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
            <FiBox size={18} /> Khách hàng
          </Link>
        </li>
      </ul>
    <hr/>
      {/* Dropdown Tài khoản */}
      <div className="relative mt-6">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          onClick={() => setShowAccountOptions(!showAccountOptions)}
        >
          <FiUser size={18} /> Tài khoản
        </button>

        {showAccountOptions && (
          <ul className="absolute left-0 mt-2 w-full bg-white shadow-lg rounded-lg border">
            <li>
              <Link to="/dangky" className="block px-4 py-2 hover:bg-gray-100">Đăng ký</Link>
            </li>
            <li>
              <Link to="/dangnhap" className="block px-4 py-2 hover:bg-gray-100">Đăng nhập</Link>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Đăng xuất</button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default SideBar;
