function IconButton({ Icon, className, onClick }) {
  const style = `h-5 w-5 rounded-full ${className}`;

  return (
    <button onClick={onClick} className={style}>
      <Icon />
    </button>
  );
}

export default IconButton;
