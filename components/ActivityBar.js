// React
import { useRef, useState, useEffect } from "react";

// Firebase
import { db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Components
import UserCard from "./UserCard";

function ActivityBar({ hidden }) {
  // States
  const [mounted, setMounted] = useState(false);

  // Refs
  const activityBar = useRef();

  // Effects
  useEffect(() => {
    setMounted(true);
  }, []);

  // Firebase
  const usersCollection = db.collection("users");
  const usersDocuments = usersCollection.orderBy("lastSeen", "desc");
  const [usersSnapshot] = useCollectionData(usersDocuments);

  // Condition

  mounted
    ? !hidden
      ? activityBar.current.classList.remove("-translate-x-full")
      : activityBar.current.classList.add("-translate-x-full")
    : null;

  return (
    <div
      ref={activityBar}
      className="absolute md:relative -translate-x-full md:translate-x-0 z-50 h-screen w-full md:w-1/3 bg-white dark:bg-black mt-16 sm:m-0 p-4 overflow-y-scroll duration-200 ease-in-out"
    >
      {usersSnapshot &&
        usersSnapshot.map((user) => <UserCard key={user.uid} user={user} />)}
    </div>
  );
}

export default ActivityBar;
