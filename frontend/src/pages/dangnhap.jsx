import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/user";
import anhnen from "../assets/anhnen.webp";
import { toast } from "react-toastify";

export default function DangNhap() {
  const navigate = useNavigate();
  const { login } = useUserStore();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!form.email || !form.password) {
      setError("Vui lòng nhập email và mật khẩu.");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous error

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
    <div className="h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left image */}
      <div className="hidden md:block">
        <img
          src={anhnen}
          alt="Login illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right form */}
      <div className="flex flex-col justify-center px-8 py-12">
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-bold mb-4 text-center cursor-pointer text-gray-800 hover:text-gray-600 transition"
        >
          Brick & Beam
        </h1>
        <h2 className="text-2xl font-semibold mb-6 text-center">Đăng nhập</h2>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="password"
            type="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className={`w-full py-2 rounded ${
              loading
                ? "bg-gray-400"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Chưa có tài khoản?{" "}
          <a href="/dangky" className="text-blue-600 hover:underline">
            Đăng ký
          </a>
        </p>
      </div>
    </div>
  );
}
