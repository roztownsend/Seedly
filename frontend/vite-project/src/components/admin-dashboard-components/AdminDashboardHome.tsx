import { FiUserCheck } from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
function AdminDashboardHome() {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-5 mt-4">
        <div className="w-full max-w-[800px] min-h-[250px] bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer group border-2 border-transparent hover:border-green-300 transform hover:-translate-y-2">
          <div className="flex justify-between">
            <div className="p-5  bg-gradient-to-br from-green-100 to-green-200 rounded-2xl group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
              <GoGraph className="text-green-600" size={40} />
            </div>
            <div className="flex items-center">
              <FaArrowRight
                size={28}
                className="text-gray-400 group-hover:text-green-600 group-hover:translate-x-2 transition-all duration-300"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <h5 className="font-bold text-black text-2xl">Sales Analytics</h5>
            <p className="text-base text-gray-500">
              View revenue, orders, top products and sales trends
            </p>
            <div className="flex items-center">
              <h5 className="font-bold text-green-600 group-hover:text-green-700 text-lg">
                Explore Sales Data
              </h5>
              <IoIosArrowForward
                size={20}
                className="ml-2 text-green-600 group-hover:text-green-700 group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>
        </div>
        <div className="w-full max-w-[800px] min-h-[250px]bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer group border-2 border-transparent hover:border-blue-300 transform hover:-translate-y-2">
          <div className="flex justify-between">
            <div className="p-5  bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300 ">
              <FiUserCheck className="text-blue-600" size={40} />
            </div>
            <div className="flex items-center">
              <FaArrowRight
                size={28}
                className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <h5 className="font-bold text-black text-2xl">User Analytic</h5>
            <p className="text-base text-gray-500">
              Analyze customer behavior, signups, and user activity
            </p>
            <div className="flex items-center">
              <h5 className="font-bold text-blue-600 group-hover:text-blue-700 text-lg">
                Explore User Data
              </h5>
              <IoIosArrowForward
                size={20}
                className="ml-2 text-blue-600 group-hover:text-blue-700 group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboardHome;
