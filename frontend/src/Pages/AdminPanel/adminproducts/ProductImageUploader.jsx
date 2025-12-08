import React, { useCallback } from "react";
import { Upload } from "lucide-react";

function ProductImageUploader({ imagePreview, onImageSelected }) {
  const handleFile = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      onImageSelected(file, URL.createObjectURL(file));
    }
  }, [onImageSelected]);

  return (
    <div>
      <label>Product Image</label>

      <div
        className="border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer"
        onClick={() => document.getElementById("imageInput").click()}
      >
        {imagePreview ? (
          <img src={imagePreview} className="max-h-48 mx-auto" />
        ) : (
          <>
            <Upload className="w-10 h-10 text-gray-400 mx-auto" />
            <p className="text-gray-500 mt-2">Click to upload</p>
          </>
        )}
      </div>

      <input
        id="imageInput"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFile}
      />
    </div>
  );
}

export default React.memo(ProductImageUploader);
