import FormHeader from "../components/credential-components/FormHeader";
import CredentialFields from "../components/credential-components/CredentialFields";
import SocialButtons from "../components/credential-components/SocialButtons";
import { useAuthForm } from "../hooks/useCredentialsForm";
import "../components/credential-components/Credential.css";
function Login() {
  const { showPassword, formType, handlers } = useAuthForm("login");

  return (
    <div className="credential-form-container">
      <FormHeader formType={formType} />

      <CredentialFields
        showPassword={showPassword}
        handlers={handlers}
        formType={formType}
      />
      <span className="form-alternative-text">Or use one of these:</span>
      <SocialButtons />
    </div>
  );
}

export default Login;
