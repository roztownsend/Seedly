import { useState } from "react";
import {
  UseAuthFormType,
  AuthFieldsInputData,
  AuthType,
} from "../types/authFormTypes";

export const useAuthForm = (formType: AuthType): UseAuthFormType => {
  const [formData, setFormData] = useState<AuthFieldsInputData>(() => {
    const defaultData = {
      email: "",
      password: "",
    };
    if (formType === "login") {
      return { ...defaultData, rememberMe: false };
    }
    return defaultData;
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(formData);
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
