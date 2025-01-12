"use client"

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Login: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const schoolCode = globalThis.localStorage?.getItem("SCHOOL_CODE");
    console.log(schoolCode);

    if (schoolCode) {
      // alert(schoolCode);
      router.replace(`/schools/${schoolCode}/login`);
    } else {
      router.replace(`/schools`);
    }
  }, []);
  return <div></div>;
};

export default Login;
