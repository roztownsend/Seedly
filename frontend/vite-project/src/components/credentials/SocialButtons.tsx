import { FaFacebookF, FaGoogle } from "react-icons/fa";

function SocialButtons() {
  return (
    <div className="social-buttons-container">
      <button className="social-button ">
        <FaFacebookF className="social-button-icon" /> Continue with Facebook
      </button>
      <button className="social-button">
        <FaGoogle className=" social-button-icon" /> Continue with Google
      </button>
    </div>
  );
}

export default SocialButtons;
