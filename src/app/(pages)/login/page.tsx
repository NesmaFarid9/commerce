import React from "react";
import { LoginForm } from "./_component/LoginForm/LoginForm";

export default function Login() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6 min-h-screen">
        <LoginForm />
      </div>
    </>
  );
}
