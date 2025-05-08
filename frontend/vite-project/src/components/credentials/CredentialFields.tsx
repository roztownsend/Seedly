import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CredentialsFormProps } from "../../types/credentialsFormTypes";
function CredentialFields({
  handlers,
  showPassword,
  formType,
}: CredentialsFormProps) {
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
        required
        className="credential-form-input email-input"
      />
      <div className="flex w-full relative mb-5">
        <label htmlFor="password"></label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          required
          onChange={(e) => handlers.handleChange(e)}
          className="credential-form-input password-input"
        />
        <span
          onClick={() => handlers.togglePassword()}
          className="credential-eye-icon "
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      {formType === "login" && (
        <div className="credentials-footer">
          <label htmlFor="rememberMe" className="rememberme-label">
            <input
              className="credential-form-checkbox"
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              onChange={(e) => handlers.handleChange(e)}
            />
            <span className="rememberme-span-text">Remember me</span>
          </label>
          <a className="forgot-password-link" href="">
            Forgot Password?
          </a>
        </div>
      )}
      <button type="submit" className="credential-submit-btn"></button>
    </form>
  );
}
export default CredentialFields;
