
import PropTypes from 'prop-types';

const Products = ({products, tempProduct, setTempProduct }) => {  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl title mb-4">產品列表 Week3</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-md text uppercase">產品名稱</th>
                  <th className="px-6 py-3 text-left text-md text uppercase">原價</th>
                  <th className="px-6 py-3 text-left text-md text uppercase">售價</th>
                  <th className="px-6 py-3 text-left text-md text uppercase">是否啟用</th>
                  <th className="px-6 py-3 text-left text-md text uppercase">查看細節</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">{item.title}</td>
                    <td className="px-6 py-4">{item.origin_price}</td>
                    <td className="px-6 py-4">{item.price}</td>
                    <td className="px-6 py-4">
                      {item.is_enabled ? <span className='text-primary'>已啟用</span> : <span className='text-red-500'>未啟用</span>}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setTempProduct(item)} 
                        className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md"
                      >
                        查看細節
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl title mb-4">單一產品細節</h2>
          {tempProduct ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={tempProduct.imageUrl} className="w-full h-64 object-cover" alt="主圖" />
              <div className="p-6">
                <h5 className="text-xl font-bold mb-2">
                  {tempProduct.title}
                  <span className="ml-2 px-2 py-1 text-sm text-white bg-primary rounded-full">{tempProduct.category}</span>
                </h5>
                <p className="text mb-2">商品描述：{tempProduct.description}</p>
                <p className="text mb-4">商品內容：{tempProduct.content}</p>
                <div className="flex items-center gap-2 mb-6">
                  <p className="text line-through">{tempProduct.origin_price}</p>
                  <p className="text-xl font-bold text-primary">{tempProduct.price} 元</p>
                </div>
                <h5 className="font-bold mb-3">更多圖片：</h5>
                <div className="grid grid-cols-2 gap-4">
                  {
                    tempProduct.imagesUrl.map((image, index) => {
                      return (
                        <img key={image + index} src={image} className="w-full h-32 object-cover rounded-md" alt="其他圖片" />
                      )
                    })
                  }
                </div>
              </div>
            </div>
          ) : (
            <p className="text text-center p-8 bg-gray-50 rounded-lg">請選擇一個商品查看</p>
          )}
        </div>
      </div>
    </div>
  ) 
}

Products.propTypes = {
  products: PropTypes.array.isRequired,
  tempProduct: PropTypes.object,
  setTempProduct: PropTypes.func.isRequired,
};

export default Products;