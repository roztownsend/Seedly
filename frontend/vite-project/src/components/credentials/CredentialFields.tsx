import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CredentialsFormProps } from "../../types/credentialsFormTypes";
import { useCredentialForm } from "../../hooks/useCredentialForm";
import { ClipLoader } from "react-spinners";
import "./Credentials.css";

function CredentialFields({ formType }: CredentialsFormProps) {
  const { handlers, showPassword, errorMessage, formData, loading } =
    useCredentialForm(formType);

  return (
    <form
      className="credential-form"
      onSubmit={(e) => handlers.handleSubmit(e)}
    >
      <label htmlFor="email"></label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        autoComplete="email"
        onChange={(e) => handlers.handleChange(e)}
        value={formData.email}
        required
        className="credential-form-input email-input"
      />
      <div className="password-field">
        <label htmlFor="password"></label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          required
          value={formData.password}
          onChange={(e) => handlers.handleChange(e)}
          className="credential-form-input password-input"
        />
        <span
          onClick={() => handlers.togglePassword()}
          className="credential-eye-icon"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {formType === "login" && (
        <div className="credentials-footer">
          <label htmlFor="rememberMe" className="rememberme-label">
            <input
              className="credential-form-checkbox"
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={(e) => handlers.handleChange(e)}
            />
            <span className="rememberme-span-text">Remember me</span>
          </label>
          <a className="forgot-password-link" href="">
            Forgot Password?
          </a>
        </div>
      )}
      {loading ? (
        <div className="credential-spinner-container">
          <ClipLoader color="#22c55e" size={32} />
        </div>
      ) : (
        <button
          type="submit"
          className="credential-submit-btn"
        >
          {formType === "login" ? "Login" : "Sign Up"}
        </button>
      )}
    </form>
  );
}

export default CredentialFields;
