import { auth, provider } from "../firebase";

function login() {
  const signInWithGoogle = () => {
    auth.signInWithRedirect(provider);
  };

  return (
    <div className="h-screen w-full  flex flex-col justify-center items-center">
      <p className="text-5xl font-black mb-4 text-center">
        welcome to hyperchat.
      </p>
      <button
        onClick={signInWithGoogle}
        className="px-4 py-2 border-2 w-1/2 rounded-lg border-neutral-100  duration-200 ease-in-out hover:bg-[#007aff] hover:border-[#007aff] hover:text-white hover:shadow-lg hover:shadow-[#007aff2f] active:brightness-75"
      >
        Sign in with google
      </button>
    </div>
  );
}

export default login;
