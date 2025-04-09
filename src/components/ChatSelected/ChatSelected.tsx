import { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import ChatHeader from "../chat/chatHeader/ChatHeader";
import MessageSkeleton from "../skeletton/MessageSkeleton";
import { formatMessageTime } from "../../lib/utils";
import { useAuthStore } from "../../store/useAuthStore";
import MessagesInput from "../message-input/MessageInput";

const ChatSelected = () => {
  const { getMessage, messages, chatUser, isMessagesLoading } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (chatUser?._id) {
      getMessage(chatUser._id);
    }
  }, [getMessage, chatUser]);

  if (isMessagesLoading) {
    return (
      <div className="w-full h-full flex flex-col">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto">
          <MessageSkeleton />
        </div>
        <MessagesInput />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages?.map((message: any) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser?._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser?._id
                      ? authUser?.profilePic ||
                        "https://raw.githubusercontent.com/burakorkmez/fullstack-chat-app/master/frontend/public/avatar.png"
                      : chatUser?.profilePic ||
                        "https://raw.githubusercontent.com/burakorkmez/fullstack-chat-app/master/frontend/public/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1 text-xs opacity-60">
              <span className="ml-1">
                {formatMessageTime(message.createdAt)}
              </span>
            </div>
            <div
              className={`chat-bubble ${
                message.senderId === authUser?._id
                  ? "bg-base-300/100"
                  : "bg-base-300/90"
              } break-words`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <MessagesInput />
    </div>
  );
};

export default ChatSelected;
