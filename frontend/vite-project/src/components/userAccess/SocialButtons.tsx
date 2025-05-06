import { FaFacebookF, FaGoogle } from "react-icons/fa";

function SocialButtons() {
  return (
    <div className="flex flex-col mt-5 gap-3">
      <button className="border text-[#65676E] text-sm border-[#E1E4EB] flex justify-center items-center px-3 py-[10px] rounded-[5px]">
        <FaFacebookF className="text-lg mr-2 text-black" /> Continue with
        Facebook
      </button>
      <button className="border text-[#65676E] text-sm border-[#E1E4EB] flex justify-center items-center px-3 py-[10px] rounded-[5px]">
        <FaGoogle className="text-lg text-black mr-2" /> Continue with Google
      </button>
    </div>
  );
}

export default SocialButtons;
