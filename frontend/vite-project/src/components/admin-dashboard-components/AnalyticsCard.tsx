import { MdAttachMoney } from "react-icons/md";
import { FiTrendingUp } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AnalyticsCardProps } from "../../types/adminDashboardTypes";

function AnalyticsCard({ title, type, value }: AnalyticsCardProps) {
  const iconMap = {
    revenue: <MdAttachMoney size={25} className="text-green-600" />,
    orders: <MdOutlineShoppingCart size={25} className=" text-purple-600" />,
    averageOrderValue: <MdAttachMoney size={25} className="text-blue-600" />,
  };
  const IconComponent = iconMap[type as keyof typeof iconMap];
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-5 mt-4">
        <div className="w-full flex justify-between max-w-[700px] min-h-[125px] bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer group border-2 border-transparent">
          <div className="flex flex-col">
            <p className="text-base text-gray-500">{title}</p>
            <h5 className="font-bold text-black text-2xl">
              {value} {type === "orders" ? "" : "kr"}
            </h5>
          </div>
          <div className="flex items-center">{IconComponent}</div>
        </div>
      </div>
    </>
  );
}

export default AnalyticsCard;
