"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
// import { GetServerSideProps } from "next";

const Layout = ({ children }: { children: ReactNode }) => {
  const params = useParams<{ code: string }>();
  const code = params?.code;

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (code) {
      verifyTenantSchool(code as string);
    }

    // alert(code);

    localStorage.setItem("SCHOOL_CODE", code as string);
  }, [code]);

  const verifyTenantSchool = async (code: string) => {
    // try {
    //   const response = await fetch(
    //     `https://your-django-backend.com/api/verify-tenant/${code}/`
    //   );
    //   if (response.ok) {
    //     const data = await response.json();
    //     setIsValid(data.isValid);
    //   } else {
    //     console.error("Failed to verify tenant school");
    //   }
    // } catch (error) {
    //   console.error("Error verifying tenant school:", error);
    // }
    setIsValid(true);
  };

  if (!isValid) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default Layout;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { code }: any = context.params;

//   if (!code) {
//     return {
//       notFound: true,
//     };
//   }

//   try {
//     const response = await fetch(
//       `https://your-django-backend.com/api/verify-tenant/${code}/`
//     );
//     if (response.ok) {
//       const data = await response.json();
//       return {
//         props: {
//           isValid: data.isValid,
//         },
//       };
//     } else {
//       return {
//         notFound: true,
//       };
//     }
//   } catch (error) {
//     console.error("Error verifying tenant school:", error);
//     return {
//       notFound: true,
//     };
//   }
// };
