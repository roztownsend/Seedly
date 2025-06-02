import FormHeader from "../components/credentials/FormHeader";
import CredentialFields from "../components/credentials/CredentialFields";
import SocialButtons from "../components/credentials/SocialButtons";
import "../components/credentials/Credentials.css";
import { Link } from "react-router-dom";
function Signup() {
  return (
    <section className="credential-section">
      <div className="credential-form-container">
        <FormHeader formType={"signup"} />
        <CredentialFields formType="signup" />
        <span className="form-alternative-text">Or use one of these:</span>
        <SocialButtons />
      </div>
      <p className="has-account">
        Already have an account?{" "}
        <Link className="font-bold" to="/login">
          Sign in.
        </Link>{" "}
      </p>
    </section>
  );
}

export default Signup;
