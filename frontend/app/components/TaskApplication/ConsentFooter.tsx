'use client';

import React from 'react';
import Link from 'next/link';

export default function ConsentFooter() {
  return (
    <div className="space-y-4">
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" className="mt-1" />
        <span>
          I agree to the{" "}
          <Link href="/terms-and-conditions" className="underline text-blue-600 hover:text-blue-800" target="_blank">
            terms and conditions
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="underline text-blue-600 hover:text-blue-800" target="_blank">
            privacy policy
          </Link>
        </span>
      </label>

      <div className="flex justify-between items-center">
        <button className="border border-purple-500 text-purple-500 px-6 py-2 rounded-full hover:bg-purple-500 hover:text-white">
          Cancel
        </button>
        <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700">
          Send Application
        </button>
      </div>
    </div>
  );
}
