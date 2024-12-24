"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { useForm, SubmitHandler } from "react-hook-form";
import { setCookie } from "@/lib/utils";

// Define type for signup form data
type SignupFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  matricNumber: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterComponent() {
  const router = useRouter(); // Initialize useRouter for navigation
  const [loading, setLoading] = useState(false); // State to manage loading status

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  // Watch password field to compare with confirmPassword
  const password = watch("password");

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    setLoading(true); // Start loading
    try {
      console.log("Form Data Submitted: ", data);
      // sessionStorage.setItem("isLoggedIn", "true"); // Set isLoggedIn in session storage
      setCookie("isLoggedIn", "true", 1); // Set the isLoggedIn cookie (expires in 1 day)

      // Simulate an API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Remove this in production
      router.push("/admin"); // Redirect to dashboard after registration
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const formStyles = (condition: any, otherStyles = "") =>
    `w-full px-4 py-2 border rounded-sm outline outline-none hover:outline-[0.5px] ${
      condition ? "border-red-500" : "border-none"
    } bg-[#FAF7EE] ${otherStyles}`;

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Create an account</h2>
        <p className="text-sm mb-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 underline">
            Log In
          </a>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex space-x-4">
            {/* First Name */}
            <div className="w-1/2">
              <input
                type="text"
                placeholder="First Name"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className={formStyles(errors.firstName)}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Last Name"
                {...register("lastName", { required: "Last name is required" })}
                className={formStyles(errors.lastName)}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email Address */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className={formStyles(errors.email)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Matric Number */}
          <div>
            <input
              type="text"
              placeholder="Matric Number (e.g., MNE/20/0343)"
              {...register("matricNumber", {
                required: "Matric number is required",
                pattern: {
                  value: /^[A-Z]{3}\/\d{2}\/\d{4}$/,
                  message: "Matric number must follow the format MNE/20/0343",
                },
              })}
              className={formStyles(errors.matricNumber)}
            />
            {errors.matricNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.matricNumber.message}
              </p>
            )}
          </div>

          <div className="flex space-x-4">
            {/* Create Password */}
            <div className="w-1/2">
              <input
                type="password"
                placeholder="Create Password"
                {...register("password", { required: "Password is required" })}
                className={formStyles(errors.password)}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="w-1/2">
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={formStyles(errors.confirmPassword)}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button with Loading State */}
          <button
            type="submit"
            className={`w-full text-white py-2 rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#086CB4] hover:bg-blue-600"
            }`}
            disabled={loading} // Disable the button when loading
          >
            {loading ? "Submitting..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
