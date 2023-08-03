import React, { useState } from 'react'
import SideNav from './SessionComponents/SideNav/SideNav';
import { TutorSession } from '..';
import BottumNav from './SessionComponents/BottumNav/BottumNav';
import AddTutorial from './TutuorComponents/AddTutorial';

const TutorSessionGate: React.FC = () => {
  const [sessionMode, setSessionMode] = useState<number>(0);
  return (
    <div className="bg-white w-full  h-full flex flex-col lg:flex-row justify-center items-center overflow-hidden relative ">
      <div className="hidden lg:flex h-full justify-center items-center">
        <SideNav setSessionMode={setSessionMode} sessionMode={sessionMode} />
      </div>
      {sessionMode === 0 ? <TutorSession /> : null}
      {sessionMode === 1 ? <AddTutorial /> : null}
      {sessionMode === 2 ? <TutorSession /> : null}
      <div className="flex lg:hidden w-full justify-center items-center">
        <BottumNav sessionMode={sessionMode} setSessionMode={setSessionMode} />
      </div>
    </div>
  );
}

export default TutorSessionGate