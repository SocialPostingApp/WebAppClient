import React, { useState } from 'react';
import toast from 'react-hot-toast';
import './FileUpload.css';
import apiClient from '../../services/httpCommon';
import { LocalStorageKeys } from '../../models/enums/localStorageKeys';
import { Routes } from '../../models/enums/routes';

interface IProps {
  saveImageName: (imageName) => void;
}

const FileUpload: React.FC<IProps> = ({ saveImageName }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await apiClient.post(Routes.UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `JWT ${localStorage.getItem(
            LocalStorageKeys.ACCESS_TOKEN_KEY
          )}`,
        },
      });

      saveImageName(response.data.filename);
      toast.success('uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="uploader-container">
      <input id="file-input" type="file" onChange={handleFileChange} />
      <button
        className={!file ? 'disabled' : 'clickable'}
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
