import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import {
  getAdLanguages,
  listTheLanguage,
  unlistTheLanguage,
} from "../../../utils/LanguageUtils";
import { LanguageCard } from "../../Common/CardCompnent/CardCompoent";
import Pagination from "../../Common/Pagination/Pagination";
import { Language } from "../../../dtos/Language";

const LanguageList: React.FC = () => {
  const [languages, setLanguages] = useState<Language[] | []>([]);
  const [filteredLangugeList, setFilteredLanguageList] = useState<Language[] | []>([]);
  const [selectedOption, setSelectedOption] = useState<string>("option1");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const fetchLanguages = useCallback(() => {
    getAdLanguages()
      .then((res) => {
        setLanguages(res as Language[]);
      })
      .catch((err) => {
        toast.error(err as string, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }, []);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postPerPage = 8;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const [currentPosts, setCurrentPosts] = useState<Language[] | []>([]);
  useEffect(() => {
    setCurrentPosts(filteredLangugeList.slice(firstPostIndex, lastPostIndex)); 
  },[filteredLangugeList, firstPostIndex, lastPostIndex])
  useEffect(() => {
    fetchLanguages();
  }, [fetchLanguages]);
  const unListLanguage = (id: string) => {
    unlistTheLanguage(id)
      .then((res) => {
        if (res) fetchLanguages();
        return;
      })
      .catch((err) => {
        toast.error(err as string, {
        position: "top-right", autoClose: 3000, hideProgressBar: false,closeOnClick: true,
          pauseOnHover: true, draggable: true, progress: undefined,
        });
      });
  };
  const listLanguage = (id: string) => {
    listTheLanguage(id)
      .then((res) => {
        if (res) fetchLanguages();
        return;
      })
      .catch((err) => toast.error(err as string, {
        position: "top-right", autoClose: 3000, hideProgressBar: false,closeOnClick: true,
          pauseOnHover: true, draggable: true, progress: undefined,
        }));
  };
  useEffect(() => {
    const filteredList = languages.filter((language) => {
      const languagenameMatch = language.languagename
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const descriptionMatch = language.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      if (selectedOption === "option2") {
        return (languagenameMatch || descriptionMatch) && language.status === false;
      } else if (selectedOption === "option3") {
        return (descriptionMatch || languagenameMatch) && language.status === true;
      } else {
        return descriptionMatch || languagenameMatch; 
      }
    });
    setFilteredLanguageList(filteredList);
  }, [searchQuery, languages, selectedOption]);
  return (
    <div className="w-full h-full flex flex-col  overflow-x-hidden">
      <div className="flex w-full h-fit justify-between items-center p-5 ">
        <div className="flex w-fit h-fit bg-white ">
          <select
            className="appearance-none bg-white border border-gray-300 rounded py-2 px-4  text-gray-700 leading-tight focus:outline-none focus:border-primary"
            name="userStatus"
            id="userStatus"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="option1">All Languages</option>
            <option value="option2">UnListed</option>
            <option value="option3">Listed</option>
          </select>
        </div>
        <div className="flex w-fit h-fit bg-white">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search"
            className="appearance-none bg-white border border-gray-300 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full  p-5 ">
         {currentPosts.length > 0 ? currentPosts?.map((language, idx) => (
          <LanguageCard
            key={idx}
            language={language}
            list={listLanguage}
            unList={unListLanguage}
          />
        )) : (<span>No language found !</span>)}
      </div>
      {filteredLangugeList.length > postPerPage && (<div className="flex w-full h-full p-5 justify-center items-end ">
        <Pagination
          postsPerPage={postPerPage}
          totalPosts={filteredLangugeList?.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>)}
    </div>
  );
};

export default LanguageList;
