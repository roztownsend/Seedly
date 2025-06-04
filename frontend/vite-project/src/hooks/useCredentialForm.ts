import { useState } from "react";
import { useAuthActions } from "../stores/authStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthError } from "@supabase/supabase-js";

import {
  CredentialsInput,
  FormType,
  UseCredentialsFormReturn,
} from "../types/credentialsFormTypes";

// useCredentialForm expects a 'formType' argument, which can either be 'login' or 'signup'.
export const useCredentialForm = (
  formType: FormType
): UseCredentialsFormReturn & { loading: boolean } => {
  const navigate = useNavigate();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const { signUpNewUser, signInWithPassword, signOutUser } = useAuthActions();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");
    setLoading(true);
    try {
      const { email, password } = formData;

      const validEmail = isValidEmail(email);
      if (!validEmail) {
        throw new Error("Invalid email");
      }
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
      //temporary api calls.
      const baseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");

      if (result.error) {
        throw new Error(result.error.message);
      }

      if (formType === "signup") {
        const response = await axios.post(
          `${baseUrl}/auth-test/complete-signup`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${result.data?.session?.access_token}`,
            },
          }
        );

        console.log(response.data);
        navigate("/dashboard");
      } else if (formType === "login") {
        const response = await axios.post(
          `${baseUrl}/auth-test/link-tasks`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${result.data?.session?.access_token}`,
            },
          }
        );

        result.data?.user?.app_metadata.role === "admin"
          ? navigate("/admin/dashboard")
          : navigate("/dashboard");
      }
    } catch (error: unknown) {
      await signOutUser();
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message);
      }
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const togglePassword = () => setShowPassword((prevState) => !prevState);

  return {
    formType,
    formData,
    showPassword,
    errorMessage,
    isSubmitting,
    handlers: {
      handleChange,
      handleSubmit,
      togglePassword,
    },
    loading,
  };
};
