// Next JS
import Image from "next/image";

function UserCard({ user, messages }) {
  const activeStatus = (user) => {
    const userLastSeen = user.lastSeen?.toDate();
    const dateObject = new Date();
    const currentTime = dateObject;
    const timeDelta = userLastSeen - currentTime;

    if (timeDelta < -5000) {
      return (
        <div className="h-2 w-2 bg-white opacity-25 rounded-full ml-2"></div>
      );
    } else {
      return <div className="h-2 w-2 bg-[#32c759] rounded-full ml-2"></div>;
    }
  };

  const showLastSeen = (user) => {
    if (user.lastSeen) {
      const dateTimeObject = user.lastSeen.toDate();
      return `Last seen at ${dateTimeObject.getDate()} / ${
        dateTimeObject.getMonth() + 1
      } / ${dateTimeObject.getFullYear()} at ${dateTimeObject.getHours()}:${
        dateTimeObject.getMinutes() < 10
          ? `0${dateTimeObject?.getMinutes()}`
          : dateTimeObject?.getMinutes()
      }`;
    } else {
      return "Last seen right now";
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
