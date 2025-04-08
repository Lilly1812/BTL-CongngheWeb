import { Menu } from "@headlessui/react";

function KhachHang() {
  return (
    <div className="bg-gray-50 rounded-2xl w-full p-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Khách hàng</h2>
      
      <div className="bg-white shadow-md rounded-2xl overflow-auto">
        <table className="w-full border-collapse text-gray-700 ">
          <thead>
            <tr className="bg-gray-100 text-sm font-semibold">
              {[
                "Tên", "Email", "Ngày đăng ký", "Số lần truy cập", 
                "Tình trạng", ""
              ].map((header, index) => (
                <th key={index} className="p-3 text-left border-b">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "Nguyễn Văn A",
                email: "nguyenvana@gmail.com",
                registerDate: "01/01/2024",
                numOflogin: "12",
                status: "Active",
              },
              {
                name: "Trần Thị B",
                email: "tranthib@gmail.com",
                registerDate: "15/02/2024",
                numOflogin: "50",
                status: "Not Active",
              },
              {
                name: "Nguyễn Văn A",
                email: "nguyenvana@gmail.com",
                registerDate: "01/01/2024",
                numOflogin: "12",
                status: "Active",
              },
              {
                name: "Trần Thị B",
                email: "tranthib@gmail.com",
                registerDate: "15/02/2024",
                numOflogin: "50",
                status: "Not Active",
              },
              {
                name: "Nguyễn Văn A",
                email: "nguyenvana@gmail.com",
                registerDate: "01/01/2024",
                numOflogin: "12",
                status: "Active",
              },
              {
                name: "Trần Thị B",
                email: "tranthib@gmail.com",
                registerDate: "15/02/2024",
                numOflogin: "50",
                status: "Not Active",
              },
              {
                name: "Nguyễn Văn A",
                email: "nguyenvana@gmail.com",
                registerDate: "01/01/2024",
                numOflogin: "12",
                status: "Active",
              },
              {
                name: "Trần Thị B",
                email: "tranthib@gmail.com",
                registerDate: "15/02/2024",
                numOflogin: "50",
                status: "Not Active",
              },
            ].map((customer, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3 border-b">{customer.name}</td>
                <td className="p-3 border-b">{customer.email}</td>
                <td className="p-3 border-b">{customer.registerDate}</td>
                <td className="p-3 border-b">{customer.numOflogin}</td>
                <td className={`p-3 border-b ${customer.status === "Active" ? "text-green-600" : "text-red-600"}`}>{customer.status}</td>
                <td className="p-3 border-b text-right">
                  <Menu as="div" className="relative inline-block">
                    <Menu.Button className="text-gray-500 hover:text-gray-700">⋮</Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-24 bg-white border rounded-lg shadow-md">
                      <Menu.Item>
                        {({ active }) => (
                          <button className={`w-full px-4 py-2 text-left ${active ? "bg-gray-100" : ""}`}>Sửa</button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button className={`w-full px-4 py-2 text-left text-red-600 ${active ? "bg-gray-100" : ""}`}>Xóa</button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
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