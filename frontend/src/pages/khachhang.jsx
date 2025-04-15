import { useEffect, useState } from "react";
import { useUserStore } from "../store/user.js"; // Đường dẫn đến file zustand của bạn

function KhachHang() {
  const [users, setUsers] = useState([]);
  const fetchAllUsers = useUserStore((state) => state.fetchAllUsers);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetchAllUsers();
      if (res.success) {
        setUsers(res.data);

        // Gọi API để tăng số lần truy cập và cập nhật trạng thái hoạt động cho mỗi người dùng
        res.data.forEach((user) => {
          
        });
      }
    };

    fetchUsers();
  }, [fetchAllUsers]);

  return (
    <div className="bg-gray-50 rounded-2xl w-full p-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Khách hàng</h2>

      <div className="bg-white shadow-md rounded-2xl overflow-auto">
        <table className="w-full border-collapse text-gray-700">
          <thead>
            <tr className="bg-gray-100 text-sm font-semibold">
              {["Tên", "Email", "Ngày đăng ký", "Số lần truy cập", "Tình trạng"].map((header, index) => (
                <th key={index} className="p-3 text-left border-b">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id || index} className="hover:bg-gray-50">
                <td className="p-3 border-b">{user.name}</td>
                <td className="p-3 border-b">{user.email}</td>
                <td className="p-3 border-b">{new Date(user.createdAt).toLocaleDateString("vi-VN")}</td>
                <td className="p-3 border-b">{user.loginCount || 0}</td>
                <td className={`p-3 border-b ${user.isActive ? "text-green-600" : "text-red-600"}`}>
                  {user.isActive ? "Active" : "Not Active"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default KhachHang;
