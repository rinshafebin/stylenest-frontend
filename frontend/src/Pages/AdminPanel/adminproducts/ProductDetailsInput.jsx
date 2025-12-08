import React, { useState, useCallback } from "react";
import { X } from "lucide-react";

function ProductDetailsInput({ details, setDetails }) {
  const [input, setInput] = useState("");

  const addDetail = useCallback(() => {
    if (input.trim() && !details.includes(input.trim())) {
      setDetails([...details, input.trim()]);
      setInput("");
    }
  }, [input, details, setDetails]);

  const removeDetail = useCallback((item) => {
    setDetails(details.filter((d) => d !== item));
  }, [details, setDetails]);

  return (
    <div>
      <label>Details</label>

      <div className="flex gap-2">
        <input
          className="w-full px-4 py-2 border rounded-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="button"
          className="bg-rose-500 text-white px-4 py-2 rounded-lg"
          onClick={addDetail}
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {details.map((detail) => (
          <span
            key={detail}
            className="bg-rose-100 px-3 py-1 rounded-full flex items-center gap-1"
          >
            {detail}
            <X className="cursor-pointer" size={14} onClick={() => removeDetail(detail)} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default React.memo(ProductDetailsInput);
