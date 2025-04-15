import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"; // Correct import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "./components/sidebar";
import GioHang from "./pages/giohang";
import DonHang from "./pages/donhang";
import DonHangAd from "./pages/donhang_ad";
import SanPham from "./pages/sanpham";
import ThanhToan from "./pages/thanhtoan";
import KhachHang from "./pages/khachhang";
import DangKy from "./pages/dangky";
import DangNhap from "./pages/dangnhap";

function App() {
  

  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Layout for Register and Login (without sidebar) */}
        <Route path="/dangky" element={<DangKy />} />
        <Route path="/dangnhap" element={<DangNhap />} />

        {/* Main Layout (with sidebar) */}
        <Route
          path="/*"
          element={
            <div className="flex">
              <SideBar />
              <div className="ml-[15%] w-[85%] p-4 pl-0">
                <Routes>
                  <Route path="/" element={<SanPham />} />
                  <Route path="/giohang" element={<GioHang />} />
                  <Route path="/donhang" element={<DonHang />} />
                  <Route path="/donhangad" element={<DonHangAd />} />
                  <Route path="/thanhtoan" element={<ThanhToan />} />
                  <Route path="/khachhang" element={<KhachHang />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
