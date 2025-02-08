import { useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from 'react-query';
import './editProfile.css';
import { IUser } from '../../models';
import { updateUser } from '../../services/authService';
import { LocalStorageKeys } from '../../models/enums/localStorageKeys';
import { Routes } from '../../models/enums/routes';
import { useNavigate } from 'react-router-dom';
import { getUserFromLocalStorage } from '../../utils/storageUtils';
import { profileSchema } from '../../schemaValidations';
import { useForm } from 'react-hook-form';
import { handleFileChange } from '../../utils/handleFileChange';

const EditProfile: React.FC = () => {
  const user: IUser = getUserFromLocalStorage();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      image: user.image || '',
      file: null as File | null,
    },
  });

  const watchFile = watch('file');
  const watchName = watch('name');

  const validationResult = profileSchema.validate(
    { name: watchName },
    { abortEarly: false }
  );

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const updateMutation = useMutation(
    ({ name, image }: { name: string; image: string }) =>
      updateUser({ _id: user._id, name, image })
  );

  const onSubmit = async (data) => {
    if (validationResult.error) {
      toast.error(
        `Please correct the information in fields: \n${validationResult.error.message}`
      );
      return;
    }

    try {
      await updateMutation.mutateAsync(
        { name: data.name, image: data.image },
        {
          onSuccess: (updateRes) => {
            localStorage.setItem(
              LocalStorageKeys.USER,
              JSON.stringify(updateRes)
            );

            toast.success('updated successfully.');

            navigate(Routes.PROFILE);
          },
          onError: () => {
            toast.error('Edit profile failed, please try again.');
          },
        }
      );
    } catch {
      toast.error('Edit profile failed, please try again.');
    }
  };

  return (
    <div className="update-container">
      <div className="update-box">
        <h1 className="update-title">Edit Profile</h1>

        <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title" className="custom-label">
              Book name
            </label>
            <input {...register('name')} />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="file-upload" className="custom-label">
              New profile picture
            </label>
            <button
              type="button"
              className="clickable upload-image-button"
              onClick={triggerFileInput}
            >
              Upload Image
            </button>
            <input
              type="file"
              id="file-upload"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={(event) => handleFileChange(event, setValue)}
            />
            {watchFile && <p>Selected: {watchFile.name}</p>}
          </div>

          <button type="submit" className="update-button">
            Update
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default EditProfile;
