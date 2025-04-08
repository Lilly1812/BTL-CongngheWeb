function ChiTiet() {
  return (
    <div className="w-full geo-regular">
      {/* Header */}
      <div
        className="flex justify-between bg-gray-100 rounded-2xl p-4 mb-4 text-lg font-semibold text-white shadow-md"
        style={{ backgroundColor: "#A97F7F" }}
      >
        Chi tiết sản phẩm
      </div>

      {/* Nội dung chính */}
      <div className="bg-white rounded-2xl overflow-auto max-h-[calc(100vh-110px)] p-6 shadow-md border border-gray-200">
        {/* Thông tin tổng quan */}
        <div className="flex gap-6">
          {/* Hình ảnh sản phẩm */}
          <div className="bg-gray-200 rounded-2xl aspect-square w-[46%] flex items-center justify-center text-gray-700 font-semibold text-xl">
            🏗 Xi măng
          </div>

          {/* Thông tin sản phẩm */}
          <div className="flex flex-col gap-4 w-1/2">
            <h2 className="text-2xl font-semibold text-gray-900">
              Xi măng Portland PCB40
            </h2>
            <p className="text-gray-600">
              Xi măng chất lượng cao, phù hợp cho công trình dân dụng và công
              nghiệp.
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Số lượng còn:</span> 500 bao
            </p>

            {/* Thông tin chi tiết */}
            <h3 className="text-xl font-semibold text-gray-800">
              Thông tin chi tiết
            </h3>
            <div className="mt-2 text-gray-600 space-y-2">
              <p>
                <span className="font-medium">Chất liệu:</span> Clinker, thạch
                cao, phụ gia
              </p>
              <p>
                <span className="font-medium">Khối lượng tịnh:</span> 50 kg/bao
              </p>
              <p>
                <span className="font-medium">Mác xi măng:</span> PCB40
              </p>
              <p>
                <span className="font-medium">Độ mịn:</span> ≥ 3.200 cm²/g
              </p>
              <p>
                <span className="font-medium">Cường độ chịu nén:</span> ≥ 40 MPa
              </p>
              <p>
                <span className="font-medium">Hàm lượng SO3:</span> ≤ 3.5%
              </p>
              <p>
                <span className="font-medium">Nhà sản xuất:</span> VICEM Hà Tiên
              </p>
            </div>

            {/* Giá và nút thêm vào giỏ hàng */}
            <div>
              <div className="text-red-500 text-xl font-semibold">
                120.000 VND / bao
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button
                  className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                  
                >
                  -
                </button>
                <span className="text-lg font-semibold w-8 text-center">
                  22
                </span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                  
                >
                  +
                </button>
              </div>
              <button className="bg-gray-900 text-white px-6 py-3 my-4 rounded-lg hover:bg-gray-700 transition-all w-fit">
                🛒 Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChiTiet;
