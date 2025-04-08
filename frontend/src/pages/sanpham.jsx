import { useEffect } from "react";
import { useProductStore } from "../store/product";
import { FiShoppingCart, FiBox } from "react-icons/fi";

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
  return (
    <div className="aspect-[4/5] rounded-2xl bg-white shadow-lg hover:shadow-xl transition duration-300">
      <div className="aspect-square rounded-t-2xl bg-gray-200 flex items-center justify-center text-gray-500 font-semibold text-2xl">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover rounded-t-2xl" />
      </div>
      <div className="p-4">
        <div className="text-lg font-semibold">{product.name}</div>
        <div className="text-blue-600 font-bold mt-2">{product.price.toLocaleString()} VND</div>
        <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-3 flex items-center justify-center hover:bg-blue-600 gap-2">
          <FiShoppingCart />
          <span>Thêm vào giỏ</span>
        </button>
      </div>
    </div>
  );
}

export default SanPham;
