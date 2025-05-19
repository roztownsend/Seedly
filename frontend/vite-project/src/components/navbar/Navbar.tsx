import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, User2 } from "lucide-react";
import "../navbar/Navbar.css";
import { useCartUniqueItems } from "../../stores/cartStore";
export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const cartUniqueItems = useCartUniqueItems();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className="navbar hidden md:block">
        <div className="navbar-container">
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">
              Seedly
            </Link>
            <div className="navbar-links-search">
              <div className="navbar-links">
                <Link to="/seeds" className="navbar-link">
                  Seeds
                </Link>
                <Link to="/contact" className="navbar-link">
                  Contact Us
                </Link>
              </div>
              <div className="navbar-search">
                <Search className="navbar-search-icon" />
                <input
                  type="text"
                  placeholder="Search Seeds!"
                  className="navbar-search-input"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="navbar-right">
            <Link to="/cart" className="navbar-auth">
              <div className="navbar-cart">
                <ShoppingBag className="navbar-icons" />
                {cartUniqueItems}
              </div>
            </Link>
            <Link to="/login" className="navbar-auth">
              Login
            </Link>
            <Link to="/signup" className="navbar-auth">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* MOBILE NAVBAR */}
      <nav className="navbar md:hidden">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            Seedly
          </Link>
          <div className="navbar-mobile-icons">
            <div className="navbar-cart">
              <ShoppingBag className="navbar-icons" />
              <span className="text-black">{cartUniqueItems}</span>
            </div>
            <div className="relative">
              <button onClick={() => setShowUserMenu(!showUserMenu)}>
                <User2 className="navbar-icons" />
              </button>

              <div
                className={`user-menu ${
                  showUserMenu ? "user-menu-open" : "user-menu-closed"
                }`}
              >
                <Link
                  to="/login"
                  className="user-menu-link"
                  onClick={() => setShowUserMenu(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="user-menu-link"
                  onClick={() => setShowUserMenu(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="mobile-navbar-icons" />
              ) : (
                <Menu className="mobile-navbar-icons" />
              )}
            </button>
          </div>
        </div>

        <div className="mobile-search-wrapper">
          <div className="navbar-search">
            <Search className="navbar-search-icon" />
            <input
              type="text"
              placeholder="Search seeds!"
              className="navbar-search-input"
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="mobile-menu animate-fadeIn relative">
          <Link to="/seeds" className="mobile-link">
            Seeds
          </Link>
          <Link to="/contact" className="mobile-link">
            Contact Us
          </Link>
        </div>
      )}
    </>
  );
}
