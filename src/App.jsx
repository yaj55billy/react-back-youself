import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './pages/Login.jsx';
import Products from './pages/Products.jsx';

/**
  一般內文：text-gray-600
  標題：text-gray-900
  主色系 primary：'#3A5A80'
  'primary-light': '#4B6B91',
  'primary-dark': '#294867',
 */

const API_BASE = "https://ec-course-api.hexschool.io/v2";
const API_PATH = "hexschool-billyji";

const App = () => {
  const [isAuth, setisAuth] = useState(false);
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const getProducts = () => {
    axios.get(`${API_BASE}/api/${API_PATH}/admin/products`)
      .then(function (response) {
        setProducts(response.data.products);
      })
      .catch(function (error) {
        console.error(error.response.data.message);
      });
  };

  const signOut = () => {
    axios.post(`${API_BASE}/logout`)
      .then(function () {
        document.cookie = `hexToken=;expires=`;
        alert('您已登出！');
        setisAuth(false);
      })
      .catch(function (error) {
        console.log(error);
        alert('發生了一些問題，需再嘗試或檢查');
      })
      .finally(() => {  
        setLoading(false);
        window.location.reload();
      });
  };

  const signIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    axios.post(`${API_BASE}/admin/signin`, formData)
      .then(function (response) {
        const { token, expired } = response.data;
        document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
        axios.defaults.headers.common.Authorization = `${token}`;

        getProducts();
        setisAuth(true);
      })
      .catch(function () {
        alert("登入失敗，請再檢查一下帳密唷");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const checkAuth = () => {    
    axios.post(`${API_BASE}/api/user/check`)
      .then(function () {
        getProducts();
        setisAuth(true);
      })
      .catch(function (error) {
        setisAuth(false);
        console.log(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = `${token}`;

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
          <h2 className="text-xl font-semibold">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      {
        isAuth ? <><button type='button' className='text-xl p-3' onClick={signOut}>登出按鈕（測試）</button><Products products={products} tempProduct={tempProduct} setTempProduct={setTempProduct}/></> : <Login formData={formData} setFormData={setFormData} signIn={signIn}/>
      }
    </>
  )
};

export default App;
