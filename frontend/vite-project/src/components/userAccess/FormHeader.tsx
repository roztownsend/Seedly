import { FormHeaderProps } from "../../types/credentialsFormTypes";

function FormHeader({ formType }: { formType: FormHeaderProps }) {
  return (
    <>
      <h4 className="signup-header font-semibold text-xl tracking-tighter mb-2">
        {formType === "signup" ? "Welcome!" : "Welcome back"}
      </h4>
      <span className="font-medium text-lg text-[#A9ABBD] mb-4 ">
        {formType === "signup"
          ? "Create an account with us"
          : "Login with email"}
      </span>
    </>
  );
}

export default FormHeader;
