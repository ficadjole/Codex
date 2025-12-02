import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { authApi } from './api_services/authApi/AuthAPIService';
import { AuthProvider } from './contexts/auth_context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage authApi={authApi}/>}/>      
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;