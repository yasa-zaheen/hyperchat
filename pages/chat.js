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

  return (
    <div className="relative h-full sm:h-screen w-full flex overflow-hidden">
      <ActivityBar hidden={activityBarHidden} />

      <div className="h-screen w-full relative flex flex-col">
        <Header
          activityBarHidden={activityBarHidden}
          setActivityBarHidden={setActivityBarHidden}
        />
        <ChatArea scroller={scroller} />
        <ChatInput scroller={scroller} />
      </div>
    </div>
  );
}

export default Chat;
