import { ChangeEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { register as registerRequest } from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid';
import { useAppContext } from '../../context/appContext';
import { LocalStorageKeys } from '../../models/enums/localStorageKeys';
import { Routes } from '../../models/enums/routes';
import { userSchema } from '../../schemaValidations';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const { setUser } = useAppContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validationResult = userSchema.validate(
    { name, email, password },
    { abortEarly: false }
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => setter(e.target.value);

  const registerMutation = useMutation(
    ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => registerRequest(name, email, password)
  );

  const register = async () => {
    if (validationResult.error) {
      toast.error(
        `Please review and correct the information in all fields. ${validationResult.error.message}`
      );
      return;
    }

    try {
      await registerMutation.mutateAsync(
        { name, email, password },
        {
          onSuccess: (registerRes) => {
            localStorage.setItem(
              LocalStorageKeys.USER,
              JSON.stringify(registerRes.data)
            );
            setUser(registerRes.data);

            toast.success('Registered successfully. You can now login.');
            navigate(Routes.LOGIN, { replace: true });
          },
          onError: () => {
            toast.error('Registration failed');
          },
        }
      );
    } catch {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">Register</h1>

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

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email <span className="required">*</span>
          </label>
          <input
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => handleInputChange(e, setEmail)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password <span className="required">*</span>
          </label>
          <div className="password-container">
            <input
              id="password"
              className="form-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
            />
            <button
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeIcon className="icon" />
              ) : (
                <EyeSlashIcon className="icon" />
              )}
            </button>
          </div>
        </div>

        <button onClick={register} className="register-button">
          Register
        </button>

        <div className="register-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" replace className="register-link">
              Login here
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Register;
