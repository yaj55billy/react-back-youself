import { useState } from 'react';
import PropTypes from 'prop-types';
import ProductModal from '../components/ProductModal.jsx';
import DeleteConfirmModal from '../components/DeleteConfirmModal.jsx';
import axios from 'axios';

const API_BASE = "https://ec-course-api.hexschool.io/v2";
const API_PATH = "hexschool-billyji";

const Products = ({ products }) => {  
  // console.log('products 與分隔 -------');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenModal = (mode, product = null) => {
    setIsModalOpen(true);
    setModalMode(mode);
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null); 
  };

  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
    // 這裡處理表單提交邏輯 API
  };


    // useEffect(() => {
    //   console.log('isModalOpen state changed:', isModalOpen);
    // }, [isModalOpen]);
  
    // useEffect(() => {
    //   console.log('modalMode state changed:', modalMode);
    // }, [modalMode]);
  
    // useEffect(() => {
    //   console.log('selectedProduct state changed:', selectedProduct);
    // }, [selectedProduct]);


  const handleOpenDeleteModal = (product) => {
    setIsDeleteModalOpen(true);
    setSelectedProduct(product);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDelete = async(productId) => {
    console.log('Deleting product:', selectedProduct);
    // 這裡處理刪除邏輯

    // try {
    //   await axios.delete(`${API_BASE}/api/${API_PATH}/admin/product/${productId}`);
    //   window.location.reload();
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    // }
    handleCloseDeleteModal();
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
				<h2 className="text-2xl title">產品列表</h2>
        <button type='button' className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors w-full sm:w-auto text-center' onClick={() => handleOpenModal('create')}>建立新的產品</button>
			</div>

			{/* 產品列表 */}
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
				{products.map((product) => (
					<div
						key={product.id}
						className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4"
					>
						<div className="flex items-center justify-between mb-3">
							<span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
								{product.category}
							</span>
							<span
								className={`px-3 py-1 rounded-full text-sm font-medium ${
									product.is_enabled
										? "bg-green-100 text-green-800"
										: "bg-red-100 text-red-800"
								}`}
							>
								{product.is_enabled ? "啟用" : "未啟用"}
							</span>
						</div>

						<h3 className="text-lg title mb-4">
							{product.title}
						</h3>

						<div className="space-y-2 mb-4">
							<div className="flex items-center justify-between">
								<span className="text-gray-600">原價</span>
								<span className="text-gray-600 line-through">
									NT$ {product.origin_price.toLocaleString()}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-gray-600">售價</span>
								<span className="text-primary font-medium">
									NT$ {product.price.toLocaleString()}
								</span>
							</div>
						</div>

						<div className="flex items-center justify-end space-x-2 pt-3 border-t border-gray-100">
							<button type='button' className="px-3 py-1.5 font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors" onClick={() => handleOpenModal('edit', product)}>
								編輯
							</button>
							<button type='button' className="px-3 py-1.5 font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors" onClick={() => handleOpenDeleteModal(product)}>
								刪除
							</button>
						</div>
					</div>
				))}
			</div>
      <ProductModal
        isOpen={isModalOpen}
        mode={modalMode}
        onClose={handleCloseModal}
        selectedData={selectedProduct}
      />
      {/* onSubmit={handleSubmit} */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDelete}
        productTitle={selectedProduct?.title || ''}
        productId={selectedProduct?.id || ''}
      />
		</div>
  ) 
}

Products.propTypes = {
  products: PropTypes.array.isRequired,
};

export default Products;