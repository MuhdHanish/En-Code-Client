import React, { useState } from "react";
import { Link } from "react-router-dom";
import WhichUser from "../WhichUser/WhichUser";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import Signup from "../../AuthFroms/Signup";


const SignupForm: React.FC = () => {
  const [role, setRole] = useState<string>("student");
  const changeRole = (role: string) => setRole(role);
  const [isOtpSended, setIsOtpSended] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center justify-center w-full gap-3">
      {isOtpSended ? (
        <div className="flex flex-col justify-center items-center font-semibold">
          <span>OTP verification</span>
        </div>
      ) : (
        <>
          <WhichUser setRole={changeRole} role={role} />
          <div>
            <GoogleAuth role={role} method="Sign up" />
          </div>
          <div className="text-[10px] text-gray-400 flex justify-center items-center gap-2">
            <div className="border w-10"></div>
            <div>Or Sign up with</div>
            <div className="border w-10"></div>
          </div>
        </>
      )}
      <>
        <Signup isOtpSended={isOtpSended} role={role} />
      </>
      {isOtpSended ? (
        ""
      ) : (
        <>
          <div className="text-primary text-[10px]">
            <div>
              <Link to={"/login"}>Already have an account?</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignupForm;
