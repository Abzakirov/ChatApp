import { X } from "lucide-react";
import { useChatStore } from "../../../store/useChatStore";

const ChatHeader = () => {
  const { chatUser, selectedUser } = useChatStore();
  return (
    <div className="flex items-center border-b border-base-300 justify-between p-3">
      <div className="flex  items-center gap-3  justify-between">
        <div className="relative mx-auto lg:mx-0">
          <img
            src={
              chatUser?.profilePic ||
              "https://raw.githubusercontent.com/burakorkmez/fullstack-chat-app/refs/heads/master/frontend/public/avatar.png"
            }
            alt={chatUser?.fullName}
            className="size-12 object-cover rounded-full"
          />
          {/* {onlineUsers.includes(user._id) && (
          <span
            className="absolute bottom-0 right-0 size-3 bg-green-500
            rounded-full ring-2 ring-zinc-900"
          />
        )} */}
        </div>
        <div className="hidden lg:block text-left min-w-0">
          <div className="font-medium truncate">{chatUser?.fullName}</div>
          <div className="text-sm text-zinc-400">Offline</div>
        </div>
      </div>
      <button onClick={() => selectedUser(null)}>
        <X />
      </button>
    </div>
  );
};

export default ChatHeader;
