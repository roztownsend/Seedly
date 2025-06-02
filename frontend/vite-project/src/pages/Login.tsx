import FormHeader from "../components/credentials/FormHeader";
import CredentialFields from "../components/credentials/CredentialFields";
import SocialButtons from "../components/credentials/SocialButtons";
import "../components/credentials/Credentials.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="credential-section">
      <div className="credential-form-container">
        <FormHeader formType={"login"} />
        <CredentialFields formType={"login"} />
        <span className="form-alternative-text">Or use one of these:</span>
        <SocialButtons />
      </div>
      <p className="has-account">
        Don't have an account?{" "}
        <Link className="font-bold" to="/signup">
          Sign up.
        </Link>{" "}
      </p>
    </section>
  );
}

export default Login;
