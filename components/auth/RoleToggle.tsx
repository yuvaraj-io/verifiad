import { Role } from "../signup/SignupLayout";
import { Video, Briefcase } from "lucide-react";

const PURPLE = "#796487";

export default function RoleToggle({
  role,
  onChange,
}: {
  role: Role;
  onChange: (r: Role) => void;
}) {
  return (
    <div
      className="relative mb-6 h-10 rounded-full"
      style={{ backgroundColor: PURPLE }}
    >
      {/* 🔘 Sliding Active Pill */}
      <div
        className={`
          absolute top-0 h-10 w-1/2 rounded-full bg-white
          shadow-md outline outline-2 outline-[#616161]
          transition-transform duration-300 ease-out
        `}
        style={{
          transform:
            role === "creator"
              ? "translateX(0%)"
              : "translateX(100%)",
        }}
      />

      {/* Buttons */}
      <div className="relative z-10 flex h-full">
        {/* Creators */}
        <button
          onClick={() => onChange("creator")}
          className={`
            flex flex-1 items-center justify-center gap-3 rounded-full
            text-sm font-medium transition-colors duration-300
            ${
              role === "creator"
                ? "text-[#796487]"
                : "text-white"
            }
          `}
        >
          <Video size={18} />
          Creators
        </button>

        {/* Businesses */}
        <button
          onClick={() => onChange("business")}
          className={`
            flex flex-1 items-center justify-center gap-3 rounded-full
            text-sm font-medium transition-colors duration-300
            ${
              role === "business"
                ? "text-[#796487]"
                : "text-white"
            }
          `}
        >
          <Briefcase size={18} />
          Businesses
        </button>
      </div>
    </div>
  );
}
