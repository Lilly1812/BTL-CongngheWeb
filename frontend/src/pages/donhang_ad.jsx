import { useEffect, useState } from "react";
import { useOrderStore } from "../store/order.js";
import dayjs from "dayjs";
import { FiX } from "react-icons/fi";

function DonHangAd() {
  const [filter, setFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { orders, fetchAllOrdersForAdmin, changeOrderStatus } = useOrderStore();

  useEffect(() => {
    fetchAllOrdersForAdmin();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (filter === "confirm") return order.status === "Chờ xác nhận";
    if (filter === "cancel") return order.status === "Chờ hủy";
    return true;
  });

  return (
    <div className="bg-gray-100 rounded-2xl w-full p-2 relative">
      <div className="p-2">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Đơn hàng</h2>
      </div>

      <div className="flex justify-between gap-2 mx-2 mb-4 p-2 bg-white shadow-md rounded-2xl">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className="px-4 py-2 border rounded-2xl bg-gray-500 text-white"
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter("confirm")}
            className="px-4 py-2 border rounded-2xl bg-blue-500 text-white"
          >
            Yêu cầu xác nhận
          </button>
          <button
            onClick={() => setFilter("cancel")}
            className="px-4 py-2 border rounded-2xl bg-red-500 text-white"
          >
            Yêu cầu hủy đơn
          </button>
        </div>
      </div>

      <div className="m-2 mb-4 bg-white shadow-md rounded-2xl overflow-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-2xl">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Mã đơn hàng</th>
              <th className="border border-gray-300 p-2">Mã khách hàng</th>
              <th className="border border-gray-300 p-2">Tổng giá trị</th>
              <th className="border border-gray-300 p-2">
                Tình trạng đơn hàng
              </th>
              <th className="border border-gray-300 p-2">Thời gian đặt</th>
              <th className="border border-gray-300 p-2">
                Thời gian giao thành công
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index}>
                <td
                  onClick={() => setSelectedOrder(order)}
                  className="border border-gray-300 p-2 text-blue-600 cursor-pointer hover:underline "
                >
                  {order.orderId}
                </td>
                <td className="border border-gray-300 p-2">{order.userId}</td>
                <td className="border border-gray-300 p-2 text-right">
                  {order.total.toLocaleString()} VND
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <select
                    value={order.status}
                    onChange={async (e) => {
                      const newStatus = e.target.value;
                      try {
                        await changeOrderStatus({
                          orderId: order._id,
                          targetStatus: newStatus,
                        });
                        await fetchAllOrdersForAdmin();
                      } catch (err) {
                        alert(
                          err.response?.data?.message ||
                            "Lỗi khi cập nhật trạng thái!"
                        );
                      }
                    }}
                    className={`w-40 px-2 py-1 rounded-lg border ${
                      order.status === "Đã giao"
                        ? "text-green-600"
                        : order.status === "Đã hủy"
                        ? "text-red-600"
                        : order.status === "Chờ xác nhận"
                        ? "text-blue-600"
                        : order.status === "Chờ hủy"
                        ? "text-orange-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {![
                      "Đã xác nhận",
                      "Đang giao",
                      "Đã giao",
                      "Đã hủy",
                    ].includes(order.status) && (
                      <option value={order.status} disabled>
                        {order.status}
                      </option>
                    )}
                    <option value="Đã xác nhận">Đã xác nhận</option>
                    <option value="Đang giao">Đang giao</option>
                    <option value="Đã giao">Đã giao</option>
                    <option value="Đã hủy">Đã hủy</option>
                  </select>
                </td>
                <td className="border border-gray-300 p-2">
                  {dayjs(order.createdAt).format("HH:mm - DD/MM/YYYY")}
                </td>
                <td className="border border-gray-300 p-2">
                  {order.deliveryTime
                    ? dayjs(order.deliveryTime).format("HH:mm - DD/MM/YYYY")
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal chi tiết đơn hàng */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] md:w-[600px] rounded-2xl shadow-lg p-4 relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Chi tiết đơn hàng</h3>
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
            >
              <FiX />
            </button>

            <p>
              <strong>Mã đơn:</strong> {selectedOrder.orderId}
            </p>
            <p>
              <strong>Khách hàng:</strong> {selectedOrder.userId}
            </p>
            <p>
              <strong>Trạng thái:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Địa chỉ giao hàng:</strong>{" "}
              {`${selectedOrder.shippingAddress?.detail}, ${selectedOrder.shippingAddress?.ward}, ${selectedOrder.shippingAddress?.district}, ${selectedOrder.shippingAddress?.province}`}
            </p>
            <p>
              <strong>Phương thức thanh toán:</strong>{" "}
              {selectedOrder.paymentMethod || "-"}
            </p>
            <p>
              <strong>Thời gian đặt:</strong>{" "}
              {dayjs(selectedOrder.createdAt).format("HH:mm - DD/MM/YYYY")}
            </p>
            <hr className="my-2" />

            <div>
              <h4 className="font-semibold mb-2">Danh sách sản phẩm:</h4>
              <ul className="max-h-48 overflow-auto space-y-1 text-sm">
                {selectedOrder.items?.map((items, i) => (
                  <li key={i} className="border-b py-1">
                    {items.title} - SL: {items.quantity} - Giá:{" "}
                    {items.price.toLocaleString()}đ
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-4 font-bold text-right">
              Tổng cộng: {selectedOrder.total.toLocaleString()} VND
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DonHangAd;
