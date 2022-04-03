// React
import { useRef, useState } from "react";

// Components / Pages
import Header from "../components/Header";
import ActivityBar from "../components/ActivityBar";
import ChatInput from "../components/ChatInput";
import ChatArea from "../components/ChatArea";

function Chat() {
  const scroller = useRef();
  const [activityBarHidden, setActivityBarHidden] = useState(true);
  const [repliedMessage, setRepliedMessage] = useState("");

  return (
    <div className="relative h-full sm:h-screen w-full flex overflow-hidden">
      <ActivityBar hidden={activityBarHidden} />

      <div className="h-screen w-full relative flex flex-col bg-[#1c1c1e] p-4">
        <Header
          activityBarHidden={activityBarHidden}
          setActivityBarHidden={setActivityBarHidden}
        />
        <ChatArea scroller={scroller} setRepliedMessage={setRepliedMessage} />
        <ChatInput
          scroller={scroller}
          repliedMessage={repliedMessage}
          setRepliedMessage={setRepliedMessage}
        />
      </div>
    </div>
  );
}

export default Chat;
