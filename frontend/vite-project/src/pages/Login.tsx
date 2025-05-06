import FormHeader from "../components/userAccess/FormHeader";
import CredentialFields from "../components/userAccess/CredentialFields";
import SocialButtons from "../components/userAccess/SocialButtons";
import { useAuthForm } from "../hooks/useCredentialsForm";
function Login() {
  const { showPassword, formType, handlers } = useAuthForm("login");

  return (
    <div className="bg-white w-full max-w-[471px]  $min-h-[460px] p-8 flex flex-col">
      <FormHeader formType={formType} />

      <CredentialFields
        showPassword={showPassword}
        handlers={handlers}
        formType={formType}
      />
      <span className="font-medium text-lg text-[#A9ABBD] mt-6">
        Or use one of these:
      </span>
      <SocialButtons />
    </div>
  );
}

export default Login;
