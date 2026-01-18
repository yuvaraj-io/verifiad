import { CreatorForm } from "../../SignupLayout";

export default function CreatorStep1({
  values,
  onChange,
  onNext,
}: {
  values: CreatorForm;
  onChange: (v: CreatorForm) => void;
  onNext: () => void;
}) {
  const isValid =
    values.fullName.trim().length >= 2 &&
    values.location.trim().length >= 2 &&
    values.category.trim().length >= 2;

  return (
    <div className="space-y-4">
      <input
        className="w-full rounded border p-2"
        placeholder="Full name"
        value={values.fullName}
        onChange={(e) =>
          onChange({ ...values, fullName: e.target.value })
        }
      />

      <input
        className="w-full rounded border p-2"
        placeholder="Country & City"
        value={values.location}
        onChange={(e) =>
          onChange({ ...values, location: e.target.value })
        }
      />

      <input
        className="w-full rounded border p-2"
        placeholder="Primary content category"
        value={values.category}
        onChange={(e) =>
          onChange({ ...values, category: e.target.value })
        }
      />

      <button
        disabled={!isValid}
        onClick={onNext}
        className="mt-4 w-full rounded bg-purple-600 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
