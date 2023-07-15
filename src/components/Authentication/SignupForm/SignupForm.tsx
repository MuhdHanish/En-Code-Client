import React, { useState } from "react";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import WhichUser from "../WhichUser/WhichUser";

const SignupForm: React.FC = () => {

  const [isOtpSended, setIsOtpSended] = useState<boolean>(false);
  const [role, setRole] = useState<string>("student");
  return (
    <div className="flex flex-col items-center justify-center w-full gap-3 ">
      {isOtpSended ? (
        <div className="flex flex-col justify-center items-center font-semibold">
          <span>OTP varifcation</span>
        </div>
      ) : (
        <>
          <WhichUser setRole={setRole} role={role} />
          <div>
            <GoogleAuth role={role} method="Sign up" />
          </div>
          <div className="text-[10px] text-gray-400 flex justify-center items-center gap-2">
            <div className="border  w-10"></div>
            <div>Or Sign up with</div>
            <div className="border w-10"></div>
          </div>
        </>
      )}

      <div>
        <AuthForm role="student" method="Sign up" isOtpSended  />
      </div>
      {isOtpSended ? (
        ""
      ) : (
        <>
          <div className=" text-primary text-[10px]">
            <div>
              <Link to={"/login"}>Already have an account ?</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignupForm;