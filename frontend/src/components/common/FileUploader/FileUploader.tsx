import React, { useState } from "react";
import styles from "./FileUploader.module.scss";

export interface FileUploaderProps {
  id?: string;
  name?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  tooltipContent?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  accept?: string;
  placeholder?: string;
  label?: string; // Added label prop
}

const FileUploader: React.FC<FileUploaderProps> = ({
  accept,
  onChange,
  disabled,
  autoFocus,
  placeholder = "Select a file",
  label, // Destructure label prop
}) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : null);
    if (onChange) onChange(e);
  };

  return (
    <div className={styles.fileInputContainer}>
      {label && <label className={styles.fileInputLabelAbove}>{label}</label>}{" "}
      {/* Label above input */}
      <label className={styles.fileInputWrapper}>
        <input
          type="file"
          autoFocus={autoFocus}
          onChange={handleFileChange}
          accept={accept}
          disabled={disabled}
          className={styles.fileInput}
        />
        <span className={styles.filePlaceholder}>
          {fileName || placeholder}
        </span>
      </label>
    </div>
  );
};

export default FileUploader;
