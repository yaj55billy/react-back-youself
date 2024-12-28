/**
  
  登入與驗證：
  登入：/v2/admin/signin
  登出：/v2/logout
  驗證：/v2/api/user/check

  管理者：
  取得產品(get)：/v2/api/{api_path}/admin/products/all
  取得產品(get)：/v2/api/{api_path}/admin/products
  新增產品(post)：/v2/api/{api_path}/admin/product
  編輯產品(put)：/v2/api/{api_path}/admin/product/{id}
  刪除產品(delete)：/v2/api/{api_path}/admin/product/{id}
  取得訂單(get)：/v2/api/{api_path}/admin/orders
  編輯訂單(put)：/v2/api/{api_path}/admin/order/{id}
  刪除訂單(delete)：/v2/api/{api_path}/admin/order/{id}
  刪除所有訂單(delete)：/v2/api/{api_path}/admin/orders/all
  取得優惠券(get)：/v2/api/{api_path}/admin/coupons
  新增優惠券(post)：/v2/api/{api_path}/admin/coupon
  編輯優惠券(put)：/v2/api/{api_path}/admin/coupon/{id}
  刪除優惠券(delete)：/v2/api/{api_path}/admin/coupon/{id}
  上傳圖片(post)：/v2/api/{api_path}/admin/upload
  取得文章(get)：/v2/api/{api_path}/admin/articles
  取得單篇文章(get)：/v2/api/{api_path}/admin/article/{id}
  編輯單篇文章(put)：/v2/api/{api_path}/admin/article/{id}
  刪除文章(delete)：/v2/api/{api_path}/admin/article/{id}
  新增文章(post)：/v2/api/{api_path}/admin/article

  客戶端：
  取得產品(get)：/v2/api/{api_path}/products/all
  取得產品(get)：/v2/api/{api_path}/products
  取得單一產品(get)：/v2/api/{api_path}/product/{id}
  新增購物車(post)：/v2/api/{api_path}/cart
  取得購物車(get)：/v2/api/{api_path}/cart   
  編輯購物車(put)：/v2/api/{api_path}/cart/{id}
  刪除購物車單筆(delete)：/v2/api/{api_path}/cart/{id}
  刪除購物車所有(delete)：/v2/api/{api_path}/carts
  優惠券套用(post)：/v2/api/{api_path}/coupon
  結帳新增訂單(post)：/v2/api/{api_path}/order
  結帳取得單筆訂單(get)：/v2/api/{api_path}/order/{id}
  結帳取得所有訂單(get)：/v2/api/{api_path}/orders
  付款(post)：/v2/api/{api_path}/pay/{id}
  取得文章(get)：/v2/api/{api_path}/articles
  取得單篇文章(get)：/v2/api/{api_path}/article/{id}
 */

import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

// 創建 axios 後台實例
export const apiAuth = axios.create({
	baseURL: `${API_BASE}`,
	headers: {
		"Content-Type": "application/json",
	},
});
// 創建 axios 前台實例
export const api = axios.create({
	baseURL: `${API_BASE}`,
	headers: {
		"Content-Type": "application/json",
	},
});

export const authLogin = async (formData) => {
	const response = await apiAuth.post(`${API_BASE}/admin/signin`, formData);
	return response.data;
};

export const authCheck = async () => {
	const response = await apiAuth.post(`${API_BASE}/api/user/check`);
	return response.data;
};

export const authLogout = async () => {
	const response = await apiAuth.post(`${API_BASE}/logout`);
	return response.data;
};

export const authUploadImage = async (formData) => {
	const response = await apiAuth.post(
		`${API_BASE}/api/${API_PATH}/admin/upload`,
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}
	);
	return response.data;
};

export const authGetProducts = async (page) => {
	const response = await apiAuth.get(
		`${API_BASE}/api/${API_PATH}/admin/products?page=${page}`
	);
	return response.data;
};

export const authCreateProduct = async (data) => {
	const response = await apiAuth.post(
		`${API_BASE}/api/${API_PATH}/admin/product`,
		{ data }
	);
	return response.data;
};

export const authEditProduct = async (data) => {
	const response = await apiAuth.put(
		`${API_BASE}/api/${API_PATH}/admin/product/${data.id}`,
		{ data }
	);
	return response.data;
};

export const authDeleteProduct = async (productId) => {
	const response = await apiAuth.delete(
		`${API_BASE}/api/${API_PATH}/admin/product/${productId}`
	);
	return response.data;
};

export const getProducts = async (page) => {
	const response = await api.get(
		`${API_BASE}/api/${API_PATH}/products?page=${page}`
	);
	return response.data;
};

export const getCarts = async () => {
	const response = await api.get(`${API_BASE}/api/${API_PATH}/cart`);
	return response.data;
	// carts、final_total...
};

export const createCart = async (data) => {
	const response = await api.post(`${API_BASE}/api/${API_PATH}/cart`, { data });
	return response.data;
};

export const editCart = async (data, id) => {
	const response = await api.put(`${API_BASE}/api/${API_PATH}/cart/${id}`, {
		data,
	});
	return response.data;
};

export const deleteCart = async (id) => {
	const response = await api.delete(`${API_BASE}/api/${API_PATH}/cart/${id}`);
	return response.data;
};

export const deleteAllCarts = async () => {
	const response = await api.delete(`${API_BASE}/api/${API_PATH}/carts`);
	return response.data;
};
