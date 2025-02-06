import { ChangeEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from 'react-query';
import Joi from 'joi';
import './editProfile.css';
import { IUser } from '../../models';
import { updateUser } from '../../services/authService';
import { LocalStorageKeys } from '../../models/enums/localStorageKeys';
import FileUpload from '../../components/fileUpload/FileUpload';
import { Routes } from '../../models/enums/routes';
import { useNavigate } from 'react-router-dom';
import { getUserFromLocalStorage } from '../../utils/storageUtils';
import { profileSchema } from '../../schemaValidations';

const EditProfile: React.FC = () => {
  const user: IUser = getUserFromLocalStorage();
  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [image, setImgUrl] = useState(user.image ?? '');

  const validationResult = profileSchema.validate(
    { name },
    { abortEarly: false }
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => setter(e.target.value);

  const saveImage = (image: string) => {
    setImgUrl(image);
  };

  const updateMutation = useMutation(
    ({ name, image }: { name: string; image: string }) =>
      updateUser({ _id: user._id, name, image })
  );

  const update = async () => {
    if (validationResult.error) {
      toast.error(
        `Please correct the information in fields: \n${validationResult.error.message}`
      );
      return;
    }

    try {
      await updateMutation.mutateAsync(
        { name, image },
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

        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name <span className="required">*</span>
          </label>
          <input
            id="name"
            className="form-input"
            value={name}
            onChange={(e) => handleInputChange(e, setName)}
          />
        </div>

        <div className="file-upload-container">
          <FileUpload saveImageName={saveImage} />
        </div>

        <button onClick={update} className="update-button">
          Update
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default EditProfile;
