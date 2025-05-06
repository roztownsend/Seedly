import { FormHeaderProps } from "../../types/credentialsFormTypes";

function FormHeader({ formType }: { formType: FormHeaderProps }) {
  return (
    <>
      <h4 className="credential-form-header">
        {formType === "signup" ? "Welcome!" : "Welcome back"}
      </h4>
      <p className="credential-form-subheader">
        {formType === "signup"
          ? "Create an account with us"
          : "Login with email"}
      </p>
    </>
  );
}

export default FormHeader;
