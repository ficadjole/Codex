import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/auth_context/AuthContext';
import { authApi } from './api_services/authApi/AuthAPIService';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/layout/ScrollToTop';
import UserOrdersPage from './pages/orders/UserOrdersPage';
import AdminOrdersPage from './pages/adminPanel/AdminOrdersPage';
import { orderApi } from "./api_services/orderApi/OrderApiService";
import OrderDetailsPage from './pages/orders/OrderDetailsPage';
import AdminAddItem from './pages/adminPanel/AdminAddItem';
import AdminItems from './pages/adminPanel/AdminItems';
import AdminLayout from './components/layout/AdminLayout';
import GenreAdminPanel from './pages/adminPanel/GenreAdminPanel';
import { genreApi } from './api_services/genreApi/GenreApiSevice';
import { itemApi } from './api_services/itemApi/ItemApiService';
import { itemImageApi } from './api_services/itemImageApi/ItemImageApiService';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage itemApi={itemApi}/>} />
            <Route path="/login" element={<LoginPage authApi={authApi} />} />
            <Route path="/orders" element={<UserOrdersPage orderApi={orderApi} />} />
            <Route path="/orders/:orderId" element={<OrderDetailsPage orderApi={orderApi} />} />
            <Route path="/admin/orders/:orderId" element={<OrderDetailsPage orderApi={orderApi} />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="items" element={<AdminItems />} />
              <Route path="/admin/orders" element={<AdminOrdersPage orderApi={orderApi} />} />
              <Route path="items/add" element={<AdminAddItem genreApi={genreApi} itemApi={itemApi} itemImageApi={itemImageApi}/>} />
              <Route path="orders" element={<AdminOrdersPage orderApi={orderApi} />} />
              <Route path="genres" element={<GenreAdminPanel genreApi={genreApi} />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;