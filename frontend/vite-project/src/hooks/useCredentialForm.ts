import { useState } from "react";
import {
  CredentialsInput,
  FormType,
  UseCredentialsFormReturn,
} from "../types/credentialsFormTypes";

// useCredentialForm expects a 'formType' argument, which can either be 'login' or 'signup'.
export const useCredentialForm = (
  formType: FormType
): UseCredentialsFormReturn => {
  const [formData, setFormData] = useState<CredentialsInput>(() => {
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
    // Logs the form data based on the form type (login or signup).
    formType === "login"
      ? console.log("Login form submit was triggerd", formData)
      : console.log("Signup form submit was triggerd", formData);
  };

  const togglePassword = () => setShowPassword((prevState) => !prevState);

  return {
    formType,
    formData,
    showPassword,
    handlers: {
      handleChange,
      handleSubmit,
      togglePassword,
    },
  };
};
