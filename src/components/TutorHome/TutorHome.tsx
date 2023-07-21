import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import sideImg from "../../assets/home-page-images/tutor-home.png";
import PageModal from "../PageModal/PageModal";
import MainImageFrame from "../MainImageFrame/MainImageFrame";

interface User {
  profile: string;
  username: string;
}

const TutorHome: React.FC = () => {
  const naviagate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user") as string;
    const user = JSON.parse(isLoggedIn) as User;
    setUser(user);
  }, [user, setUser]);
  return (
    <div className="bg-home-background bg-cover w-screen h-screen overflow-hidden ">
      <div className="flex flex-col justify-center items-center h-full">
        <NavBar isTutor={true} />
        <PageModal>
          <div className="sm:w-1/2  w-full h-full flex flex-col justify-center items-center p-3 md:p-8  gap-5">
            <div className="w-full  flex flex-col justify-center  items-start">
              <span className="text-4xl font-bold text-gray-600">EnCode</span>
              <span className="text-2xl font-bold text-primary">Learning</span>
            </div>
            <div className="w-full  flex flex-col justify-center gap-2  items-center">
              <span className="text-md font-medium text-black">
                Hi {user?.username} !
              </span>
              <span className="text-xs font-normal text-gray-600">
                As a coding tutor on our platform, you have access to powerful
                tools and resources to deliver an exceptional coding learning
                experience for your students.
              </span>
            </div>
            <div className="flex justify-center items-center w-full h-fit">
              <button
                className="btn-class min-w-[200px]"
                onClick={() => naviagate("/tutor/session")}
              >
                Start session
              </button>
            </div>
          </div>
          <MainImageFrame imgSrc={sideImg} alt={"tutor-home-image"} />
        </PageModal>
      </div>
    </div>
  );
};

export default TutorHome;
