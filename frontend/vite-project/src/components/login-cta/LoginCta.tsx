import { Link } from "react-router-dom";
import "./LoginCta.css";

export const LoginCta: React.FC = () => {
    return (
        <div className="login-cta">
            Make sure you're logged in to get Seedly bonuses and special offers!
            <Link to="/login">
                <button className="button-secondary sign-in-button">Login to your Seedly account</button>
            </Link>
        </div>
    )
};