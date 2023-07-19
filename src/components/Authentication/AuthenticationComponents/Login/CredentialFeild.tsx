import { FormValues } from "../../../../dtos/Form";
import React, { ChangeEvent, useState } from "react";
import ErrorTooltip from "../../ErrorTooltip/ErrorTooltip";
import ErrorIndicator from "../../ErrorIndicator/ErrorIndicator";

interface CredentialFieldProps {
  loginState: FormValues;
  errors: { field: string; errors: string[] } | null;
  setLoginState: (event: ChangeEvent<HTMLInputElement>) => void;
  setErrors: (value: null) => void;
}

const CredentialField: React.FC<CredentialFieldProps> = ({ loginState, setLoginState, errors,setErrors }) => {
  
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-1">
        <label htmlFor="credential" className="text-[11px]  text-shadow-black">
          Email or Username <span className="text-red-600 ">*</span>
        </label>
        <div className="relative flex flex-col justify-center items-center">
          <input type="text" name="credential" id="credential"onChange={setLoginState} onClick={()=> setErrors(null)}
            className="border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md"
            placeholder="email or username" value={loginState.credential}/>
          {errors?.field === "credential" && (
            <>
              <ErrorTooltip setHover={setIsHovered} />
              <div className={isHovered ? "block" : "hidden"}>
                <ErrorIndicator errors={errors} />
              </div>
            </>
          )}
        </div>
    </div>
  );
};

export default CredentialField;
