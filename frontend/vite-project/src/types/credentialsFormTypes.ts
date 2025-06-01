export type CredentialsInput = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type FormType = "login" | "signup";

export type CredentialsFormProps = {
  formType: FormType;
};

export type FormHeaderProps = FormType;

export type UseCredentialsFormReturn = {
  formData: CredentialsInput;
  showPassword: boolean;
  formType: FormType;
  errorMessage: string;
  handlers: {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    togglePassword: () => void;
  };
  loading: boolean;
};
