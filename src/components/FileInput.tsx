import React, { ChangeEvent, useState } from 'react';
import './FileInput.css';
import AttachmentIcon from '@mui/icons-material/Attachment';

interface FileInputProps {
  onFileChange: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onFileChange }) => {
  const [fileName, setFileName] = useState<string>('No file chosen');
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
      setFileUrl(URL.createObjectURL(file));
      onFileChange(file);
    } else {
      setFileName('No file chosen');
      setFileUrl(null);
      onFileChange(null);
    }
  };

  return (
    <div className="file-input-wrapper">
      <input
        type="file"
        id="file-input"
        className="file-input"
        onChange={handleFileChange}
      />
      {fileUrl ? (
        <div className="file-input-container">
          <img src={fileUrl} alt={fileName} className="uploaded-image" />
        </div>
      ) : (
        <div className="file-input-container">
          <label htmlFor="file-input" className="file-input-label">
            Click here to upload a file
          </label>
          <span className="file-name">
            {fileName !== 'No file chosen' && <AttachmentIcon />} {fileName}
          </span>
        </div>
      )}
    </div>
  );
};

export default FileInput;
