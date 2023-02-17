import Head from "next/head";
import { Inter } from "@next/font/google";
import Message from "@/components/message";
import { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

interface Post {
  comments?: string[];
  description?: string;
  id?: string;
  timestamp?: string;
}

export default function Home() {
  //Create a state with all the posts
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const getPosts = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Creative Thoughts</title>
        <meta
          name="description"
          content="Creative thoughts app | Share what is on your mind"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="my-12">
        <h2 className="text-5xl mb-4 font-forum text-gray-700">
          What people are thinking
        </h2>
        <div className="flex flex-col gap-4">
          {allPosts.map((post) => (
            <Message key={post.id} {...post}>
              <Link href={{ pathname: `${post.id}`, query: { ...post } }}>
                <button className="text-primary underline font-semibold">
                  {post.comments && post.comments.length > 0
                    ? post.comments.length
                    : 0}{" "}
                  comments
                </button>
              </Link>
            </Message>
          ))}
        </div>
      </div>
    </>
  );
}
