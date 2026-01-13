import React from "react";

interface CircularSkillAvatarProps {
  image: string;
  size?: number;       // total size (px)
  strokeWidth?: number;
  percentage: number;  // 0 - 100
  color?: string;
}

const CircularSkillAvatar: React.FC<CircularSkillAvatarProps> = ({
  image,
  size = 300,
  strokeWidth = 10,
  percentage,
  color = "#22c55e" // tailwind green-500
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* SVG Ring */}
      <svg
        width={size}
        height={size}
        className="absolute rotate-[-90deg]"
      >
        {/* Background Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Profile Image */}
      <div
        className="overflow-hidden rounded-full"
        style={{
          width: size - strokeWidth * 3,
          height: size - strokeWidth * 3
        }}
      >
        <img
          src={image}
          alt="profile"
          className="h-full w-full object-cover rounded-full"
        />
      </div>

      {/* Percentage Label */}
      <div className="absolute bottom-3 right-3 bg-white shadow rounded-full px-3 py-1 text-sm font-semibold text-green-600">
        {percentage}%
      </div>
    </div>
  );
};

export default CircularSkillAvatar;
