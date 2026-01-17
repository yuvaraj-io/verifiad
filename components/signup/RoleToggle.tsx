import { Role } from "./SignupLayout";
import { Video, Briefcase } from "lucide-react";

export default function RoleToggle({
  role,
  onChange,
}: {
  role: Role;
  onChange: (r: Role) => void;
}) {
  return (
    <div className="mb-6 flex rounded-xl border overflow-hidden">
      <button
        onClick={() => onChange("creator")}
        className={`flex flex-1 items-center justify-center gap-2 py-3 ${
          role === "creator"
            ? "bg-white text-purple-600"
            : "bg-purple-600 text-white"
        }`}
      >
        <Video size={18} />
        Creators
      </button>

      <button
        onClick={() => onChange("business")}
        className={`flex flex-1 items-center justify-center gap-2 py-3 ${
          role === "business"
            ? "bg-white text-purple-600"
            : "bg-purple-600 text-white"
        }`}
      >
        <Briefcase size={18} />
        Businesses
      </button>
    </div>
  );
}
