import toast from 'react-hot-toast';
import { LocalStorageKeys } from '../models/enums/localStorageKeys';
import { Routes } from '../models/enums/routes';
import apiClient from '../services/httpCommon';
import { UseFormSetValue } from 'react-hook-form';

export const handleFileChange = async (
  event: React.ChangeEvent<HTMLInputElement>,
  setValue: UseFormSetValue<any>
) => {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    setValue('file', file);

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

      setValue('image', response.data.filename);
      toast.success('Image uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading image.');
    }
  }
};
