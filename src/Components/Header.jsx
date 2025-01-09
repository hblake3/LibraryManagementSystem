import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { useAuth } from '../Services/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { handleLogOut } = useAuth();

  const handleLogoutAndNavigate = async () => {
    await handleLogOut();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a book..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <Search className="search-icon" />
        </div>

        <nav className="nav-container">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/catalog" className="nav-link">
            Catalog
          </Link>
          <Link to="/members" className="nav-link">
            Members
          </Link>
          <Link to="#" className="nav-link">
            Settings
          </Link>
          <Link to="#" className="nav-link">
            Reports
          </Link>
          <Link onClick={handleLogoutAndNavigate} className="nav-link">
            Signout
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
