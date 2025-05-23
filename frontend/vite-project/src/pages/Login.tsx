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
      <div className="flex flex-col w-full items-center">
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
        <p className="mt-4">
          Don't have an account?{" "}
          <Link className="font-bold" to="/signup">
            Sign up.
          </Link>{" "}
        </p>
      </div>
    </>
  );
}

export default Login;
