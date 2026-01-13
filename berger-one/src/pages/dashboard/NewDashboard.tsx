import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaRegCalendar } from "react-icons/fa";
import { useState } from 'react'
import SalesDashboard from './SalesDashboard';
import basant from '../../assets/images/basant.png';
/* ---------- TYPES ---------- */
interface OrgNodeType {
  id: number;
  name: string;
  region?: string;
  userProfile?: string;
  status?: "onTrack" | "behind";
  children?: OrgNodeType[];
}

/* ---------- DATA ---------- */
const orgData: OrgNodeType = {
  id: 1,
  name: "All India Head",
  status: "onTrack",
  children: [
    {
      id: 2,
      name: "Basant Kumar",
      region: "EAST",
      userProfile: basant,
      children: [
        { id: 3, name: "Arghyadeep Ghosh", region: "EAST",},
        { id: 4, name: "Arijit Saha", region: "EAST" },
        { id: 5, name: "Ayan Banerjee", region: "EAST" },
        { id: 6, name: "Ayush Agarwal", region: "EAST" }
      ]
    },
    { id: 7, name: "Jawed Zaheer", region: "NORTH" },
    { id: 8, name: "Raman Chopra", region: "WEST" },
    { id: 9, name: "Sridhar Patoju", region: "SOUTH 1 (AP)" },
    { id: 10, name: "Sathyadevan V V", region: "SOUTH 2 (TN)" }
  ]
};

/* ---------- STATUS DOT ---------- */
const StatusDot: React.FC<{ status?: OrgNodeType["status"] }> = ({
  status
}) => {
  if (!status) return null;

  return (
    <span
      className={`h-2 w-2 rounded-full ${
        status === "onTrack" ? "bg-green-500" : "bg-red-500"
      }`}
    />
  );
};

/* ---------- ORG NODE ---------- */
const OrgNode: React.FC<{ node: OrgNodeType; level?: number }> = ({
  node,
  level = 0
}) => {
  const [open, setOpen] = useState<boolean>(true);
  const hasChildren = Boolean(node.children?.length);
  const isFirstLevel = level === 0;
  const isSecondLevel = level === 1;
  const isThirdLevel = level === 2;

  return (
    <div className="relative">
      {/* Vertical connector */}
      {level > 0 && (
        <div className="absolute left-3 top-0 h-full w-px bg-gray-300" />
      )}

      {/* Horizontal connector */}
      {level > 0 && (
        <div className="absolute left-3 top-6 h-[1px] w-10 bg-gray-300" />
      )}

      {/* Node */}
      <div
       className={`relative mb-3 flex cursor-pointer items-center
                    justify-between rounded-full border px-4 py-2 shadow-sm
                    hover:bg-gray-50 bg-white
                    ${
                    isThirdLevel
                        ? "ml-10 bg-blue-50 border-blue-300"
                        : isSecondLevel
                        ? "ml-6 bg-gray-50 border-gray-300"
                        : isFirstLevel ? "bg-[#FEF3C7] border border-1 border-[#F59E0B]" : ""
                    }`}
        onClick={() => hasChildren && setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          {node.userProfile ? (
            <img
              src={node.userProfile}
              alt={node.name}
              className="h-8 w-8 rounded-full object-cover border border-gray-300"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/avatars/default-user.png";
              }}
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
              {node.name
                .split(" ")
                .map(w => w.charAt(0))
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-gray-800 whitespace-nowrap w-28 text-ellipsis overflow-hidden">
              {node.name}
            </p>
            {node.region && (
              <p className="text-xs text-gray-500">
                Region: {node.region}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {level === 0 && <StatusDot status={node.status} />}
          {hasChildren && (
            <span className="text-sm text-gray-400">
              {open ? "▾" : "▸"}
            </span>
          )}
        </div>
      </div>

      {/* Children */}
      {open &&
        node.children?.map((child) => (
          <OrgNode key={child.id} node={child} level={level + 1} />
        ))}
    </div>
  );
};
const NewDashboard: React.FC = () => {
    const [active, setActive] = useState<"MTD" | "YTD">("MTD");
    return (
        <>
            <section className="w-full lg:flex">
                <div className="lg:w-[360px] bg-white rounded-lg">
                    <div className="lg:min-h-screen bg-gray-100 p-2 rounded-lg">
                        <div className="rounded-xl border bg-gray-50 p-4">
                            <h2 className="mb-4 text-xs font-semibold text-gray-500 uppercase">
                                Organization Hierarchy
                            </h2>

                            <OrgNode node={orgData}/>

                            {/* Legend */}
                            <div className="mt-6 rounded-md border bg-white p-3 text-xs">
                                <p className="mb-2 font-semibold text-gray-600">Legend</p>

                                <div className="mb-1 flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-green-500" />
                                    <span>On Track (&gt;90%)</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-red-500" />
                                    <span>Behind Target (&lt;75%)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:pl-2 lg:mt-0 mt-4">
                    <div className="h-full w-full bg-gradient-to-l from-[#daf0ff] to-[#F0F9FF] rounded-lg">
                        <div className="flex justify-between items-center p-5">
                            <div className="">
                                <h2 className='text-3xl font-bold font-sans mb-1'>Performance Window – National Level (EAST)</h2>
                                <div className="">
                                    <ul className='flex gap-2 items-center'>
                                        <li className='bg-white border border-[#E2E8F0] py-1 px-2 rounded-full  flex items-center gap-2 text-sm'>
                                            <span><FaLocationDot className='text-[#3B82F6]' /></span>
                                            <p>National Level – East</p>
                                        </li>
                                        <li className='bg-white border border-[#E2E8F0] py-1 px-2 rounded-full flex items-center gap-2 text-sm'>
                                            <span><FaRegCalendar className='text-[#3B82F6]' /></span>
                                            <p>FY 2023-24</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="inline-flex items-center rounded-xl bg-[#EFF6FF] p-1 shadow-sm">
                                {/* MTD */}
                                <button
                                    onClick={() => setActive("MTD")}
                                    className={`px-5 py-1.5 text-sm font-medium rounded-lg transition-all
                                    ${active === "MTD"
                                            ? "bg-white text-slate-800 shadow"
                                            : "text-slate-500 hover:text-slate-700"
                                        }`}
                                >
                                    MTD
                                </button>

                                {/* YTD */}
                                <button
                                    onClick={() => setActive("YTD")}
                                    className={`px-5 py-1.5 text-sm font-medium rounded-lg transition-all
                                    ${active === "YTD"
                                            ? "bg-white text-slate-800 shadow"
                                            : "text-slate-500 hover:text-slate-700"
                                        }`}
                                >
                                    YTD
                                </button>
                            </div>
                        </div>
                        <div className="">
                            <SalesDashboard />
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}


export default NewDashboard