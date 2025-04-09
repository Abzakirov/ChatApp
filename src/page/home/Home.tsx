import Sidebar from "../../components/chat/sidebar/Sidebar";
import ChatSelected from "../../components/ChatSelected/ChatSelected";
import NoChatSelected from "../../components/no-chat-selected/NoChatSelected";
import { useChatStore } from "../../store/useChatStore";

const Home = () => {
  const { chatUser } = useChatStore();
  return (
    <div className=" bg-base-200">
      <div className="flex items-center justify-center pt-10 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg owerflow-hidden">
            <Sidebar />
            {chatUser ? <ChatSelected /> : <NoChatSelected />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
