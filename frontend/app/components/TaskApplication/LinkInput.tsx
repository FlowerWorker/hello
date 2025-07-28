import React from "react";

export default function LinkInput({
  links,
  setLinks,
}: {
  links: string[];
  setLinks: (links: string[]) => void;
}) {
  const handleAddLink = () => setLinks([...links, ""]);
  const handleChange = (i: number, value: string) => {
    const newLinks = [...links];
    newLinks[i] = value;
    setLinks(newLinks);
  };
  const handleRemove = (i: number) => {
    const newLinks = links.filter((_, index) => index !== i);
    setLinks(newLinks);
  };

  return (
    <div className="space-y-2">
      <h4 className="font-medium">Paste Links (Optional)</h4>
      {links.map((link, i) => (
        <div key={i} className="flex space-x-2">
          <input
            type="text"
            value={link}
            onChange={(e) => handleChange(i, e.target.value)}
            placeholder="Paste your link here..."
            className="flex-1 border rounded p-2"
          />
          <button
            onClick={() => handleRemove(i)}
            className="text-red-500 hover:underline"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={handleAddLink}
        className="text-purple-600 hover:underline"
      >
        + Add Link
      </button>
    </div>
  );
}
