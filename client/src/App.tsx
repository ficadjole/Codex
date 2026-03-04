import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/auth_context/AuthContext';
import HomePage from './pages/HomePage';
import { authApi } from './api_services/authApi/AuthAPIService';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import ScrollToTop from './components/layout/ScrollToTop';
import UserOrdersPage from './pages/orders/UserOrdersPage';
import AdminOrdersPage from './pages/orders/AdminOrdersPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <ScrollToTop />
       <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage authApi={authApi} />} />
            <Route path='/orders' element={<UserOrdersPage/>} />
            <Route path='/admin/orders' element={<AdminOrdersPage />}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;