// Next JS
import Image from "next/image";

function UserCard({ user, messages }) {
  const activeStatus = (user) => {
    const userLastSeen = user.lastSeen?.toDate();
    const dateObject = new Date();
    const currentTime = dateObject;
    const timeDelta = userLastSeen - currentTime;

    if (timeDelta < -150000) {
      return (
        <div className="h-2 w-2 bg-white opacity-25 rounded-full ml-2"></div>
      );
    } else {
      return <div className="h-2 w-2 bg-[#32c759] rounded-full ml-2"></div>;
    }
  };

  const showLastSeen = (user) => {
    if (user.lastSeen) {
      const dateObject = new Date();
      const currentTime = dateObject;
      const timeDelta = user.lastSeen.toDate() - currentTime;
      const timeDeltaInSeconds = Math.round((timeDelta * -1) / 1000);
      const timeDeltaInMinutes = Math.round((timeDelta * -1) / 1000 / 60);
      const timeDeltaHours = Math.round((timeDelta * -1) / 1000 / 60 / 60);

      const message =
        timeDeltaInSeconds < 60
          ? `Last seen ${timeDeltaInSeconds}s ago`
          : timeDeltaInMinutes < 60
          ? `Last seen ${timeDeltaInMinutes}m ago`
          : timeDeltaHours < 60
          ? `Last seen ${timeDeltaHours}h ago`
          : null;

      return message;
    } else {
      return "Last seen 0s ago";
    }
  };

  return (
    <div className="duration-200 ease-in-out flex items-center cursor-pointer hover:bg-neutral-50 hover:dark:bg-neutral-800 p-4 rounded-lg hover:scale-105">
      <div className="overflow-hidden h-12 w-12 rounded-full relative">
        <Image src={user.photoURL} layout="fill" objectFit="cover" />
      </div>
      <div className="ml-4 flex flex-col">
        <p className="text-md mr-2 flex items-center">
          {user.username}
          {activeStatus(user)}
        </p>
        <p className="text-xs opacity-50">{showLastSeen(user)}</p>
      </div>
    </div>
  );
}

export default UserCard;
