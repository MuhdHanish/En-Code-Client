import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store';
import { Message } from '../../../dtos/Message';
import { User } from '../../../dtos/User';
import { getChatUser } from '../../../utils/chatUtils';

const TabTwo: React.FC = () => {
  const chats = useSelector((state: RootState) => state.chatReducer.chats);
  const currentUser = useSelector((state: RootState) => state.userReducer.user);
  return (
    <div className="flex w-full h-full justify-center items-center text-[13px] p-3  overflow-hidden">
      <div className="flex overflow-y-auto  w-full max-h-[200px] flex-col gap-3 px-5">
        {chats?.length > 0 ? (
          chats?.map((chat, idx) => (
            <div
              className="w-full h-fit flex  p-3 items-center justify-center gap-5 border rounded-md"
              key={idx}
            >
              <div className="flex w-full h-fit gap-3 items-center">
                <div className="flex w-7 h-7">
                  <img
                    className="rounded-sm"
                    src={
                      getChatUser(currentUser as User, chat?.users as User[])
                        ?.profile
                    }
                    alt="user.profile"
                  />
                </div>
                <div className="flex flex-col items-start w-fit h-fit">
                  <div className="w-fit">
                    {
                      getChatUser(currentUser as User, chat?.users as User[])
                        ?.username
                    }
                  </div>
                  <div className="text-[11px] w-fit">
                    {((chat.latestMessage as Message)?.content?.slice(
                      0,
                      11
                    ) as string) + "..."}
                  </div>
                </div>
              </div>
              <div className="flex items-center text-[10px] gap-2">
                <button className="p-1   border border-transparent rounded-md text-transparent  -z-10">
                  Unfollow
                </button>
                <button className="p-1 border border-transparent rounded-md text-transparent -z-10">
                  Message
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-fit flex  p-3 items-center justify-center gap-16 md:gap-5">
            No chats found !
          </div>
        )}
      </div>
    </div>
  );
}

export default TabTwo;