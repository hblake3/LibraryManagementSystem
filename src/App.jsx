import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Services/AuthContext.jsx';
import Login from './Pages/Login.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Catalog from './Pages/Catalog.jsx';
import Members from './Pages/Members.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Catalog" element={<Catalog />} />
            <Route path="/Members" element={<Members />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
