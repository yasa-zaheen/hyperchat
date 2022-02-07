// NEXT JS
import "../styles/globals.css";

// Firebase
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// Components / Pages
import Login from "./login";
import Chat from "./chat";
import Loading from "./Loading";

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);

  if (user) return <Chat />;

  if (loading) return <Loading />;

  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
