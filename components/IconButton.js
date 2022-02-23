function IconButton({ Icon, className, onClick, children }) {
  const style = `h-10 w-10 p-3 rounded-full active:brightness-75 active:scale-90 ${className}`;

  return (
    <button onClick={onClick} className={style}>
      <Icon />
      {children}
    </button>
  );
}

export default IconButton;
