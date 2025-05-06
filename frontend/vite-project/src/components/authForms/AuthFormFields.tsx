import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UseAuthFormType } from "../../types/authFormTypes";
function AuthFormFields({ handlers, showPassword, formType }: UseAuthFormType) {
  return (
    <form
      className="flex  w-full flex-col"
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
        className="border border-black text-black mb-3 p-3 placeholder:text-[#A9ABBD] text-sm font-normal"
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
          className="border w-full border-black text-black  p-3 placeholder:text-[#A9ABBD] text-sm font-normal"
        />
        <span
          onClick={() => handlers.togglePassword()}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      {formType === "login" && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              className="w-5 h-5 rounded-none"
              type="checkbox"
              id="remember"
              name="remember"
            />
            <label
              className="text-[#979797] font-normal text-sm leading-4 tracking-tighter"
              htmlFor="remember"
            >
              Remember me
            </label>
          </div>
          <a className="font-bold text-sm text-[#979797]" href="">
            Forgot Password?
          </a>
        </div>
      )}

      <button
        type="submit"
        className="invisible h-0 w-0 p-0 m-0 border-0"
      ></button>
    </form>
  );
}
export default AuthFormFields;
