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
      className="mb-6 flex rounded-full"
      style={{ backgroundColor: PURPLE }}
    >
      {/* Creators */}
      <button
        onClick={() => onChange("creator")}
        className={`flex flex-1 items-center justify-center gap-3 rounded-full py-3 text-sm font-medium transition-all ${
          role === "creator"
            ? "bg-white text-[#796487] shadow outline outline-2 outline-[#616161]"
            : "text-white"
        }`}
      >
        <Video size={18} />
        Creators
      </button>

      {/* Businesses */}
      <button
        onClick={() => onChange("business")}
        className={`flex flex-1 items-center justify-center gap-3 rounded-full py-3 text-sm font-medium transition-all ${
          role === "business"
            ? "bg-white text-[#796487] shadow outline outline-2"
            : "text-white"
        }`}
      >
        <Briefcase size={18} />
        Businesses
      </button>
    </div>
  );
}
