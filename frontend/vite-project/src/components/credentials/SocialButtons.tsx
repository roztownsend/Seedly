import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { handleGoogleLogin } from "../../socialAuthHandlers/googleOAuth";
import { handleFacebookLogin } from "../../socialAuthHandlers/facebookOAuth";
function SocialButtons() {
  return (
    <div className="social-buttons-container">
      <button onClick={handleFacebookLogin} className="button-secondary">
        <FaFacebookF className="social-button-icon" /> Continue with Facebook
      </button>
      <button onClick={handleGoogleLogin} className="button-secondary">
        <FaGoogle className=" social-button-icon" /> Continue with Google
      </button>
    </div>
  );
}

export default SocialButtons;
