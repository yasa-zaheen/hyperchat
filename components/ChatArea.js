// Components
import Message from "./Message";

// Firebase
import { db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

function ChatArea({ scroller }) {
  // Firebase
  const messagesCollection = db.collection("messages");
  const messagesDocuments = messagesCollection
    .orderBy("createdAt", "desc")
    .limit(25);
  const [messagesSnapshot] = useCollectionData(messagesDocuments, {
    idField: "id",
  });

  return (
    <div className="flex flex-col-reverse flex-1 max-h-fit p-4 overflow-scroll overflow-x-hidden">
      <div ref={scroller}></div>
      {messagesSnapshot?.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}

export default ChatArea;
