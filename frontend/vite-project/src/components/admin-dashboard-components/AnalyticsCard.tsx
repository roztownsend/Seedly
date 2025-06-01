import { MdAttachMoney } from "react-icons/md";

function AnalyticsCard() {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-5 mt-4">
        <div className="w-full flex justify-between max-w-[700px] min-h-[125px] bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer group border-2 border-transparent hover:border-green-300 transform hover:-translate-y-2">
          <div className="flex flex-col">
            <p className="text-base text-gray-500">Total Revenue</p>
            <h5 className="font-bold text-black text-2xl">650 kr</h5>
          </div>
          <div className="flex items-center">
            <MdAttachMoney className="text-green-600" size={25} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AnalyticsCard;
