"use client";

import { ChangeEvent, useState } from "react";

interface MediaPickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setSelectedFile: (file: File) => void;
}

export function MediaPicker({
  id = "media",
  setSelectedFile,
  ...props
}: Readonly<MediaPickerProps>) {
  const [preview, setPreview] = useState<string | null>(null);

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) return;

    setSelectedFile(files[0]);

    const previewURL = URL.createObjectURL(files[0]);
    setPreview(previewURL);
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        id={id}
        accept="image/*"
        className="hidden h-0 w-0 pt-4"
        style={{
          display: "none",
        }}
        {...props}
      />

      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="Media"
          style={{
            width: "190px",
            height: "190px",
            borderRadius: "50%",
          }}
        />
      )}
    </>
  );
}
