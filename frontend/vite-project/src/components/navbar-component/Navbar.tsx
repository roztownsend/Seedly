import { useState } from "react";
import { ShoppingBag, Search } from "lucide-react";
import "../navbar-component/Navbar-styles.css";
function Navbar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [cartCount, setCartCount] = useState(3); // valor inicial mockado

    // Future: debounce + call to search API or local filter
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);

    };
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-left">
                        <span className="navbar-logo">Seedly</span>
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
        </>
    )
}
export default Navbar;