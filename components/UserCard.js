// Next JS
import Image from "next/image";

function UserCard({ user }) {
  const activeStatus = (user) => {
    const userLastSeen = user.lastSeen?.toDate();
    const dateObject = new Date();
    const currentTime = dateObject;
    const timeDelta = userLastSeen - currentTime;

    if (timeDelta > 60000) {
      return "Inactive";
    } else {
      return "Active";
    }
  };

  return (
    <div className="duration-200 ease-in-out flex items-center cursor-pointer hover:bg-neutral-50 hover:dark:bg-neutral-800 p-4 rounded-lg">
      <div className="overflow-hidden h-12 w-12 rounded-full relative">
        <Image src={user.photoURL} layout="fill" objectFit="cover" />
      </div>
      <div className="ml-4">
        <p className="text-md">{user.username}</p>
        <p className="text-xs font-thin ">{activeStatus(user)}</p>
      </div>
    </div>
  );
}

export default UserCard;
