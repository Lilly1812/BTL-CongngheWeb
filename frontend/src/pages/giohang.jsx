import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCartStore } from "../store/cart";
import { useUserStore } from "../store/user";

function GioHang() {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const quantity = 1; // Giá trị mặc định cho số lượng sản phẩm
  const { cart, fetchCart } = useCartStore();
  const { user } = useUserStore();

  useEffect(() => {
    if (user?._id) {
      fetchCart(user._id);
    }
  }, [fetchCart, user]);

  const toggleSelectAll = (e) => {
    setSelectedItems(e.target.checked ? cart.map((item) => item.id) : []);
  };

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const removeSelectedItems = () => {
    // Giả sử chỉ xử lý frontend - nếu có API thì sẽ gọi từ store
    toast.success("Đã xóa sản phẩm đã chọn!");
    setSelectedItems([]);
  };

  const updateQuantity = (id, quantity) => {
    useCartStore.setState((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      ),
    }));
  };

  return (
    <div className="w-full p-4 bg-white rounded-2xl shadow-xl border border-gray-200">
      <div className="flex justify-between items-center p-4 border-b border-gray-300">
        <div className="text-2xl font-semibold text-gray-800">
          Giỏ hàng ({cart.length})
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex items-center gap-2 p-4">
          <input
            type="checkbox"
            className="w-6 h-6"
            onChange={toggleSelectAll}
            checked={selectedItems.length === cart.length && cart.length > 0}
          />
          <span className="text-lg font-semibold text-gray-700">
            Chọn tất cả
          </span>
        </div>
        {cart.length > 0 && (
          <div className="flex items-center gap-4 p-2">
            <button
              onClick={removeSelectedItems}
              className={`flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg transition-all hover:bg-red-600 ${
                selectedItems.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={selectedItems.length === 0}
            >
              <Trash2 size={18} /> Xóa đã chọn
            </button>
          </div>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500 py-10 text-lg">
          Giỏ hàng của bạn đang trống.
        </div>
      ) : (
        <div className="space-y-4 p-4 overflow-auto max-h-[calc(100vh-270px)]">
          {cart.map((item) => (
            <CardCart
              key={item.id}
              item={item}
              isSelected={selectedItems.includes(item.id)}
              toggleSelectItem={toggleSelectItem}
              updateQuantity={updateQuantity}
            />
          ))}
        </div>
      )}

      <TotalBar
        total={cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )}
        navigate={navigate}
        hasItems={cart.length > 0}
      />
    </div>
  );
}

function CardCart({ item, isSelected, toggleSelectItem, updateQuantity }) {
  return (
    <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-xl shadow-md border border-gray-200">
      <input
        type="checkbox"
        className="w-6 h-6 "
        checked={isSelected}
        onChange={() => toggleSelectItem(item.id)}
      />
      <div className="w-20 h-20 bg-white flex items-center justify-center rounded-xl shadow-sm border border-gray-300 overflow-hidden">
  <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
</div>

      <div className="flex-1">
        <div className="text-lg font-semibold text-gray-800">{item.title}</div>
        <div className="text-gray-500 text-sm">Sản phẩm chính hãng</div>
        <div className="flex items-center gap-2 mt-2">
          <button
            className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            -
          </button>
          <span className="text-lg font-semibold w-8 text-center">
            {item.quantity}
          </span>
          <button
            className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
        <div className="text-xl font-bold text-red-500 mt-2">
          {(item.price * item.quantity).toLocaleString()} VND
        </div>
      </div>
    </div>
  );
}

function TotalBar({ total, navigate, hasItems }) {
  return (
    <div className="bg-gray-900 p-4 mt-2 flex justify-between items-center text-white shadow-md rounded-xl">
      <div className="text-lg font-semibold">
        Tổng: {total.toLocaleString()} VND
      </div>
      <button
        className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
        onClick={() => navigate("/thanhtoan")}
      >
        {hasItems ? "Mua hàng" : "Tiếp tục mua sắm"}
      </button>
    </div>
  );
}

export default GioHang;
