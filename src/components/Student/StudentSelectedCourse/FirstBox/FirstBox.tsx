import React from 'react'
import { Course } from '../../../../dtos/Course'
import { SiOpslevel } from "react-icons/si";
import { MdMilitaryTech } from "react-icons/md";
import { BsPersonVideo2 } from "react-icons/bs";

interface FirstBoxProps {
  course: Course
}

const FirstBox:React.FC<FirstBoxProps> = ({course}) => {
  return (
    <>
      <div className="flex  justify-around items-center w-full lg:w-1/2   h-fit   bg-white p-7 text-medium">
        <div className="w-fit h-fit flex  ">
          <div className="flex justify-center items-center gap-2">
            <span>
              <SiOpslevel style={{ fontSize: "20px" }} />
            </span>
            <div className="font-semibold flex flex-col justify-center items-center">
              <span className="font-normal text-[12px]">Skill level</span>
              <span className="text-[13px] sm:text-[16px]">
                {course?.level}
              </span>
            </div>
          </div>
        </div>
        <div className="w-fit h-fit flex ">
          <div className="flex justify-center items-center gap-2">
            <span>
              <BsPersonVideo2 style={{ fontSize: "20px" }} />
            </span>
            <div className="font-semibold flex flex-col justify-center items-center ">
              <span className="font-normal text-[12px]">Duration</span>
              <span className="text-[13px] sm:text-[16px]">
                {course?.videos?.length} videos
              </span>
            </div>
          </div>
        </div>
        <div className="w-fit h-fit flex ">
          <div className="flex justify-center items-center gap-2">
            <span>
              <MdMilitaryTech style={{ fontSize: "22px" }} />
            </span>
            <div className="font-semibold flex flex-col justify-center items-center max-[text-12px]">
              <span className="font-normal text-[12px]">Language</span>
              <span className="text-[13px] sm:text-[16px]">
                {course?.language}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FirstBox