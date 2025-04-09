import { useEffect } from "react";
import { Users } from "lucide-react";

import { useChatStore } from "../../../store/useChatStore";
import SidebarSkeleton from "../../skeletton/Skeleton";

const Sidebar = () => {
  const { getUsers, users, isUsersLoading, selectedUser, chatUser } =
    useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 overflow-y-auto">
      <div className="border-b border-base-300 w-full p-6 flex items-end gap-2">
        <Users className="size-6" />
        <span className="font-medium hidden lg:block">Contacts</span>
      </div>
      <div className="overflow-y-auto w-full py-3">
        {users?.map((user) => (
          <button
            key={user._id}
            onClick={() => selectedUser(user)}
            className={`
            w-full p-3 flex items-center gap-3 hover:bg-base-300
            ${
              user._id === chatUser?._id
                ? "ring-1 ring-base-300 bg-base-200 "
                : ""
            }
            `}
          >
            <img
              src={
                user.profilePic ||
                "https://raw.githubusercontent.com/burakorkmez/fullstack-chat-app/master/frontend/public/avatar.png"
              }
              alt="img"
              className="rounded-full size-12"
            />
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">Offline</div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
