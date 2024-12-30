"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { useForm, SubmitHandler } from "react-hook-form";
import { setCookie } from "@/lib/utils";
import axios from "axios";
import { signIn } from "next-auth/react";

// Define type for signup form data
type SignupFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  schoolName: string;
  schoolPhone: string;
  schoolEmail: string;
  schoolAddress: string;
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

  const password = watch("password");

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    setLoading(true);

    const payload = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      gender: data.gender,
      school_name: data.schoolName,
      school_phone: data.schoolPhone,
      school_email: data.schoolEmail,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/register/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;

      if (response.status === 201) {
        // Registration successful, now sign in using next-auth
        const signInResponse = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (signInResponse?.ok) {
          alert(result.message); // Show success message
          router.push("/admin"); // Redirect to admin dashboard
        } else {
          alert("Sign in failed. Please try again.");
        }
      } else {
        alert(result.message); // Show error message
      }
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error response:", error.response.data);
        alert(`Error: ${error.response.data.message || "Registration failed"}`);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error request:", error.request);
        alert("No response from server. Please try again later.");
      } else {
        // Something else happened while setting up the request
        console.error("Error message:", error.message);
        alert("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          method="post"
        >
          <div className="flex space-x-4">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="First Name"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className={formStyles(errors.firstName)}
              />
            </div>
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Last Name"
                {...register("lastName", { required: "Last name is required" })}
                className={formStyles(errors.lastName)}
              />
            </div>
          </div>
          <input
            type="email"
            placeholder="Email Address"
            {...register("email", {
              required: "Email is required",
              // pattern: {
              //   value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
              //   message: "Invalid email format",
              // },
            })}
            className={formStyles(errors.email)}
          />
          <select
            {...register("gender", { required: "Gender is required" })}
            className={formStyles(errors.gender)}
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          <input
            type="text"
            placeholder="School Name"
            {...register("schoolName", { required: "School name is required" })}
            className={formStyles(errors.schoolName)}
          />
          <input
            type="text"
            placeholder="School Phone"
            {...register("schoolPhone", {
              required: "School phone is required",
            })}
            className={formStyles(errors.schoolPhone)}
          />
          <input
            type="email"
            placeholder="School Email"
            {...register("schoolEmail", {
              required: "School email is required",
            })}
            className={formStyles(errors.schoolEmail)}
          />
          <input
            type="text"
            placeholder="School Address"
            {...register("schoolAddress", {
              required: "School address is required",
            })}
            className={formStyles(errors.schoolAddress)}
          />
          <div className="flex space-x-4">
            <div className="w-1/2">
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className={formStyles(errors.password)}
              />
            </div>
            <div className="w-1/2">
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={formStyles(errors.confirmPassword)}
              />
            </div>
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded-lg ${
              loading ? "bg-gray-400" : "bg-blue-600"
            } text-white`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Register My School"}
          </button>
        </form>
      </div>
    </div>
  );
}

// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation"; // Import useRouter for navigation
// import { useForm, SubmitHandler } from "react-hook-form";
// import { setCookie } from "@/lib/utils";

// // Define type for signup form data
// type SignupFormInputs = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   gender: string;
//   schoolName: string;
//   schoolPhone: string;
//   schoolEmail: string;
//   password: string;
//   confirmPassword: string;
// };

// export default function RegisterComponent() {
//   const router = useRouter(); // Initialize useRouter for navigation
//   const [loading, setLoading] = useState(false); // State to manage loading status

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<SignupFormInputs>();

//   const password = watch("password");

//   const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
//     setLoading(true);

//     try {
//       const response = await fetch(
//         "http://localhost:8000/api/register-school/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         }
//       );

//       const result = await response.json();

//       if (result.status) {
//         setCookie("isLoggedIn", "true", 1); // Set logged-in cookie
//         alert(result.message); // Show success message
//         router.push("/admin"); // Redirect to admin dashboard
//       } else {
//         alert(result.message); // Show error message
//       }
//     } catch (error) {
//       console.error("Registration failed:", error);
//       alert("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formStyles = (condition: any, otherStyles = "") =>
//     `w-full px-4 py-2 border rounded-sm outline outline-none hover:outline-[0.5px] ${
//       condition ? "border-red-500" : "border-none"
//     } bg-[#FAF7EE] ${otherStyles}`;

//   return (
//     <div className="flex items-center justify-center">
//       <div className="w-full max-w-lg bg-white p-8 rounded-lg">
//         <h2 className="text-2xl font-bold mb-4">Create an account</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div className="flex space-x-4">
//             <div className="w-1/2">
//               <input
//                 type="text"
//                 placeholder="First Name"
//                 {...register("firstName", {
//                   required: "First name is required",
//                 })}
//                 className={formStyles(errors.firstName)}
//               />
//             </div>
//             <div className="w-1/2">
//               <input
//                 type="text"
//                 placeholder="Last Name"
//                 {...register("lastName", { required: "Last name is required" })}
//                 className={formStyles(errors.lastName)}
//               />
//             </div>
//           </div>
//           <input
//             type="email"
//             placeholder="Email Address"
//             {...register("email", {
//               required: "Email is required",
//               pattern: {
//                 value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
//                 message: "Invalid email format",
//               },
//             })}
//             className={formStyles(errors.email)}
//           />
//           <select
//             {...register("gender", { required: "Gender is required" })}
//             className={formStyles(errors.gender)}
//           >
//             <option value="">Select Gender</option>
//             <option value="M">Male</option>
//             <option value="F">Female</option>
//           </select>
//           <input
//             type="text"
//             placeholder="School Name"
//             {...register("schoolName", { required: "School name is required" })}
//             className={formStyles(errors.schoolName)}
//           />
//           <input
//             type="text"
//             placeholder="School Phone"
//             {...register("schoolPhone", {
//               required: "School phone is required",
//             })}
//             className={formStyles(errors.schoolPhone)}
//           />
//           <input
//             type="email"
//             placeholder="School Email"
//             {...register("schoolEmail", {
//               required: "School email is required",
//             })}
//             className={formStyles(errors.schoolEmail)}
//           />

//           <input
//             type="email"
//             placeholder="School Email"
//             {...register("schoolEmail", {
//               required: "School email is required",
//             })}
//             className={formStyles(errors.schoolEmail)}
//           />
//           <div className="flex space-x-4">
//             <div className="w-1/2">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 {...register("password", { required: "Password is required" })}
//                 className={formStyles(errors.password)}
//               />
//             </div>
//             <div className="w-1/2">
//               <input
//                 type="password"
//                 placeholder="Confirm Password"
//                 {...register("confirmPassword", {
//                   validate: (value) =>
//                     value === password || "Passwords do not match",
//                 })}
//                 className={formStyles(errors.confirmPassword)}
//               />
//             </div>
//           </div>
//           <button
//             type="submit"
//             className={`w-full py-2 rounded-lg ${
//               loading ? "bg-gray-400" : "bg-blue-600"
//             } text-white`}
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Register My School"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// // "use client";

// // import React, { useState } from "react";
// // import { useRouter } from "next/navigation"; // Import useRouter for navigation
// // import { useForm, SubmitHandler } from "react-hook-form";
// // import { setCookie } from "@/lib/utils";

// // // Define type for signup form data
// // type SignupFormInputs = {
// //   firstName: string;
// //   lastName: string;
// //   email: string;
// //   gender: string;
// //   schoolName: string;
// //   schoolPhone: string;
// //   schoolEmail: string;
// //   password: string;
// //   confirmPassword: string;
// // };

// // export default function RegisterComponent() {
// //   const router = useRouter(); // Initialize useRouter for navigation
// //   const [loading, setLoading] = useState(false); // State to manage loading status

// //   const {
// //     register,
// //     handleSubmit,
// //     watch,
// //     formState: { errors },
// //   } = useForm<SignupFormInputs>();

// //   // Watch password field to compare with confirmPassword
// //   const password = watch("password");

// //   const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
// //     setLoading(true); // Start loading
// //     // try {
// //     //   console.log("Form Data Submitted: ", data);
// //     //   // sessionStorage.setItem("isLoggedIn", "true"); // Set isLoggedIn in session storage
// //     //   setCookie("isLoggedIn", "true", 1); // Set the isLoggedIn cookie (expires in 1 day)

// //     //   // Simulate an API call delay
// //     //   await new Promise((resolve) => setTimeout(resolve, 2000)); // Remove this in production
// //     //   router.push("/admin"); // Redirect to dashboard after registration
// //     // } catch (error) {
// //     //   console.error("Registration failed", error);
// //     // } finally {
// //     //   setLoading(false); // Stop loading
// //     // }
// //     try {
// //       const response = await fetch(
// //         "http://localhost:8000/api/register-school/",
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify(data),
// //         }
// //       );

// //       const result = await response.json();

// //       if (result.status) {
// //         setCookie("isLoggedIn", "true", 1); // Set logged-in cookie
// //         alert(result.message); // Show success message
// //         router.push("/admin"); // Redirect to admin dashboard
// //       } else {
// //         alert(result.message); // Show error message
// //       }
// //     } catch (error) {
// //       console.error("Registration failed:", error);
// //       alert("An error occurred. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const formStyles = (condition: any, otherStyles = "") =>
// //     `w-full px-4 py-2 border rounded-sm outline outline-none hover:outline-[0.5px] ${
// //       condition ? "border-red-500" : "border-none"
// //     } bg-[#FAF7EE] ${otherStyles}`;

// //   return (
// //     <div className="flex items-center justify-center">
// //       <div className="w-full max-w-lg bg-white p-8 rounded-lg">
// //         <h2 className="text-2xl font-bold mb-4">Create an account</h2>
// //         <p className="text-sm mb-6">
// //           Already have an account?{" "}
// //           <a href="/login" className="text-blue-500 underline">
// //             Log In
// //           </a>
// //         </p>

// //         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
// //           <div className="flex space-x-4">
// //             {/* First Name */}
// //             <div className="w-1/2">
// //               <input
// //                 type="text"
// //                 placeholder="First Name"
// //                 {...register("firstName", {
// //                   required: "First name is required",
// //                 })}
// //                 className={formStyles(errors.firstName)}
// //               />
// //               {errors.firstName && (
// //                 <p className="text-red-500 text-xs mt-1">
// //                   {errors.firstName.message}
// //                 </p>
// //               )}
// //             </div>

// //             {/* Last Name */}
// //             <div className="w-1/2">
// //               <input
// //                 type="text"
// //                 placeholder="Last Name"
// //                 {...register("lastName", { required: "Last name is required" })}
// //                 className={formStyles(errors.lastName)}
// //               />
// //               {errors.lastName && (
// //                 <p className="text-red-500 text-xs mt-1">
// //                   {errors.lastName.message}
// //                 </p>
// //               )}
// //             </div>
// //           </div>

// //           {/* Email Address */}
// //           <div>
// //             <input
// //               type="email"
// //               placeholder="Email Address"
// //               {...register("email", {
// //                 required: "Email is required",
// //                 pattern: {
// //                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
// //                   message: "Invalid email address",
// //                 },
// //               })}
// //               className={formStyles(errors.email)}
// //             />
// //             {errors.email && (
// //               <p className="text-red-500 text-xs mt-1">
// //                 {errors.email.message}
// //               </p>
// //             )}
// //           </div>

// //           {/* Matric Number */}
// //           <div>
// //             <input
// //               type="text"
// //               placeholder="Matric Number (e.g., MNE/20/0343)"
// //               {...register("matricNumber", {
// //                 required: "Matric number is required",
// //                 pattern: {
// //                   value: /^[A-Z]{3}\/\d{2}\/\d{4}$/,
// //                   message: "Matric number must follow the format MNE/20/0343",
// //                 },
// //               })}
// //               className={formStyles(errors.matricNumber)}
// //             />
// //             {errors.matricNumber && (
// //               <p className="text-red-500 text-xs mt-1">
// //                 {errors.matricNumber.message}
// //               </p>
// //             )}
// //           </div>

// //           <div className="flex space-x-4">
// //             {/* Create Password */}
// //             <div className="w-1/2">
// //               <input
// //                 type="password"
// //                 placeholder="Create Password"
// //                 {...register("password", { required: "Password is required" })}
// //                 className={formStyles(errors.password)}
// //               />
// //               {errors.password && (
// //                 <p className="text-red-500 text-xs mt-1">
// //                   {errors.password.message}
// //                 </p>
// //               )}
// //             </div>

// //             {/* Confirm Password */}
// //             <div className="w-1/2">
// //               <input
// //                 type="password"
// //                 placeholder="Confirm Password"
// //                 {...register("confirmPassword", {
// //                   required: "Please confirm your password",
// //                   validate: (value) =>
// //                     value === password || "Passwords do not match",
// //                 })}
// //                 className={formStyles(errors.confirmPassword)}
// //               />
// //               {errors.confirmPassword && (
// //                 <p className="text-red-500 text-xs mt-1">
// //                   {errors.confirmPassword.message}
// //                 </p>
// //               )}
// //             </div>
// //           </div>

// //           {/* Submit Button with Loading State */}
// //           <button
// //             type="submit"
// //             className={`w-full text-white py-2 rounded-lg transition ${
// //               loading
// //                 ? "bg-gray-400 cursor-not-allowed"
// //                 : "bg-[#086CB4] hover:bg-blue-600"
// //             }`}
// //             disabled={loading} // Disable the button when loading
// //           >
// //             {loading ? "Submitting..." : "Sign Up"}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }
