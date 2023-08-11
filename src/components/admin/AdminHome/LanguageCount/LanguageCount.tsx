import React from 'react'
import { MdMilitaryTech } from 'react-icons/md'

interface Props {
  list: [{ _id?: string; languagename?: string; description?: string }];
}

const LanguageCount:React.FC<Props> = ({list}) => {
  return (
   <div className="flex  hover:bg-primary rounded-xl transition duration-300 ">
          <div className="flex flex-col w-full h-fit p-5 gap-3   rounded-xl bg-white shadow-lg hover:translate-y-10 transition duration-300 cursor-pointer">
            <div className="flex w-full hit justify-between gap-28   items-center">
              <div className="flex ">
                <MdMilitaryTech style={{
                  fontSize: "30px" }} />
              </div>
              <div className="flex justify-center items-center w-[32px] h-[32px] rounded-full border-4 p-5 font-bold border-primary">
               {list.length}
              </div>
            </div>
            <div className="flex items-baseline gap-4 text-[15px]  text-gray-400">
              <span>languages</span>
          <span className='font-bold text-[16px] text-black'>{list.length}</span>
            </div>
          </div>
        </div>
  )
}

export default LanguageCount