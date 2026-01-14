import React from "react";
import img1 from '../../assets/images/total-sales.png';
import img2 from '../../assets/images/odos.png';
// import basant from '../../assets/images/basant.png';
// import BergerPaints from '../../assets/images/BergerPaints.jpg';
import CircularSkillAvatar from "./CircularSkillAvatar";
import { type IDSRData } from './dsrdata';
interface StatCardProps {
  title: string;
  value: string;
  unit: string;
  footer: string;
  progress: number;
  positive?: boolean;
  imgItem: string;
}

interface CardProps {
  title: string;
  amount: string;
  unit: string;
  barColor: string;
  iconBg: string;
  iconColor: string;
  footerLabel: string;
  footerValue: string;
  footerPercent: string;
};

const SalesDashboard: React.FC<{ active: "MTD" | "YTD", selectedNodeData: IDSRData[] }> = ({ active, selectedNodeData }) => {
  return (
    <div className="lg:min-h-screen p-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-4 p-6 flex flex-col items-center rounded-lg">
           <CircularSkillAvatar
              image={selectedNodeData?.[0]?.profile_image}
              percentage={active === "MTD" ? selectedNodeData?.[0]?.achievement_target : selectedNodeData?.[0]?.achievement_target}
              size={300}
              strokeWidth={10}
            />
          <h2 className="mt-4 text-3xl font-bold">{selectedNodeData?.[0]?.cat_title}</h2>
          <p className="text-gray-500">{selectedNodeData?.[0]?.cat_designation}</p>

          <div className="mt-4 flex gap-4 text-sm">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" /> Good
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-400" /> Average
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500" /> Critical
            </span>
          </div>
        </div>

        {/* Right Content */}
        <div className="md:col-span-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <StatCard
              title="Total Sales"
              value={`₹ ${active === "MTD" ? selectedNodeData?.[0]?.total_sales_mtd.toString() : selectedNodeData?.[0]?.total_sales_ytd.toString()}`}
              // value="₹ 485.2"
              unit="Lacs"
              footer="From Last Year"
              progress={active === "MTD" ? selectedNodeData?.[0]?.total_sales_growth_mtd : selectedNodeData?.[0]?.total_sales_growth_ytd}
              positive={active === "MTD" ? selectedNodeData?.[0]?.total_sales_growth_mtd > 0 : selectedNodeData?.[0]?.total_sales_growth_ytd > 0}
              imgItem={img1}
            />
            <StatCard
              title="ODOS (>120 Days)"
              value={`₹ ${active === "MTD" ? selectedNodeData?.[0]?.odos_mtd.toString() : selectedNodeData?.[0]?.odos_ytd.toString()}`}
              unit="Lacs"
              footer="From Last Year"
              progress={active === "MTD" ? selectedNodeData?.[0]?.odos_growth_mtd : selectedNodeData?.[0]?.odos_growth_ytd}
              positive={active === "MTD" ? selectedNodeData?.[0]?.odos_growth_mtd > 0 : selectedNodeData?.[0]?.odos_growth_ytd > 0}
              imgItem={img2}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <SalesCard
              title="Dealer Sale"
              // amount="285.4"
              amount={active === "MTD" ? selectedNodeData?.[0]?.dealer_sales_mtd.toString() : selectedNodeData?.[0]?.dealer_sales_ytd.toString()}
              unit="Lacs"
              barColor="bg-emerald-500"
              iconBg="bg-emerald-50"
              iconColor="text-emerald-600"
              footerLabel="Active Dealers"
              // footerValue="342"
              footerValue={active === "MTD" ? selectedNodeData?.[0]?.total_dealer_count.toString() : selectedNodeData?.[0]?.total_dealer_count.toString()}
              footerPercent={active === "MTD" ? selectedNodeData?.[0]?.total_dealer_count_growth_mtd.toString() : selectedNodeData?.[0]?.total_dealer_count_growth_ytd.toString()}
            />

            <SalesCard
              title="Contractor Sale"
              // amount="142.6"
              amount={active === "MTD" ? selectedNodeData?.[0]?.contractor_sales_mtd.toString() : selectedNodeData?.[0]?.contractor_sales_ytd.toString()}
              unit="Lacs"
              barColor="bg-blue-500"
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
              footerLabel="Active Contractors"
              // footerValue="186"
              footerValue={active === "MTD" ? selectedNodeData?.[0]?.total_contractor_count.toString() : selectedNodeData?.[0]?.total_contractor_count.toString()}
              footerPercent={active === "MTD" ? selectedNodeData?.[0]?.total_contractor_count_growth_mtd.toString() : selectedNodeData?.[0]?.total_contractor_count_growth_ytd.toString()}
            />

            <SalesCard
              title="Fabricator Sale"
              // amount="57.2"
              amount={active === "MTD" ? selectedNodeData?.[0]?.fabrication_sales_mtd.toString() : selectedNodeData?.[0]?.fabrication_sales_ytd.toString()}
              unit="Lacs"
              barColor="bg-purple-500"
              iconBg="bg-purple-50"
              iconColor="text-purple-600"
              footerLabel="Active Fabricators"
              // footerValue="94"
              footerValue={selectedNodeData?.[0]?.total_fabrication_count.toString()}
              footerPercent={active === "MTD" ? selectedNodeData?.[0]?.total_fabrication_count_growth_mtd.toString() : selectedNodeData?.[0]?.total_fabrication_count_growth_ytd.toString()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  imgItem,
  unit,
  footer,
  progress,
  positive = false,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow p-5 h-fit">
      <div className="flex justify-between items-center">
        <h4 className="text-gray-600 font-medium">{title}</h4>
        <img src={imgItem} alt="err" />
      </div>

      <div className="mt-3 text-2xl font-bold">
        {value} <span className="text-base text-gray-500">{unit}</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="mt-2 text-sm text-gray-500">{footer}</p>
        <span className={positive ? "text-green-600" : "text-red-500"}>
          {positive ? "↑ 12%" : "↑ 5%"}
        </span>
      </div>

      <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
        <div
          className={`h-2 rounded-full ${positive ? "bg-green-500" : "bg-red-500"}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};


const SalesCard: React.FC<CardProps> = ({
  title,
  amount,
  unit,
  barColor,
  iconBg,
  iconColor,
  footerLabel,
  footerValue,
  footerPercent,
}) => {
  return (
    <div className="w-full rounded-2xl bg-white p-5 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">
          {title}
        </p>

        <div
          className={`h-10 w-10 rounded-xl ${iconBg} flex items-center justify-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${iconColor}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9l9-6 9 6v2a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 22V12h6v10"
            />
          </svg>
        </div>
      </div>

      {/* Amount */}
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-2xl font-bold text-gray-900">
          ₹ {amount}
        </span>
        <span className="text-sm text-gray-500">
          {unit}
        </span>
      </div>

      {/* Mini Bar Chart */}
      <div className="mt-6 flex items-end gap-4 h-24">
        <div className="w-10 h-16 rounded-md bg-gray-300" />
        <div className={`w-10 h-20 rounded-md ${barColor}`} />
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-gray-100" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {footerLabel}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-900">
            {footerValue}
          </span>

          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${iconBg} ${iconColor}`}
          >
            ↑ {footerPercent}%
          </span>
        </div>
      </div>
    </div>
  );
};



export default SalesDashboard;