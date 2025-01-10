import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Services/AuthContext.jsx';
import Login from './Pages/Login.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Catalog from './Pages/Catalog.jsx';
import Members from './Pages/Members.jsx';
import ProtectedRoutes from './Services/ProtectedRoutes.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />

          <Route
            path="/Dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/Catalog"
            element={
              <ProtectedRoutes>
                <Catalog />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/Members"
            element={
              <ProtectedRoutes>
                <Members />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
