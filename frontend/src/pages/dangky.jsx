// src/pages/dangky.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/user";
import anhnen from "../assets/anhnen.webp";
import { toast } from "react-toastify";

export default function DangKy() {
  const navigate = useNavigate();
  const { register } = useUserStore();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(form.name, form.email, form.password);

    if (res.success) {
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/dangnhap");
    } else {
      toast.error(res.message || "Đăng ký thất bại.");
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left image */}
      <div className="hidden md:block">
        <img
          src={anhnen}
          alt="Register illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right form */}
      <div className="flex flex-col justify-center px-8 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Đăng ký</h2>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Họ tên"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
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
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
          >
            Đăng ký
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Đã có tài khoản?{" "}
          <a href="/dangnhap" className="text-blue-600 hover:underline">
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
}
