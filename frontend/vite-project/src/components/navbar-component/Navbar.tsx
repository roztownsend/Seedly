import { useState } from "react";
import { ShoppingBag, Search, Menu, X, User2 } from "lucide-react";
import "../navbar-component/Navbar-styles.css";

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [cartCount, setCartCount] = useState<number>(0);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            {/* DESKTOP NAVBAR */}
            <nav className="navbar hidden md:block">
                <div className="navbar-container">
                    <div className="navbar-left">
                        <span className="navbar-logo">Seedly</span>
                        <div className="navbar-links-search">
                            <div className="navbar-links">
                                <a href="#" className="navbar-link">Seeds</a>
                                <a href="#" className="navbar-link">Offers</a>
                                <a href="#" className="navbar-link">Contact Us</a>
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
                        <div className="navbar-cart">
                            <ShoppingBag className="w-5 h-5 text-black" />
                            <span className="text-black">{cartCount}</span>
                        </div>
                        <a href="#" className="navbar-auth">Login</a>
                        <a href="#" className="navbar-auth">Sign Up</a>
                    </div>
                </div>
            </nav>

            {/* MOBILE NAVBAR */}
            <nav className="navbar md:hidden">
                <div className="navbar-container">
                    <span className="navbar-logo">Seedly</span>
                    <div className="navbar-mobile-icons">
                        <div className="navbar-cart">
                            <ShoppingBag className="w-5 h-5 text-black" />
                            <span className="text-black">{cartCount}</span>
                        </div>
                        <User2 className="w-5 h-5 text-black" />
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
                        </button>
                    </div>
                </div>

                <div className="mobile-search-wrapper">
                    <div className="navbar-search">
                        <Search className="navbar-search-icon mr-2" />
                        <input
                            type="text"
                            placeholder="Search seeds"
                            className="navbar-search-input bg-transparent w-full"
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </nav>
            {isMenuOpen && (
                <div className="mobile-menu animate-fadeIn relative">
                    <button
                        className="absolute top-4 right-4"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <X className="w-6 h-6 text-black" />
                    </button>
                    <a href="#" className="mobile-link">Seeds</a>
                    <a href="#" className="mobile-link">Offers</a>
                    <a href="#" className="mobile-link">Contact Us</a>
                </div>
            )}
        </>
    );
}
