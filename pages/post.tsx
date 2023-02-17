import { auth, db } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

interface Post {
  comments?: string[];
  description?: string;
  id?: string;
  timestamp?: string;
}

export default function Post() {
  //Form state
  const [post, setPost] = useState<Post>({ description: "" });
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const routeData = route.query;
  console.log(routeData);
  //Submite post
  const submitPost = async (e: any) => {
    e.preventDefault();

    //Run checks for description
    if (!post.description) {
      toast.error("Description Field empty 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    if (post.description.length > 300) {
      toast.error("Description too long 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }

    if (post.hasOwnProperty("id") && post.id) {
      const docRef = doc(db, "posts", post.id);
      const updatedPost = { ...post, timestamp: serverTimestamp() };
      await updateDoc(docRef, updatedPost);
      return route.push("/");
    } else {
      //Make a new post
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        user: user?.uid,
        avatar: user?.photoURL,
        username: user?.displayName,
      });
      setPost({ description: "" });
      toast.success("Post has been made 🚀", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return route.push("/");
    }
  };

  //Check our user
  const checkUser = async () => {
    if (loading) return;
    if (!user) route.push("/auth/login");
    if (routeData.id && routeData.description) {
      setPost({
        description: routeData.description as string,
        id: routeData.id as string,
      });
    }
  };

  useEffect(() => {
    checkUser();
  }, [user, loading]);

  return (
    <div className="my-12 max-w-md">
      <form onSubmit={submitPost}>
        <h2 className="text-5xl mb-4 font-forum text-gray-700">
          {post.hasOwnProperty("id") ? "Edit your post" : "Create a new post"}
        </h2>
        <div className="mt-8">
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="w-full border border-primary-tint rounded-lg p-2 text-sm h-48"
          ></textarea>
          <p
            className={`text-slate-500 text-sm ${
              post.description && post.description.length > 300
                ? "text-red-600"
                : ""
            }`}
          >
            {post.description && post.description.length
              ? post.description.length
              : 0}
            /300
          </p>
          <button
            type="submit"
            className="w-full bg-primary text-white font-medium p-2 my-2 rounded-sm text-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
