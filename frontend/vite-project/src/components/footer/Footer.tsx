import "../footer/Footer.css";
export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-links">
                    <a href="#" className="footer-link">Seeds</a>
                    <a href="#" className="footer-link">Offers</a>
                    <a href="#" className="footer-link">Contact Us</a>
                </div>
                <div className="footer-logo">Seedly</div>
                <div className="footer-back">
                    <button onClick={scrollToTop} className="footer-link">Back to Top</button>
                </div>
            </div>
        </footer>
    );
}