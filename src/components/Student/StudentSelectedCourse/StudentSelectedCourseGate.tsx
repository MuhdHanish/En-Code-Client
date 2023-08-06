import React, { useState, useCallback, useEffect } from "react";
import { getSelectedCourse } from "../../../utils/courseUtils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Course } from "../../../dtos/Course";
import FirstBox from "./FirstBox/FirstBox";
import CourseDetails from "./CourseDetails/CourseDetails";
import { GoLock, GoUnlock } from "react-icons/go";
import Duration from "./Duration/Duration";

const StudentSelectedCourseGate: React.FC = () => {
  const dispatch = useDispatch();
  const [course, setSelectedCourse] = useState<Course | null>(null);
  const courseDetails = useSelector(
    (state: RootState) => state.userReducer.selectedCourse
  );
  const setCourseDetails = useCallback(() => {
    getSelectedCourse(courseDetails?._id as string)
      .then((res) => {
        setSelectedCourse(res as Course);
      })
      .catch((err) => console.log(err));
  }, [courseDetails?._id]);
  useEffect(() => {
    setCourseDetails();
  }, [setCourseDetails, dispatch]);

  return (
    <div className="bg-white w-full h-full flex justify-center items-center overflow-hidden">
      <div className="flex w-full h-full flex-col overflow-y-scroll">
        <div className="flex flex-col justify-center items-center w-full h-fit">
          <div className="flex w-full  justify-center items-center px-10 p-5 h-fit">
            <CourseDetails course={course as Course} />
          </div>
          <div className="flex w-full  justify-center items-center px-10  h-fit">
            <FirstBox course={course as Course} />
          </div>
          <div className="flex w-full  justify-center items-center  h-fit mt-6">
            <div className="flex w-full flex-col lg:flex-row h-fit px-10 py-6 gap-5 ">
              <div className="flex flex-col justify-start items-center w-full lg:w-1/2  h-full  gap-3 text-medium ">
                <div className="flex  border w-full h-full">
                  <video
                    className="w-full h-full"
                    src={`${import.meta.env.VITE_BUCKET_BASE_URL as string}/${
                      course?.demoUrl as string
                    }`}
                    autoPlay
                    controls
                    controlsList="nodownload"
                  ></video>
                </div>
              </div>
              <div className="flex flex-col justify-start items-center w-full lg:w-1/2  h-full  gap-3 text-medium ">
                <div className="flex justify-start items-center text-[16px] text-black  text-shadow-black">
                  Chapters in this class
                </div>
                <div className="flex flex-col gap-3 w-full h-full justify-center sm:px-10  ">
                  <div
                    className="flex w-full h-fit p-3   justify-between px-10 items-center bg-primary 
                   rounded  border text-white shadow-md "
                  >
                    <span className="flex justify-center items-center gap-5">
                      <button>
                        <GoUnlock style={{ fontSize: "15px" }} />
                      </button>
                      <span className="text-[13px] text-shadow-black">
                        Course Overview
                      </span>
                    </span>
                    <span className="text-[12px] text-shadow-black">
                      <Duration url={course?.demoUrl as string} />
                    </span>
                  </div>
                  {course?.chapters?.map((chapter, idx) => (
                    <div
                      className="flex flex-col gap-7 w-full h-full justify-center  "
                      key={idx}
                    >
                      <div
                        className="flex w-full h-fit p-3   justify-between px-10 items-center gap-5 rounded border
                      hover:translate-x-1 hover:-translate-y-1
                      hover:first-letter:bg-opacity-70 text-black
                        hover:bg-primary  cursor-pointer transition duration-300 shadow-md hover:text-white "
                      >
                        <span className="flex justify-center items-center gap-5">
                          <button>
                            <GoLock style={{ fontSize: "15px" }} />
                          </button>
                          <span className="text-[13px] text-shadow-black">
                            {chapter.title}
                          </span>
                        </span>
                        <span className="text-[12px] text-shadow-black">
                          <Duration url={chapter.url as string} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSelectedCourseGate;