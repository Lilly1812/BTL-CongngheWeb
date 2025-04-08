import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/sidebar";
import GioHang from "./pages/giohang";
import DonHang from "./pages/donhang";
import DonHangAd from "./pages/donhang_ad";
import SanPham from "./pages/sanpham";
import ThanhToan from "./pages/thanhtoan";
import KhachHang from "./pages/khachhang";
import ChiTiet from "./components/chitietsanpham"

function App() {
    return (
        <Router>
            <div className="flex">
                {/* Sidebar luôn cố định 20% chiều rộng */}
                <SideBar />
                
                {/* Nội dung chính có margin-left để không bị đè lên sidebar */}
                <div className="ml-[15%] w-[85%] p-4 pl-0">
                    <Routes>
                        <Route path="/products" element={<SanPham />} />
                        <Route path="/giohang" element={<GioHang />} />
                        <Route path="/donhang" element={<DonHang />} />
                        <Route path="/donhangad" element={<DonHangAd/>} />
                        <Route path="/thanhtoan" element={<ThanhToan />} />
                        <Route path="/chitiet" element={<ChiTiet />} />
                        <Route path="/khachhang" element={<KhachHang />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
