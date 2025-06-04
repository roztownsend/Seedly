import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, User2 } from "lucide-react";
import "../navbar/Navbar.css";
import { useCartUniqueItems } from "../../stores/cartStore";
import { useSearchActions, useSearchQuery } from "../../stores/searchStore";
import {
  useAuthSession,
  useAuthActions,
  useIsAdmin,
} from "../../stores/authStore";

export default function Navbar() {
  const query = useSearchQuery();
  const { setQuery, search } = useSearchActions();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const isAdmin = useIsAdmin();
  const cartUniqueItems = useCartUniqueItems();
  const navigate = useNavigate();
  const location = useLocation();

  const session = useAuthSession();
  const { signOutUser } = useAuthActions();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    await search();
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  const handleKeyStroke = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  useEffect(() => {
    if (cartUniqueItems === 0) return;
    setAnimateCart(true);
    const timeout = setTimeout(() => setAnimateCart(false), 300);
    return () => clearTimeout(timeout);
  }, [cartUniqueItems]);

  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      setQuery("");
    }
  }, [location.pathname]);

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
                <Link to="/shop" className="navbar-link">
                  Seeds
                </Link>
                <Link to="mailto:9gqf16u0c@mozmail.com" className="navbar-link">
                  Contact Us
                </Link>
              </div>
              <div className="navbar-search">
                <Search className="navbar-search-icon" />
                <input
                  type="text"
                  placeholder="Search Seeds!"
                  className="navbar-search-input"
                  value={query}
                  onKeyDown={handleKeyStroke}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="navbar-right">
            <Link to="/cart" className="navbar-auth">
              <div className="navbar-cart">
                <ShoppingBag
                  className={`navbar-icons ${animateCart ? "pop" : ""}`}
                />
                {cartUniqueItems}
              </div>
            </Link>
            {session ? (
              <>
                <Link
                  to={isAdmin ? "/admin/dashboard" : "/dashboard"}
                  className="navbar-auth"
                >
                  Dashboard
                </Link>
                <Link to="/" onClick={signOutUser} className="navbar-auth">
                  Sign Out
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-auth">
                  Login
                </Link>
                <Link to="/signup" className="navbar-auth">
                  Sign Up
                </Link>
              </>
            )}
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
            <Link to="/cart" className="navbar-cart">
              <ShoppingBag
                className={`navbar-icons ${animateCart ? "pop" : ""}`}
              />
              {cartUniqueItems}
            </Link>
            <div className="relative">
              <button onClick={() => setShowUserMenu(!showUserMenu)}>
                <User2 className="navbar-icons" />
              </button>

              <div
                className={`user-menu ${
                  showUserMenu ? "user-menu-open" : "user-menu-closed"
                }`}
              >
                {session ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setShowUserMenu(false)}
                      className="user-menu-link"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/"
                      onClick={() => {
                        signOutUser();
                        setShowUserMenu(false);
                      }}
                      className="user-menu-link"
                    >
                      Sign Out
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setShowUserMenu(false)}
                      className="user-menu-link"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setShowUserMenu(false)}
                      className="user-menu-link"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
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
              placeholder="Search Seeds!"
              className="navbar-search-input"
              value={query}
              onKeyDown={handleKeyStroke}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="mobile-menu animate-fadeIn relative">
          <Link to="/shop" className="mobile-link">
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
