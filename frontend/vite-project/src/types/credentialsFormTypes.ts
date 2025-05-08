export type CredentialsInput = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type FormType = "login" | "signup";

export type CredentialsFormProps = Omit<UseCredentialsFormReturn, "formData">;

export type FormHeaderProps = FormType;

export type UseCredentialsFormReturn = {
  formData: CredentialsInput;
  showPassword: boolean;
  formType: FormType;
  handlers: {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    togglePassword: () => void;
  };
};
