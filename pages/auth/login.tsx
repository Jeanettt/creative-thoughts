import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function Login() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  //Sign in with Google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      route.push("/");
    } else {
      console.log("login");
    }
  }, [user]);

  return (
    <div className="my-12 p-10 flex flex-col items-center">
      <h2 className="text-5xl font-forum text-gray-700">Join Today</h2>
      <p className="mt-8">Sign in with one of the providers</p>
      <button
        onClick={GoogleLogin}
        className="mt-4 text-white font-semibold bg-secondary rounded-sm flex align-middle p-4 gap-2"
      >
        <FcGoogle className="text-2xl" />
        Sign in with Google
      </button>
    </div>
  );
}
