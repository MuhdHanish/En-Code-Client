import {
  GoTriangleDown,
  GoTriangleLeft,
  GoTriangleRight,
} from "react-icons/go";
import { Course } from "../../../dtos/Course";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { getFullCourses } from "../../../utils/courseUtils";
import { getFullCategories } from "../../../utils/categoryUtils";
import {setSelectedCourseId} from "../../../redux/userSlice/userSlice"
import { useDispatch } from "react-redux";

const StudentCatalog: React.FC = () => {
  const [categories, setCategories] = useState<
    { _id?: string; categoryname?: string; description?: string }[]
  >([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLanguage, setIsLanguage] = useState(true);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleIconClick = () => {
    setIsLanguage((prevState) => !prevState);
  };

  const smoothScroll = (
    element: HTMLElement,
    distance: number,
    direction: "left" | "right"
  ) => {
    const step = 30;
    let currentScroll = element.scrollLeft;
    const targetScroll = currentScroll + distance;
    const animateScroll = () => {
      if (
        (distance > 0 && currentScroll < targetScroll) ||
        (distance < 0 && currentScroll > targetScroll)
      ) {
        currentScroll += step * (direction === "right" ? 1 : -1);
        element.scrollLeft = currentScroll;
        requestAnimationFrame(animateScroll);
      }
    };
    animateScroll();
  };

  const handleScroll = (side: string) => {
    if (cardContainerRef.current && side === "left") {
      smoothScroll(cardContainerRef.current, -820, "left");
    } else if (cardContainerRef.current && side === "right") {
      smoothScroll(cardContainerRef.current, 820, "right");
    }
  };

  useEffect(() => {
    getFullCategories()
      .then((res) => {
        setCategories(
          res as { _id?: string; categoryname?: string; description?: string }[]
        );
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getFullCourses()
      .then((res) => {
        setCourses(res as Course[]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-full h-full flex">
      <div className="hidden w-1/5 bg-white sm:flex flex-col border">
        <div className="w-full h-1/6 flex p-2 justify-center items-center">
          <div
            className={`flex items-center cursor-pointer`}
            onClick={handleIconClick}
          >
            <h5 className="font-semibold text-[13px]">Languages</h5>
            <div className="ml-1">
              <GoTriangleDown
                className={`transform ${isLanguage ? "rotate-180" : ""}`}
              />
            </div>
          </div>
        </div>
        <div
          className={`text-center px-5 ${
            isLanguage ? "h-5/6" : "h-0"
          } overflow-auto transition-all duration-700`}
        >
          {categories.map((category, index) => (
            <div
              className="my-2 text-[11px] p-1 cursor-pointer font-semibold hover:text-primary"
              key={index}
            >
              {category.categoryname}
            </div>
          ))}
        </div>
      </div>
      <div className="w-4/5 bg-white p-5">
        <div className="flex h-1/2 flex-col">
          <div className="flex w-full h-1/6 items-center">
            <span className="font-semibold text-xl">Explore the catalog</span>
          </div>
          <div className="flex w-full h-1/6 items-center justify-end px-2">
            <div>
              <GoTriangleLeft
                style={{ fontSize: 27, cursor: "pointer" }}
                className="card-mover transition"
                onClick={() => handleScroll("left")}
              />
            </div>
            <div>
              <GoTriangleRight
                style={{ fontSize: 27, cursor: "pointer" }}
                className="card-mover transition"
                onClick={() => handleScroll("right")}
              />
            </div>
          </div>
          <div
            className="flex w-full h-full overflow-x-auto p-3 gap-6"
            ref={cardContainerRef}
          >
            {categories?.map((category, index) => (
              <div
                key={index}
                className="my-2 min-w-[250px] h-full hover:shadow-black text-[15px] p-1 border justify-center items-center flex
                   flex-col shadow-sm px-3 bg-expolore-all-card cursor-pointer hover:translate-x-1 hover:-translate-y-1 transition"
              >
                <div className="bg-white flex flex-col items-start justify-center w-full p-3">
                  <div className="my-1 text-[12px]">Explore all</div>
                  <div className="flex justify-start items-center font-semibold">
                    {category.categoryname}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full  p-3">
          <div className="w-full h-1/6 flex text-[14px] font-semibold mb-3">
            Most popular
          </div>
          <div className="grid grid-cols-1   sm:grid-cols-2 lg:grid-cols-3  gap-3">
            {courses?.map((course, index) => (
              <div
                key={index}
                onClick={() => { dispatch(setSelectedCourseId(course._id as string)), navigate(`/course/${course._id as string}`) }}
                className="w-[250px] border-black border rounded"
              >
                <div className="flex flex-col justify-between h-full p-3 gap-3">
                  <div className="text-[12px] bg-purple-300 rounded-sm p-1">
                    {course.isPaid ? "Paid Course" : "Free Course"}
                  </div>
                  <div className="text-[15px] font-semibold p-1">
                    {course.coursename}
                  </div>
                  <div className="text-[11px] overflow-hidden whitespace-normal p-1">
                    {course.description}
                  </div>
                  <div className="text-[12px] border-t border-black border-dotted p-1">
                    {course.level}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCatalog;
