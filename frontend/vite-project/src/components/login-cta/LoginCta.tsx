import { Link } from "react-router-dom";
import "./LoginCta.css";

export const LoginCta: React.FC = () => {
    return (
        <div className="login-cta">
            Make sure you're signed up and logged in to get Seedly bonuses and special offers!
            <Link to="/signup">
                <button className="button-secondary sign-in-button">Sign up for a Seedly account</button>
            </Link>
            <Link to="/login">
                <button className="button-secondary sign-in-button">Login to Seedly</button>
            </Link>
        </div>
    )
};