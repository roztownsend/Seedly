import FormHeader from "../components/credentials/FormHeader";
import CredentialFields from "../components/credentials/CredentialFields";
import SocialButtons from "../components/credentials/SocialButtons";
import { useCredentialForm } from "../hooks/useCredentialForm";
import "../components/credentials/Credentials.css";
function Signup() {
  const { showPassword, handlers, formType } = useCredentialForm("signup");

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

export default Signup;
