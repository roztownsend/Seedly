import "../footer/Footer.css";
import { Link } from "react-router-dom";
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/shop" className="navbar-link">
            Seeds
          </Link>
          <Link to="mailto:9gqf16u0c@mozmail.com" className="navbar-link">
            Contact Us
          </Link>
        </div>
        <div className="footer-logo">Seedly</div>
        <div className="footer-back">
          <button onClick={scrollToTop} className="footer-link">
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
