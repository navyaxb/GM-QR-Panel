import React, { ChangeEvent, useState } from 'react';
import './FileInput.css';
import AttachmentIcon from '@mui/icons-material/Attachment';
import ImportIcon from '@rsuite/icons/Import';

interface FileInputProps {
    onFileChange: (file: File | null) => void;
    label: string;
    width: number;
}

const ButtonFileInput: React.FC<FileInputProps> = ({ onFileChange, label, width }) => {
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
        <div className="file-button-wrapper">
            <input
                type="file"
                id="file-input"
                className="file-input"
                onChange={handleFileChange}
            />
            {/* {fileUrl ? (
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
      )} */}
            <div className='fileButton' style={{ width: `${width}px` }}>
                <ImportIcon color='#FFF' style={{ fontSize: '20px' }} />
                <label htmlFor="file-input" className='fileButtonText'>
                    {label}
                </label>
            </div>
            {fileUrl && <span>{fileName}</span>}
        </div>
    );
};

export default ButtonFileInput;
