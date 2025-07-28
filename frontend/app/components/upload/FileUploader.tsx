"use client";

import React, { useState } from "react";

interface FileUploaderProps {
  label: string;
  multiple?: boolean;
  onUploadComplete: (uploadedUrls: string[]) => void;
}

export default function FileUploader({
  label,
  multiple = false,
  onUploadComplete,
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedNames, setUploadedNames] = useState<string[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        uploaded.push(data.fileName || file.name);
      } else {
        alert(data.error || "Upload failed.");
      }
    }

    setUploadedNames(uploaded);
    setUploading(false);
    onUploadComplete(uploaded);
  };

  return (
    <div className="space-y-2">
      <label className="font-semibold">{label}</label>
      <input
        type="file"
        multiple={multiple}
        onChange={handleFileChange}
        className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
      />
      {uploading && <p className="text-sm text-gray-400">Uploading...</p>}
      {uploadedNames.length > 0 && (
        <ul className="text-sm text-green-600 list-disc pl-4">
          {uploadedNames.map((name, idx) => (
            <li key={idx}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
