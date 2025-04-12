import { useEffect, useState } from "react";
import { useOrderStore } from "../store/order.js";
import { useUserStore } from "../store/user.js";
import dayjs from "dayjs";
import Swal from "sweetalert2";

function DonHang() {
  const [selectedStatus, setSelectedStatus] = useState("Chờ xác nhận");
  const { orders, fetchOrders, cancelOrder } = useOrderStore();
  const { user } = useUserStore();
  useEffect(() => {
    fetchOrders();
  }, [user, fetchOrders]);
  
  const filteredOrders =
    orders?.filter((order) => order.status === selectedStatus) || [];

  return (
    <div className="w-full p-4 bg-gray-100 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Đơn hàng</h2>

      <div className="flex gap-4 bg-white shadow-md rounded-xl p-2 overflow-x-auto">
        {[
          "Chờ xác nhận",
          "Đã xác nhận",
          "Đang giao hàng",
          "Đã giao",
          "Chờ hủy",
          "Đã hủy",
        ].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              selectedStatus === status
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedStatus(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md mt-4 p-4 overflow-auto max-h-[calc(100vh-180px)]">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <CardOrder
              key={order._id}
              orderId={order.orderId}
              items={order.items}
              totalAmount={order.total}
              status={order.status}
              createdAt={order.createdAt}
              address={order.shippingAddress}
              onCancel={() => cancelOrder(order._id)}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-4">
            Không có đơn hàng nào
          </div>
        )}
      </div>
    </div>
  );
}

function CardOrder({
  orderId,
  items = [],
  totalAmount,
  status,
  createdAt,
  address,
  onCancel,
}) {
  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Bạn có chắc muốn hủy đơn?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hủy đơn",
      cancelButtonText: "Không",
    });

    if (result.isConfirmed) {
      try {
        await onCancel();
        Swal.fire("Đã gửi yêu cầu", "Đơn hàng đã được yêu cầu hủy.", "success");
      } catch (err) {
        Swal.fire("Thất bại", "Không thể hủy đơn hàng. Vui lòng thử lại sau.", "error");
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Chờ xác nhận":
        return "bg-blue-400 text-white";
      case "Đã xác nhận":
        return "bg-yellow-400 text-gray-800";
      case "Đang giao hàng":
        return "bg-orange-400 text-white";
      case "Đã giao":
        return "bg-green-500 text-white";
      case "Đã hủy":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <div className="relative bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-4">
      <div className="text-lg font-semibold text-gray-800 mb-1">
        Mã đơn: {orderId}
      </div>

      {createdAt && (
        <div className="text-sm text-gray-500 mb-1">
          Đặt lúc: {dayjs(createdAt).format("HH:mm - DD/MM/YYYY")}
        </div>
      )}

      {address && (
        <div className="text-sm text-gray-600 mb-3">
          Địa chỉ: {address.detail}, {address.ward}, {address.district},{" "}
          {address.province}
        </div>
      )}

      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-gray-600 border-b pb-2"
          >
            <div className="flex items-center gap-3">
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-gray-500">
                  Số lượng: {item.quantity}
                </div>
              </div>
            </div>
            <div className="font-semibold">
              {item.price.toLocaleString()} VND
            </div>
          </div>
        ))}
      </div>

      <div className="font-semibold mt-2 text-right text-blue-600">
        Tổng tiền: {totalAmount?.toLocaleString()} VND
      </div>

      <div
        className={`absolute top-4 right-4 px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor(
          status
        )}`}
      >
        {status}
      </div>

      {(status === "Chờ xác nhận" || status === "Đang xử lý") && (
        <button
          onClick={handleCancel}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Hủy đơn hàng
        </button>
      )}
    </div>
  );
}

export default DonHang;
