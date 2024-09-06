import React from "react";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center y-[19px] overflow-hidden">
      <div className="flex w-[1600px] mx-auto h-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
