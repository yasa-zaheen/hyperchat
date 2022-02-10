const textMessageStyles = (sentMessage) => {
  const mainContainerStyle = sentMessage
    ? "w-full flex flex-col items-end mb-8 relative"
    : "w-full flex flex-col items-start mb-8 relative";
  const usernameStyle = sentMessage
    ? "mr-12 text-xs font-medium mb-2 opacity-50 -z-20"
    : "ml-12 text-xs font-medium mb-2 opacity-50 -z-20";
  const rowStyle = sentMessage
    ? "w-fit flex flex-row-reverse items-center"
    : "w-fit flex items-center";
  const textStyle = sentMessage
    ? "h-fit flex-1 mr-2 bg-[#007aff] dark:bg-[#ff2d55] text-white px-4 py-2 rounded-3xl rounded-br-none"
    : "h-fit flex-1 ml-2 bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white px-4 py-2 rounded-3xl rounded-bl-none";
  const actionCenterStyle = sentMessage
    ? "duration-200 ease-in-out scale-0 bg-neutral-50 dark:bg-neutral-800 right-2 absolute bottom-14 h-10 w-fit rounded-3xl shadow-xl"
    : "hidden";
  const actionCenterBtnStyle = sentMessage
    ? "mr-2 bg-neutral-50 dark:bg-neutral-800 text-black dark:text-white"
    : "ml-2 bg-neutral-50 dark:bg-neutral-800 text-black dark:text-white";
  const timeStyle = sentMessage
    ? "mr-14 text-xs mt-2 opacity-50 -z-20"
    : "ml-14 text-xs mt-2 opacity-50 -z-20";

  return (
    mainContainerStyle,
    usernameStyle,
    rowStyle,
    textStyle,
    actionCenterStyle,
    actionCenterBtnStyle,
    timeStyle
  );
};

export { textMessageStyles };
