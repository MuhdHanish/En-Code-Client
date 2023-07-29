import React, { useState } from "react";
import { FormValues } from "../../../dtos/Form";
import HandleForm from "../../../utils/handleFormState";
import CommonField from "./SessionComponents/CommonField/CommonField";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { User } from "../../../dtos/User";
import { toast } from "react-toastify";
import { handleUpload } from "../../../utils/classUpload/handleUpload";
import LoadingSpinner from "../../Common/LoadingSpinner/LoadingSpinner";
import SideNav from "./SessionComponents/SideNav/SideNav";

const TutorSession: React.FC = () => {
  const [sessionState, setSessionState] = HandleForm({
    coursename: "", category: "",
    level: "", isPaid: "", price: "0", description: "",
  } as FormValues );
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const handleVideoInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setSelectedVideo(selectedFile || null);
  };
  const handleVideoDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const selectedFile = event.dataTransfer.files[0];
      setSelectedVideo(selectedFile);
    };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
  };
  const [error, setError] = useState<string>("");
  const setErr = (error: string) => setError(error);
  const user: User | null = useSelector(
    (state: RootState) => state.userReducer.user
  );
  const userId = user?._id;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    if (!sessionState.coursename || !sessionState.category ||!sessionState.isPaid ||
      !sessionState.description ||!sessionState.level ||!selectedVideo 
    ) {
      console.log(sessionState.coursename,selectedVideo,sessionState.description,sessionState.category,sessionState.isPaid,sessionState.level)
      setLoading(false);
      setError("Please fill all required fields");
      return;
    }
    setError("");
    let isPaid = false;
    if (sessionState.isPaid === "yes") {
      isPaid = true;
    }
    let price = 0;
    if (
      sessionState.price !== "" &&
      !isNaN(parseInt(sessionState.price as string)) &&
      parseInt(sessionState.price as string) > 0 &&
      sessionState.isPaid === "yes"
    ) {
      price = parseInt(sessionState.price as string);
    }
    handleUpload(
      {
        tutorId: userId as string,
        category: sessionState.category,
        coursename: sessionState.coursename,
        description: sessionState.description,
        isPaid: isPaid,
        level: sessionState.level,
        price: price,
      },
      setErr,
      selectedVideo,
    )
      .then((res) => {
        setLoading(false);
        setSelectedVideo(null);
        if (res) {
          console.log(res)
          toast.success("Course uploaded successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <>
      <div className="bg-white w-full  h-full flex justify-center items-center  ">
        <SideNav/>
        <div className="w-full  h-full p-5">
          <div className="w-full  h-full border rounded-lg p-5 sm:items-center flex gap-3  shadow-lg overflow-scroll">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center items-center  gap-8 flex-wrap overflow-scroll">
                <CommonField
                  fieldName="coursename"
                  passedState={sessionState}
                  setPassedState={setSessionState}
                  type={"text"}
                  showName={"Course name"}
                />
                <CommonField
                  fieldName="category"
                  passedState={sessionState}
                  setPassedState={setSessionState}
                  type={"select"}
                  showName={"Category"}
                />
                <CommonField
                  fieldName="isPaid"
                  passedState={sessionState}
                  setPassedState={setSessionState}
                  type={"selectIsPaid"}
                  showName={"Is Paid or Not"}
                />
                <CommonField
                  fieldName="price"
                  passedState={sessionState}
                  setPassedState={setSessionState}
                  type={"price"}
                  showName={"Price"}
                />
                <CommonField
                  fieldName="level"
                  passedState={sessionState}
                  setPassedState={setSessionState}
                  type={"selectLevel"}
                  showName={"Level"}
                />
                <div className="  flex flex-col ">
                  <div
                    className="flex flex-col items-start gap-1 "
                    onDrop={handleVideoDrop}
                    onDragOver={handleDragOver}
                  >
                    <label
                      htmlFor="video"
                      className="text-[14px] text-shadow-black"
                    >
                      {selectedVideo
                        ? "Change Video"
                        : "Drag and Drop or Click "}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      className="border  text-xs p-2 text-[10px] w-[250px] rounded-md outline-none shadow-md"
                      accept=".mp4, .avi, .mov, .mkv, .webm"
                      onChange={handleVideoInput}/>
                  </div>
                </div>
                <CommonField
                  fieldName="description"
                  passedState={sessionState}
                  setPassedState={setSessionState}
                  type={"textarea"}
                  showName={"Description"}
                />
                <div className="felx flex-col items-center ">
                  {error && (
                    <div className="text-red-600 text-sm font-semibold mb-2">
                      {error}
                    </div>
                  )}
                  <button className="btn-class border text-[14px] p-2  w-[250px] sm:max-w-[250px] mb-5  rounded-md outline-none shadow-md">
                    {loading ? (
                      <>
                        <LoadingSpinner /> <span>Please wait</span>
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorSession;
