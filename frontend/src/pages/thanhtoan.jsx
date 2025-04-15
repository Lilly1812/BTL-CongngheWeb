import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useOrderStore } from "../store/order";
import { useUserStore } from "../store/user";

function ThanhToan() {
  const { state } = useLocation();
  const selectedItems = state?.selectedItems || [];
  const total = state?.total || 0;
  const { createOrder } = useOrderStore();
  const { user } = useUserStore();
  const navigate = useNavigate();

  const shippingFee = 30000;
  const finalTotal = total + shippingFee;

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [detailAddress, setDetailAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [orderId, setOrderId] = useState(null);

  const bankCode = "TPB";
  const accountNumber = "44418120704";

  const qrURL = orderId
    ? `https://img.vietqr.io/image/${bankCode}-${accountNumber}-qr_only.png?amount=${finalTotal}&addInfo=ThanhToan%23${orderId}`
    : null;

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  const handleProvinceChange = (e) => {
    const province = provinces.find((p) => p.code === parseInt(e.target.value));
    setSelectedProvince(province);
    setDistricts(province.districts);
    setSelectedDistrict(null);
    setWards([]);
    setSelectedWard(null);
  };

  const handleDistrictChange = (e) => {
    const district = districts.find((d) => d.code === parseInt(e.target.value));
    setSelectedDistrict(district);
    setWards(district.wards);
    setSelectedWard(null);
  };

  const handleWardChange = (e) => {
    const ward = wards.find((w) => w.code === parseInt(e.target.value));
    setSelectedWard(ward);
  };

  const handleThanhToan = async () => {
    if (!selectedProvince || !selectedDistrict || !selectedWard || !detailAddress) {
      Swal.fire("Thiếu thông tin", "Vui lòng điền đầy đủ địa chỉ giao hàng!", "warning");
      return;
    }
  
    const result = await Swal.fire({
      title: "Xác nhận thanh toán?",
      text: "Bạn có chắc muốn tạo đơn hàng với thông tin đã nhập?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    });
  
    if (result.isConfirmed) {
      const newOrder = {
        items: selectedItems,
        total: finalTotal,
        shippingAddress: {
          detail: detailAddress,
          ward: selectedWard.name,
          district: selectedDistrict.name,
          province: selectedProvince.name,
        },
        paymentMethod,
        status: paymentMethod === "COD" ? "Chờ xác nhận" : "Chờ chuyển khoản",
      };
  
      const token = localStorage.getItem("token"); // hoặc từ auth store
      const response = await createOrder(newOrder, token);
      setOrderId(response.orderId);
  
      if (paymentMethod === "Chuyển khoản ngân hàng") {
        Swal.fire({
          title: "Quét mã để thanh toán",
          html: `
            <div style="display: flex; flex-direction: column; align-items: center;">
              <img src="https://img.vietqr.io/image/${bankCode}-${accountNumber}-qr_only.png?amount=${finalTotal}&addInfo=ThanhToan%23${response.orderId}" alt="QR Code" style="width: 200px; height: 200px; margin-bottom: 1rem;" />
              <div style="text-align: left; font-size: 14px;">
                <p><strong>Mã đơn hàng:</strong> ${response.orderId}</p>
                <p><strong>Số tiền:</strong> ${finalTotal.toLocaleString()} VND</p>
                <p><strong>Ghi chú chuyển khoản:</strong> ThanhToan#${response.orderId}</p>
              </div>
            </div>
          `,
          confirmButtonText: "Hoàn thành",
        }).then(() => navigate("/"));
      } else {
        Swal.fire({
          title: "Đặt hàng thành công",
          text: "Đơn hàng của bạn đã được tạo. Cảm ơn bạn!",
          icon: "success",
          confirmButtonText: "Xem sản phẩm",
        }).then(() => navigate("/"));
      }
    }
  };
  

  return (
    <div className="w-full geo-regular bg-gray-100 p-4 rounded-xl">
      <div className="flex justify-between bg-white text-gray-900 rounded-2xl p-3 shadow-md font-semibold text-lg">
        Thanh toán
      </div>

      {/* Địa chỉ giao hàng */}
      <div className="bg-white rounded-2xl p-4 mt-4 shadow-md">
        <div className="font-semibold text-lg mb-2 text-gray-800">Địa chỉ giao hàng</div>
        <div className="grid grid-cols-4 gap-4">
          <select className="p-3 rounded-lg bg-gray-100" onChange={handleProvinceChange} value={selectedProvince?.code || ""}>
            <option value="">Chọn Tỉnh/Thành phố</option>
            {provinces.map((p) => (
              <option key={p.code} value={p.code}>{p.name}</option>
            ))}
          </select>

          <select className="p-3 rounded-lg bg-gray-100" onChange={handleDistrictChange} value={selectedDistrict?.code || ""} disabled={!districts.length}>
            <option value="">Chọn Quận/Huyện</option>
            {districts.map((d) => (
              <option key={d.code} value={d.code}>{d.name}</option>
            ))}
          </select>

          <select className="p-3 rounded-lg bg-gray-100" onChange={handleWardChange} value={selectedWard?.code || ""} disabled={!wards.length}>
            <option value="">Chọn Phường/Xã</option>
            {wards.map((w) => (
              <option key={w.code} value={w.code}>{w.name}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Nhập số nhà, đường..."
            className="p-3 rounded-lg bg-gray-100"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
          />
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="bg-white rounded-2xl overflow-auto max-h-[calc(100vh-380px)] p-4 mt-4 shadow-md">
        {selectedItems.map((item) => (
          <CardPayment
            key={item.productId}
            title={item.title}
            image={item.image}
            price={item.price}
            quantity={item.quantity}
          />
        ))}
      </div>

      <div className="h-30" />
      <TotalBar
        total={total}
        shippingFee={shippingFee}
        finalTotal={finalTotal}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onSubmit={handleThanhToan}
      />
    </div>
  );
}

function CardPayment({ title, image, price, quantity }) {
  return (
    <div className="w-full flex gap-4 shadow-sm p-4 rounded-xl items-center mt-2 bg-white hover:shadow-md transition-all">
      <div className="bg-gray-100 aspect-square w-24 rounded-xl flex items-center justify-center shadow-md overflow-hidden">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="font-semibold text-lg text-gray-800">{title}</div>
        <div className="text-gray-500 text-sm">Sản phẩm chính hãng</div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-xl font-bold text-red-500">{price.toLocaleString()} VND</div>
          <div className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-lg font-semibold text-gray-700">x{quantity}</div>
        </div>
      </div>
    </div>
  );
}

function TotalBar({ total, shippingFee, finalTotal, paymentMethod, setPaymentMethod, onSubmit }) {
  return (
    <div className="fixed bottom-[2%] left-[15%] w-[84%] p-4 flex justify-between items-center shadow-md text-white bg-gray-900 rounded-xl">
      <div className="flex flex-col">
        <div className="font-semibold mb-1">Phương thức thanh toán:</div>
        <select
          className="bg-white p-2 rounded-lg text-gray-800"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="COD">COD (Thanh toán khi nhận hàng)</option>
          <option value="Chuyển khoản ngân hàng">Chuyển khoản ngân hàng</option>
        </select>
      </div>

      <div className="flex gap-16 items-center">
        <div className="text-sm">
          <div>Tiền hàng: {total.toLocaleString()} VND</div>
          <div>Phí ship: {shippingFee.toLocaleString()} VND</div>
          <div className="text-xl mt-2 font-semibold">Tổng: {finalTotal.toLocaleString()} VND</div>
        </div>

        <button
          onClick={onSubmit}
          className="bg-blue-500 text-white px-6 py-2 h-20 rounded-lg font-semibold hover:bg-white hover:text-blue-500 transition-all"
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
}

export default ThanhToan;
