import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { apiError } from "../../../api/ApiInterface";
import handleForm from "../../../utils/handleFormState";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { PasswordField, AtuhenticationError } from "../AuthenticationComponents/Common";
import { OtpField, EmailField, UsernameField } from "../AuthenticationComponents/Signup";
import { handleSignupStepOne, handleSignupStepTwo } from "../../../utils/Authentication/handleSignup";

interface SingupProps {
  isOtpSended: boolean;
  role: string;
  signupError: string;
  setIsOtpSended: (value: boolean) => void;
  setResError: (value: string) => void;
}

const Signup: React.FC<SingupProps> = ({isOtpSended,role,setIsOtpSended,setResError,signupError}) => {
  const navigate = useNavigate();
  const [uId, setUId] = useState<string>("");
  const [enteredOtp, setOtp] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [otpValidity, setOtpValidity] = useState<number>(120);
  const [signupState, setSignupState] = handleForm({ username: "", email: "", password: "", role });
  const [errors, setErrors] = useState<{ field: string; errors: string[] } | null>({ field: "", errors: [""] });
  const setError = (field: string, errorMessages: string[]) => setErrors({ field, errors: errorMessages });
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isOtpSended && otpValidity > 0) {
      timer = setInterval(() => {setOtpValidity((prevValidity) => prevValidity - 1)}, 1000);
    }
    return () => {if (timer) {clearInterval(timer);}};
  }, [isOtpSended, otpValidity]);

  const handleStepOne = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    event.preventDefault();
    setOtpValidity(120);
    handleSignupStepOne({
      role,setError,
      Userusername: signupState.username as string,
      Useremail: signupState.email as string,
      Userpassword: signupState.password as string,
    })
      .then((res) => {
        setLoading(false);
        if (res) {setUId(res as string),setIsOtpSended(true);setResError("");}
      })
      .catch((err: apiError) => {setLoading(false), setResError(err.message)});
  };

  const handleStepTwo = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    handleSignupStepTwo({
      role,setError, uId,UserenteredOtp: enteredOtp,
      Useremail: signupState.email as string,
      Userusername: signupState.username as string,
      Userpassword: signupState.password as string,
    })
      .then((res) => {
        setLoading(false);
        if (res) {
          if (role === "student") { navigate(`/`, { replace: true }); }
          else {navigate(`/${role}`, { replace: true });}
        }
      })
      .catch((err: apiError) => { setLoading(false), setResError(err.message); });};

  return (
    <div>
      <form onSubmit={isOtpSended ? handleStepTwo : handleStepOne}>
        <div className="flex flex-col justify-center gap-2 px-5 py-2">
          {isOtpSended ? (
            <OtpField enteredOtp={enteredOtp} setEnteredOtp={setOtp} handleStepOne={handleStepOne}
              errors={errors}otpValidity={otpValidity} setErrors={setErrors}
            />
          ) : (
            <div className="flex flex-col gap-1">
              <UsernameField signupState={signupState} errors={errors} setSignupState={setSignupState} />
              <EmailField signupState={signupState} errors={errors} setSignupState={setSignupState} setErrors={setErrors} />
              <PasswordField passedState={signupState} errors={errors} setPassedState={setSignupState} setErrors={setErrors} />
            </div>
          )}
          {signupError && <AtuhenticationError passedError={signupError} />}
          <div className="flex flex-col">
            <button className="btn-class flex justify-center items-center gap-2" type="submit">
               {loading ?<><LoadingSpinner /> <span>Please wait</span></>  : isOtpSended ? "Confirm" : "Sign up"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
