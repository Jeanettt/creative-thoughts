import { auth, db } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Message from "@/components/message";
import { BsTrash2Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";

interface Post {
  comments?: string[];
  description?: string;
  id: string;
  timestamp?: string;
}

export default function Dashboard() {
  const route = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, loading] = useAuthState(auth);
  //See if user is Logged
  const getData = async () => {
    if (loading) return;
    if (!user) return route.push("auth/login");
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(result);
    });
    return unsubscribe;
  };

  //Delete Post
  const deletePost = async (id?: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      await deleteDoc(docRef);
    }
  };

  //Get users data
  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <div className="my-12 md:flex justify-between">
      <div>
        <h2 className="text-5xl mb-4 font-forum text-gray-700">Your posts</h2>
        <div>
          {posts.map((post: Post) => {
            return (
              <Message key={post.id} {...post}>
                <div className="flex gap-4">
                  <button
                    onClick={(e) => deletePost(post.id)}
                    className="text-secondary-tint font-semibold flex items-center gap-0.5 py-2 text-xs"
                  >
                    <BsTrash2Fill className="text-base" />
                    <span className="underline">Delete</span>
                  </button>
                  {/* @ts-ignore */}
                  <Link href={{ pathname: "/post", query: post }}>
                    <button className="text-primary font-semibold flex items-center gap-0.5 py-2 text-xs">
                      <AiFillEdit className="text-base" />
                      <span className="underline">Edit</span>
                    </button>
                  </Link>
                </div>
              </Message>
            );
          })}
        </div>
      </div>
      <div>
        <h2 className="text-2xl mt-12 md:mt-4 font-semibold text-gray-700">
          Account info
        </h2>
        <button
          className="mt-4 font-semibold text-secondary underline"
          onClick={() => auth.signOut()}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
