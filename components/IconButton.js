function IconButton({ Icon, className }) {
  const style = `h-5 w-5 rounded-full ${className}`;

  return (
    <button className={style}>
      <Icon />
    </button>
  );
}

export default IconButton;
