import { ChangeEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "react-query";
import { register as registerRequest } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";

import Joi from "joi";
import { Tooltip } from "react-tooltip";
import {
  EyeSlashIcon,
  EyeIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const schema = Joi.object({
    name: Joi.string()
      .regex(/^[a-zA-Z\s]+$/)
      .required()
      .messages({
        "string.pattern.base": "Name can only contain letters and spaces",
        "any.required": "Please fill in all fields",
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Invalid email address.",
        "any.required": "Email is required.",
      }),
    password: Joi.string().required().messages({
      "any.required": "Please fill in all fields",
    }),
  });

  const validationResult = schema.validate(
    { name, email, password },
    { abortEarly: false }
  );

  const renderInputField = (
    id: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    label: string,
    tooltipKey: string
  ) => {
    const hasError =
      formSubmitted &&
      validationResult.error?.details.some(
        (detail) => detail.context?.key === tooltipKey
      );

    return (
      <div className="mb-3">
        <label htmlFor={id} className="block mb-2 text-sm text-gray-700">
          {label}
          <span className="text-red-500">*</span>
          <Tooltip id={`${tooltipKey}-tooltip`}>
            {
              validationResult.error?.details.find(
                (detail) => detail.context?.key === tooltipKey
              )?.message
            }
          </Tooltip>
        </label>
        <div className="relative">
          <input
            id={id}
            value={value}
            onChange={(e) => onChange(e)}
            type={id === "password" && !showPassword ? "password" : "text"}
            style={{
              border: `1px solid ${hasError ? "red" : "transparent"}`,
            }}
            data-tip
            data-for={`${tooltipKey}-tooltip`}
          />
          {id === "password" && (
            <div
              className="absolute inset-y-0 right-0 px-3 py-2 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeIcon className="h-4 w-4 text-black" />
              ) : (
                <EyeSlashIcon className="h-4 w-4 text-black" />
              )}
            </div>
          )}
        </div>
        {formSubmitted &&
        validationResult.error?.details.find(
          (detail) => detail.context?.key == tooltipKey
        ) ? (
          validationResult.error?.details.map((detail) => (
            <div key={detail.message} className={`text-red-500 text-sm mt-1`}>
              {detail.context?.key === tooltipKey && detail.message}
            </div>
          ))
        ) : (
          <div className="mt-1 h-[20px]"></div>
        )}
      </div>
    );
  };

  const registerMutation = useMutation(
    ({
      name,
      email,
      password
    }: {
      name: string;
      email: string;
      password: string;
    }) => registerRequest(name, email, password)
  );

  const register = async () => {
    try {
      setFormSubmitted(true);

      if (validationResult.error) {
        toast.error("Please review and correct the information in all fields.");
        return;
      }

      await registerMutation.mutateAsync({
        name,
        email,
        password
      });
      toast.success("Registered successfully. You can now login.");
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="h-[100vh] bg-primary flex items-center justify-center flex flex-col font-display">
      <div className="w-[500px] bg-white rounded-[20px] drop-shadow-lg p-[40px]">
        <h1 className="text-2xl mb-3 font-bold">Register</h1>

        {renderInputField(
          "name",
          name,
          (e) => setName(e.target.value),
          "Name",
          "name"
        )}
        {renderInputField(
          "email",
          email,
          (e) => setEmail(e.target.value),
          "Email",
          "email"
        )}
        {renderInputField(
          "password",
          password,
          (e) => setPassword(e.target.value),
          "Password",
          "password"
        )}

        <button onClick={register} className="mt-4 w-full">
          Register
        </button>

        <div className="text-center pt-8 text-sm">
          <p>
            {" "}
            Already have an account?{" "}
            <Link to="/login" replace className="underline">
              login here
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Register;
