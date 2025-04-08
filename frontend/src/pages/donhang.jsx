import { useState } from "react";

function DonHang() {
    const [selectedStatus, setSelectedStatus] = useState("Chờ xác nhận");

    const orders = [
        { orderId: "DH123456", products: [{ title: "Sản phẩm 1", price: 200000 }, { title: "Sản phẩm 2", price: 350000 }], totalAmount: 550000, status: "Chờ xác nhận" },
        { orderId: "DH789101", products: [{ title: "Sản phẩm A", price: 150000 }, { title: "Sản phẩm B", price: 450000 }], totalAmount: 600000, status: "Đang giao hàng" },
        { orderId: "DH111213", products: [{ title: "Sản phẩm X", price: 500000 }], totalAmount: 500000, status: "Giao thành công" },
        { orderId: "DH222333", products: [{ title: "Sản phẩm C", price: 320000 }, { title: "Sản phẩm D", price: 210000 }], totalAmount: 530000, status: "Đơn hủy" },
        { orderId: "DH000001", products: [{ title: "Sản phẩm 1", price: 200000 }, { title: "Sản phẩm 2", price: 350000 }], totalAmount: 550000, status: "Chờ xác nhận" },
        { orderId: "DH000002", products: [{ title: "Sản phẩm A", price: 150000 }, { title: "Sản phẩm B", price: 450000 }], totalAmount: 600000, status: "Đang giao hàng" },
        { orderId: "DH000003", products: [{ title: "Sản phẩm X", price: 500000 }], totalAmount: 500000, status: "Giao thành công" },
        { orderId: "DH000004", products: [{ title: "Sản phẩm C", price: 320000 }, { title: "Sản phẩm D", price: 210000 }], totalAmount: 530000, status: "Đơn hủy" },
        { orderId: "DH000005", products: [{ title: "Sản phẩm Y", price: 290000 }, { title: "Sản phẩm Z", price: 180000 }], totalAmount: 470000, status: "Chờ xác nhận" },
        { orderId: "DH000006", products: [{ title: "Sản phẩm M", price: 250000 }, { title: "Sản phẩm N", price: 320000 }], totalAmount: 570000, status: "Đang chuẩn bị" },
        { orderId: "DH000007", products: [{ title: "Sản phẩm T", price: 200000 }], totalAmount: 200000, status: "Giao thành công" },
        { orderId: "DH000008", products: [{ title: "Sản phẩm G", price: 500000 }, { title: "Sản phẩm H", price: 150000 }], totalAmount: 650000, status: "Đơn hủy" },
    ];

    const filteredOrders = orders.filter(order => order.status === selectedStatus);

    return (
        <div className="w-full p-4 bg-gray-100 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Đơn hàng</h2>

            <div className="flex gap-4 bg-white shadow-md rounded-xl p-2 overflow-x-auto">
                {["Chờ xác nhận", "Đang chuẩn bị", "Đang giao hàng", "Giao thành công", "Đơn hủy"].map((status) => (
                    <button
                        key={status}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${selectedStatus === status ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
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
                            key={order.orderId}
                            orderId={order.orderId}
                            products={order.products}
                            totalAmount={order.totalAmount}
                            status={order.status}
                        />
                    ))
                ) : (
                    <div className="text-center text-gray-500 mt-4">Không có đơn hàng nào</div>
                )}
            </div>
        </div>
    );
}

function CardOrder({ orderId, products, totalAmount, status }) {
    return (
        <div className="relative bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-4">
            <div className="text-lg font-semibold text-gray-800">Mã đơn: {orderId}</div>
            <div className="mt-2 space-y-2">
                {products.map((product, index) => (
                    <div key={index} className="flex justify-between text-gray-600 border-b pb-1">
                        <span>{product.title}</span>
                        <span>{product.price.toLocaleString()} VND</span>
                    </div>
                ))}
            </div>
            <div className="font-semibold mt-2 text-right text-blue-600">
                Tổng tiền: {totalAmount.toLocaleString()} VND
            </div>
            <div className="absolute top-2 right-4 bg-yellow-400 text-gray-800 px-3 py-1 rounded-lg text-sm font-semibold">
                {status}
            </div>
        </div>
    );
}

export default DonHang;