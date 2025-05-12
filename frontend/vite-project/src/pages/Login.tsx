import FormHeader from "../components/credentials/FormHeader";
import CredentialFields from "../components/credentials/CredentialFields";
import SocialButtons from "../components/credentials/SocialButtons";
import { useCredentialForm } from "../hooks/useCredentialForm";
import "../components/credentials/Credentials.css";
import { Link } from "react-router-dom";

function Login() {
  const { showPassword, formType, handlers, errorMessage } =
    useCredentialForm("login");

  return (
    <>
      <div className="credential-form-container">
        <FormHeader formType={formType} />

        <CredentialFields
          showPassword={showPassword}
          handlers={handlers}
          formType={formType}
          errorMessage={errorMessage}
        />
        <span className="form-alternative-text">Or use one of these:</span>
        <SocialButtons />
      </div>
      <p>
        Don't have an account? <Link to="/signup">Sign up.</Link>{" "}
      </p>
    </>
  );
}

export default Login;
