"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { getActualPath, getApiUrl, setCookie } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../../../../../config";
import axios from "axios";

interface SchoolInfo {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
  short_name: string;
  code: string;
  website: string | null;
  motto: string;
  about: string;
}
// Define type for login form data
type LoginFormInputs = {
  email: string;
  password: string;
};

export function LoginComponent() {
  const [loading, setLoading] = useState(false); // State to manage loading status
  const router = useRouter(); // Initialize useRouter for navigation
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    // console.log("Login Form Submitted: ", data);
    setLoading(true); // Start loading

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, // Prevent automatic redirect for error handling
      });

      if (result?.error) {
        console.log(result.error);
        if (result.error.includes("ECONNREFUSED")) {
          toast.error("Server not available, try again later");
        } else if (result.error.includes("401")) {
          toast.error("Invalid username or password");
        } else {
          toast.error(result.error); // Set the error message if login fails
        }
      } else {
        router.push(`${getActualPath("/dashboard")}`); // Redirect to the homepage or desired route on success
      }
    } catch (error) {
      console.warn("Login failed:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false); // End loading state regardless of success or error
    }
  };

  const formStyles = (condition: any, otherStyles = "") =>
    `w-full px-4 py-2 border rounded-sm outline outline-none hover:outline-[0.5px] ${
      condition ? "border-red-500" : "border-none"
    } bg-[#FAF7EE] ${otherStyles} `;

  useEffect(() => {
    const fetchSchoolInfo = async () => {
      const url = `${BASE_URL}${getApiUrl("/school_info/")}`;
      try {
        const response = await axios.get(url);
        console.log(response.data);
        setSchoolInfo(response.data);
      } catch (error) {
        console.warn("Error fetching school info:", error);
        router.push("/schools");
      }
    };

    fetchSchoolInfo();
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-100 max-w-[583px]">
      <div className="w-full max-w-md bg-white p-8 rounded-lg">
        {schoolInfo && (
          <div className="mb-6 p-4 flex flex-col items-center">
            {schoolInfo?.logo ? (
              <img
                src={String(schoolInfo?.logo)}
                alt="LOGO"
                width={60}
                height={60}
                onError={(e) => {
                  e.currentTarget.src = "/logo.png";
                }}
              />
            ) : (
              <img src="/logo.png" alt="LOGO" width={60} height={60} />
            )}
            <h3 className="mt-2 text-xl font-semibold">{schoolInfo.name}</h3>
            <small>
              <i>{schoolInfo.motto || "educate for life"}</i>
            </small>
            <small>
              <b>{schoolInfo.email || "no-email.sch.com"}</b>
            </small>
            {/* <strong>Address:</strong> {schoolInfo.address} */}
            {/* <strong>Email:</strong>  */}
            {/* <strong>Website:</strong> {schoolInfo.website || "N/A"} */}
            {/* <strong>Phone:</strong> {schoolInfo.phone}
            <strong>About:</strong> {schoolInfo.about} */}
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <p className="text-sm mb-6">
          You don`&apos;`t have an account?{" "}
          <Link href="/register" className="text-blue-500 underline">
            Register
          </Link>
        </p>

        {/* {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p> // Display error message
        )} */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          method="post"
        >
          {/* Email */}
          <div>
            <input
              type="text"
              placeholder="Email (e.g., __)"
              {...register("email", {
                required: "Email is required",
                // pattern: {
                //   value: /^[A-Z]{3}\/\d{2}\/\d{4}$/,
                //   message: "Email must follow the format __",
                // },
              })}
              className={formStyles(errors.email)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className={formStyles(errors.password)}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#086CB4] text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {loading ? "Submitting..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
