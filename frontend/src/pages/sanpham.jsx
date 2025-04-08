import { useEffect } from "react";
import { useProductStore } from "../store/product";
import { FiShoppingCart, FiBox } from "react-icons/fi";
import { useCartStore } from "../store/cart";
import { useUserStore } from "../store/user";
import { toast } from "react-toastify";
function SanPham() {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between rounded-2xl p-4 text-lg font-bold shadow-md text-white" style={{ backgroundColor: '#A97F7F' }}>
        <div className="flex items-center gap-2"> 
          <FiBox className="text-xl" />
          <span>Sản phẩm</span>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="bg-gray-50 rounded-2xl overflow-auto max-h-[calc(100vh-110px)] p-4 mt-4 shadow-md">
        {products.length > 0 ? (
          <div className="grid grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg p-6">Không có sản phẩm nào.</div>
        )}
      </div>
    </div>
  );
}

function Card({ product }) {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = async () => {
    if (!user || !user._id) {
      alert("Bạn cần đăng nhập trước khi thêm vào giỏ hàng.");
      return;
    }

    await addToCart({
      userId: user._id,
      productId: product._id,
      quantity: 1,
    });

    toast?.success?.("Đã thêm vào giỏ hàng!"); // nếu có dùng toast
  };
  return (
    <div className="aspect-[4/5] rounded-2xl bg-white shadow-lg hover:shadow-xl transition duration-300">
      <div className="aspect-square relative group rounded-t-2xl bg-gray-200 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover rounded-t-2xl"
        />
        <div className="absolute inset-0 bg-black/60 text-white text-sm p-3 hidden group-hover:flex flex-col justify-center gap-1 transition duration-300">
          <p><strong>Chất liệu:</strong> {product.details.material}</p>
          <p><strong>Khối lượng:</strong> {product.details.weight}</p>
          <p><strong>Mác xi măng:</strong> {product.details.grade}</p>
          <p><strong>Độ mịn:</strong> {product.details.fineness}</p>
          <p><strong>Cường độ nén:</strong> {product.details.compressive_strength}</p>
          <p><strong>SO₃:</strong> {product.details.SO3_content}</p>
          <p><strong>NSX:</strong> {product.details.manufacturer}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="text-lg font-semibold">{product.name}</div>
        <div className="text-blue-600 font-bold mt-2">
          {product.price.toLocaleString()} VND
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-3 flex items-center justify-center hover:bg-blue-600 gap-2"
        >
          <FiShoppingCart />
          <span>Thêm vào giỏ</span>
        </button>
      </div>
    </div>
  );
}


export default SanPham;
