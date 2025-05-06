import AuthHeader from "../components/authForms/AuthHeader";
import AuthFormFields from "../components/authForms/AuthFormFields";
import AuthOptionButtons from "../components/authForms/AuthOptionButtons";
import { useAuthForm } from "../hooks/useAuthForm";
function Login() {
  const { showPassword, formData, formType, handlers } = useAuthForm("login");

  return (
    <div className="bg-white w-full max-w-[471px]  $min-h-[460px] p-8 flex flex-col">
      <AuthHeader formType={formType} />

      <AuthFormFields
        showPassword={showPassword}
        handlers={handlers}
        formData={formData}
        formType={formType}
      />
      <span className="font-medium text-lg text-[#A9ABBD] mt-6">
        Or use one of these:
      </span>
      <AuthOptionButtons />
    </div>
  );
}

export default Login;
