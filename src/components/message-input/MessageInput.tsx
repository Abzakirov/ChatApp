import { useState, useRef } from "react";
import { Image, Send } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";

const MessagesInput = () => {
  const [text, setText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { sendMessage } = useChatStore();

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (!text.trim()) return; 

    await sendMessage({
      text: text.trim(),
    });

    setText(""); 
  };

  return (
    <div className="p-4 w-full">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)} 
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
          />
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
          />
        </div>

        <button
          type="button"
          className="hidden sm:flex btn btn-circle"
        >
          <Image size={20} />
        </button>

        <button type="submit" className="btn btn-sm btn-circle">
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessagesInput;
