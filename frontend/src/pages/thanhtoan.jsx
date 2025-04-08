import { useState } from "react";

function ThanhToan() {
  return (
    <div className="w-full geo-regular bg-gray-100 p-4 rounded-xl">
      {/* Header */}
      <div className="flex justify-between bg-white text-gray-900 rounded-2xl p-3 shadow-md font-semibold text-lg">
        Thanh toán
      </div>

      {/* Địa chỉ giao hàng */}
      <div className="bg-white rounded-2xl p-4 mt-4 shadow-md">
        <div className="font-semibold text-lg mb-2 text-gray-800">Địa chỉ giao hàng</div>
        <div className="grid grid-cols-4 gap-4">
          <select className="p-3 rounded-lg bg-gray-100 focus:outline-none">
            <option>Chọn Tỉnh/Thành phố</option>
          </select>
          <select className="p-3 rounded-lg bg-gray-100 focus:outline-none">
            <option>Chọn Quận/Huyện</option>
          </select>
          <select className="p-3 rounded-lg bg-gray-100 focus:outline-none">
            <option>Chọn Phường/Xã</option>
          </select>
          <input
            type="text"
            placeholder="Nhập số nhà, đường..."
            className="p-3 rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="bg-white rounded-2xl overflow-auto max-h-[calc(100vh-380px)] p-4 mt-4 shadow-md">
        {[...Array(10)].map((_, index) => (
          <CardPayment key={index} />
        ))}
      </div>

      <TotalBar/>
    </div>
  );
}

function CardPayment() {
  return (
    <div className="w-full flex gap-4 shadow-sm p-4 rounded-xl items-center mt-2 bg-white hover:shadow-md transition-all">
      {/* Hình ảnh sản phẩm */}
      <div className="bg-gray-100 aspect-square w-24 rounded-xl flex items-center justify-center shadow-md">
        🛒
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex flex-1 flex-col">
        <div className="font-semibold text-lg text-gray-800">Title</div>
        <div className="text-gray-500 text-sm">Sản phẩm chính hãng</div>

        <div className="flex justify-between items-center mt-2">
          <div className="text-xl font-bold text-red-500">12345 VND</div>
          <div className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-lg font-semibold text-gray-700">
            x2
          </div>
        </div>
      </div>
    </div>
  );
}

function TotalBar() {
  const totalPrice = 500000;
  const shippingFee = 30000;
  const finalTotal = totalPrice + shippingFee;

  return (
    <div className="fixed bottom-[2%] left-[15%] w-[84%] p-4 flex justify-between items-center shadow-md text-white bg-gray-900 rounded-xl">
      {/* Chọn phương thức thanh toán - BÊN TRÁI */}
      <div className="flex flex-col">
        <div className="font-semibold mb-1">Phương thức thanh toán:</div>
        <select className="bg-white p-2 rounded-lg text-gray-800 focus:outline-none">
          <option>COD (Thanh toán khi nhận hàng)</option>
          <option>Chuyển khoản ngân hàng</option>
          <option>Ví điện tử (Momo, ZaloPay)</option>
        </select>
      </div>
      <div className="flex gap-16 items-center">
        {/* Tổng tiền - BÊN PHẢI */}
        <div className="text-sm">
          <div>Tiền hàng: {totalPrice.toLocaleString()} VND</div>
          <div>Phí ship: {shippingFee.toLocaleString()} VND</div>
          <div className="text-xl mt-2 font-semibold">Tổng: {finalTotal.toLocaleString()} VND</div>
        </div>

        {/* Nút thanh toán */}
        <button className="bg-blue-500 text-white px-6 py-2 h-20 rounded-lg font-semibold hover:bg-white hover:text-blue-500 transition-all">
          Thanh toán
        </button>
      </div>
    </div>
  );
}

export default ThanhToan;
