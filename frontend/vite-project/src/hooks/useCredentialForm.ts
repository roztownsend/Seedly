import { useState } from "react";
import { useAuthActions } from "../stores/authStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  CredentialsInput,
  FormType,
  UseCredentialsFormReturn,
} from "../types/credentialsFormTypes";

// useCredentialForm expects a 'formType' argument, which can either be 'login' or 'signup'.
export const useCredentialForm = (
  formType: FormType
): UseCredentialsFormReturn => {
  const navigate = useNavigate();

  const { signUpNewUser, signInWithPassword } = useAuthActions();
  const [errorMessage, setErrorMessage] = useState<string>("");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const { email, password } = formData;
      const action =
        formType === "signup"
          ? signUpNewUser
          : formType === "login"
          ? signInWithPassword
          : null;

      if (!action) {
        throw new Error("Invalid form type");
      }

      const result = await action(email, password);

      if (result.success) {
        console.log(result.data);
        const response = await axios.post(
          "http://localhost:5000/auth-test/",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${result.data?.session?.access_token}`,
            },
          }
        );
        console.log(response.data);
        navigate("/test-dashboard");
      } else if (result.error) {
        setErrorMessage(result.error.message);
      }
    } catch (error) {
      console.error("Unexpected error in useCredentialForm", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const togglePassword = () => setShowPassword((prevState) => !prevState);

  return {
    formType,
    formData,
    showPassword,
    errorMessage,
    handlers: {
      handleChange,
      handleSubmit,
      togglePassword,
    },
  };
};
