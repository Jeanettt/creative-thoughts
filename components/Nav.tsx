import Link from "next/link";
import { auth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Nav() {
  const [user, loading] = useAuthState(auth);
  return (
    <nav className="flex justify-between items-center py-10 border-b border-primary-tint">
      <Link href="/">
        <button className="text-lg text-left text-secondary font-semibold leading-tight">
          Creative <br />
          Thoughts
        </button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <Link href={"/auth/login"}>
            <span className="py-2 px-4 text-sm bg-primary text-white rounded-sm font-semibold ml-8">
              Join Now
            </span>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-6">
            <Link href="/post">
              <button className="font-semibold bg-secondary text-white py-2 px-4 rounded-sm text-xs">
                New Post
              </button>
            </Link>
            <Link href="/dashboard">
              <img
                className="w-12 rounded-full cursor-pointer"
                src={user.photoURL || ""}
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}
