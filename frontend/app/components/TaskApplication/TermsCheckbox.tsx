import React from "react";

export default function TermsCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className="flex items-center space-x-2 mt-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4"
      />
      <span className="text-sm">
        I agree to the{" "}
        <a href="/terms" className="text-purple-600 underline">
          terms and conditions
        </a>{" "}
        and{" "}
        <a href="/privacy" className="text-purple-600 underline">
          privacy policy
        </a>
      </span>
    </div>
  );
}
