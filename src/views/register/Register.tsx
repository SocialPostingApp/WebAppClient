import { ChangeEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { register as registerRequest } from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';

import Joi from 'joi';
import { Tooltip } from 'react-tooltip';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid';

import './Register.css';
import { useAppContext } from '../../context/appContext';
import { LocalStorageKeys } from '../../models/enums/localStorageKeys';

function Register() {
  const navigate = useNavigate();
  const { setUserId } = useAppContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const schema = Joi.object({
    name: Joi.string()
      .regex(/^[a-zA-Z\s]+$/)
      .required()
      .messages({
        'string.pattern.base': 'Name can only contain letters and spaces',
        'any.required': 'Please fill in all fields',
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Invalid email address.',
        'any.required': 'Email is required.',
      }),
    password: Joi.string().required().messages({
      'any.required': 'Please fill in all fields',
    }),
  });

  const validationResult = schema.validate(
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
    setFormSubmitted(true);

    if (validationResult.error) {
      toast.error('Please review and correct the information in all fields.');
      return;
    }

    try {
      await registerMutation.mutateAsync(
        { name, email, password },
        {
          onSuccess: (registerRes) => {
            localStorage.setItem(
              LocalStorageKeys.USER_ID,
              registerRes.data._id
            );
            setUserId(registerRes.data._id);

            toast.success('Registered successfully. You can now login.');
            navigate('/login', { replace: true });
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
