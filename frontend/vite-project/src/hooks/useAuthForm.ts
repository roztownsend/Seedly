import { useState } from "react";
import {
  UseAuthFormType,
  AuthFieldsInputData,
  AuthType,
} from "../types/authFormTypes";

export const useAuthForm = (formType: AuthType): UseAuthFormType => {
  const [formData, setFormData] = useState<AuthFieldsInputData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const togglePassword = () => setShowPassword((prevState) => !prevState);

  return {
    formData,
    formType,
    showPassword,
    handlers: {
      handleChange,
      handleSubmit,
      togglePassword,
    },
  };
};
