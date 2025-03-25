import Image from "next/image";
import React from "react";
import Logo from "@/assets/logo/Logo.png"

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-accent400 flex items-center justify-center z-50">
      <Image
        src={Logo}
        alt="Loading"
        className="w-32 h-32 animate-pulse bg-white p-2 rounded shadow-lg"
      />
    </div>
  );
};

export default Loading;
