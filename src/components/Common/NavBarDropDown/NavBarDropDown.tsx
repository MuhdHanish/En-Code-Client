import { RxAvatar } from "react-icons/rx";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { logout } from "../../../redux/userSlice/userSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";

interface User {
  profile: string;
  username: string;
}

export const NavBarDropDown = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { user } = useSelector((state: RootState) => state.userReducer);
  useEffect(() => {
   if (user) {
     setCurrentUser(user);
   }
  }, [user]);
  
  const [drop, setDrop] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const dropDownItemsClasses = classNames(
    "text-sm", "font-normal",
    "p-2.5","hover:bg-gray-100",
    "flex","flex-row",
    "gap-1.5","items-center"
  );

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest("#drop-down")) {
        setDrop(false);
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
    window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={"flex flex-row items-center gap-5 h-7 w-7 relative"}
      id={"drop-down"}>
      <div
        className={
          "h-full border-accent-color-one profile-picture cursor-pointer"
        }
        onClick={() => setDrop((state) => !state)}>
        <img
          src={currentUser?.profile || ""}
          alt={"Profile"}
          className={"object-cover h-full  rounded border-accent-color-one"}
        />
      </div>
      {drop && (
        <div
          className={`navbar-dropdown z-50 fixed md:absolute top-14 right-0 bg-white shadow-md rounded 
          flex flex-col w-screen md:w-fit min-w-[200px]`}id={"second-component"}>
          <div
            className={"flex flex-row w-min justify-center gap-2.5 border p-2.5 rounded m-2.5"}>
            <div style={{ width: "30px", height: "30px" }}>
              <img src={currentUser?.profile || ""}
                alt={"Profile"} className={"object-cover rounded h-full w-full border-accent-color-one"}
              />
            </div>
            <div className={"w-max"}>
              <p className={"text-[11px]"}>Logged in as</p>
              <p className={"text-[13px] "}>
                {currentUser  ? currentUser?.username : "User"}
              </p>
            </div>
          </div>
          <ul className={"w-full flex flex-col cursor-pointer"}>
            <li className={dropDownItemsClasses}>
              <RxAvatar /> Update Profile
            </li>
            <li className={dropDownItemsClasses}>
              <FiSettings />
              Settings
            </li>
            <li
              className={dropDownItemsClasses + " text-danger"}
              onClick={handleLogout}
            >
              <FiLogOut />
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
