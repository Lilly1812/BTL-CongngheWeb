import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/user";
import anhnen from "../assets/anhnen.webp";
import { toast } from "react-toastify";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";

export default function DangNhap() {
  const navigate = useNavigate();
  const { login } = useUserStore();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Vui lòng nhập email và mật khẩu.");
      return;
    }

    setLoading(true);
    setError("");

    const res = await login(form.email, form.password);

    if (res.success) {
      toast.success("Đăng nhập thành công!");
      if (res.user?.role === "admin") {
        navigate("/donhangad");
      } else {
        navigate("/");
      }
    } else {
      toast.error(res.message || "Đăng nhập thất bại.");
      setError(res.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative aspect-square">
        <img
          src={anhnen}
          alt="Login background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-4xl font-bold mb-4">Brick & Beam</h1>
            <p className="text-xl">Chất lượng tạo nên thương hiệu</p>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 aspect-square flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Đăng nhập</h2>
            <p className="text-gray-600">
              Chưa có tài khoản?{" "}
              <button
                onClick={() => navigate("/dangky")}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Đăng ký ngay
              </button>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nhập email của bạn"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nhập mật khẩu"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Đăng nhập
                  <FiArrowRight className="ml-2" />
                </>
              )}
            </button>

            <div className="text-center">
              <button
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Quay lại trang chủ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
