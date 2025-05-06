export type AuthFieldsInputData = {
  email: string;
  password: string;
};

export type AuthType = "login" | "signup";

export type UseAuthFormType = {
  formData: AuthFieldsInputData;
  showPassword: boolean;
  formType: AuthType;
  handlers: {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    togglePassword: () => void;
  };
};
