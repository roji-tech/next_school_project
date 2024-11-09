"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Homepage = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/admin");
    }, 5000);
  }, []);

  return (
    <div className="">
      <h1>Homepage will redirect to admin page in few seconds,</h1>
      <h2>/student for student dashboard</h2>
      <h2>/teacher for teacher dashboard</h2>
      <h2>/parent for parent dashboard</h2>
    </div>
  );
};

export default Homepage;
