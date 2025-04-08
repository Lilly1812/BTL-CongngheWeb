import { useState } from "react";

function DonHangAd() {
  const [filter, setFilter] = useState("all");
  
  const orders = [
    { id: "DH001", customerId: "KH001", total: "2,000,000 VND", status: "Đã giao", orderTime: "2025-03-20 14:30", deliveryTime: "2025-03-22 16:45" },
    { id: "DH002", customerId: "KH002", total: "5,500,000 VND", status: "Đang xử lý", orderTime: "2025-03-21 09:15", deliveryTime: "-" },
    { id: "DH003", customerId: "KH003", total: "1,200,000 VND", status: "Đã hủy", orderTime: "2025-03-22 18:00", deliveryTime: "-" },
    { id: "DH004", customerId: "KH004", total: "3,700,000 VND", status: "Đã giao", orderTime: "2025-03-23 11:20", deliveryTime: "2025-03-25 14:00" },
    { id: "DH005", customerId: "KH005", total: "4,000,000 VND", status: "Chờ xác nhận", orderTime: "2025-03-24 13:45", deliveryTime: "-" },
    { id: "DH006", customerId: "KH006", total: "2,800,000 VND", status: "Chờ hủy", orderTime: "2025-03-24 15:30", deliveryTime: "-" },
  ];
  
  const filteredOrders = orders.filter(order => {
    if (filter === "confirm") return order.status === "Chờ xác nhận";
    if (filter === "cancel") return order.status === "Chờ hủy";
    return true;
  });
  
  return (
    <div className="bg-gray-100 rounded-2xl w-full p-2">
      <div className="p-2"><h2 className="text-xl font-semibold text-gray-700 mb-2">Đơn hàng</h2></div>
      <div className="flex justify-between gap-2 mx-2 mb-4 p-2 bg-white shadow-md rounded-2xl">
        <div className="flex gap-2">
          <button onClick={() => setFilter("all")} className="px-4 py-2 border rounded-2xl bg-gray-500 text-white">Tất cả</button>
          <button onClick={() => setFilter("confirm")} className="px-4 py-2 border rounded-2xl bg-blue-500 text-white">Yêu cầu xác nhận</button>
          <button onClick={() => setFilter("cancel")} className="px-4 py-2 border rounded-2xl bg-red-500 text-white">Yêu cầu hủy đơn</button>
        </div>
      </div>
      <div className="m-2 mb-4 bg-white shadow-md rounded-2xl overflow-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-2xl">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Mã đơn hàng</th>
              <th className="border border-gray-300 p-2">Mã khách hàng</th>
              <th className="border border-gray-300 p-2">Tổng giá trị</th>
              <th className="border border-gray-300 p-2">Tình trạng đơn hàng</th>
              <th className="border border-gray-300 p-2">Thời gian đặt</th>
              <th className="border border-gray-300 p-2">Thời gian giao thành công</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{order.id}</td>
                <td className="border border-gray-300 p-2">{order.customerId}</td>
                <td className="border border-gray-300 p-2">{order.total}</td>
                <td
                  className={`border border-gray-300 p-2 ${
                    order.status === "Đã giao" ? "text-green-600" : 
                    order.status === "Đã hủy" ? "text-red-600" : 
                    order.status === "Chờ xác nhận" ? "text-blue-600" :
                    order.status === "Chờ hủy" ? "text-orange-600" : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="border border-gray-300 p-2">{order.orderTime}</td>
                <td className="border border-gray-300 p-2">{order.deliveryTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DonHangAd;
