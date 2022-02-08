function IconButton({ Icon, className, onClick }) {
  const style = `h-10 w-10 p-3 rounded-full ${className}`;

  return (
    <button onClick={onClick} className={style}>
      <Icon />
    </button>
  );
}

export default IconButton;
