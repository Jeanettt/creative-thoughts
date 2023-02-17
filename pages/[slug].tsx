import Message, { MessageProps } from "@/components/message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "@/utils/firebase";
import { toast } from "react-toastify";
import {
  arrayUnion,
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

interface Comment {
  avatar: string;
  message: string;
  time: string;
  username: string;
}

export default function Details() {
  const router = useRouter();
  const routeData = router.query;
  const [message, setMessage] = useState("");
  const [allComments, setAllComments] = useState([]);

  //Submit a message
  const submitMessage = async () => {
    //Check if the user is logged
    if (!auth.currentUser) return router.push("/auth/login");
    if (!message) {
      toast.error("Don't leave an empty message 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    const docRef = doc(db, "posts", routeData.id as string);
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        username: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    });
    setMessage("");
  };

  //Get Comments
  const getComments = async () => {
    const docRef = doc(db, "posts", routeData.id as string);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data();
      if (data) {
        setAllComments(data.comments);
      }
    });
    return unsubscribe;
  };

  useEffect(() => {
    if (!router.isReady) return;
    getComments();
  }, [router.isReady]);

  return (
    <div className="my-12">
      <h2 className="text-5xl mb-8 font-forum text-gray-700">
        Thought by {routeData.username}
      </h2>
      <Message {...routeData}></Message>
      <div className="my-8">
        <div className="flex">
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            value={message}
            placeholder="Comment on this thought"
            className="border border-primary-tint w-full p-2 text-sm"
          />
          <button
            onClick={submitMessage}
            className=" bg-primary text-white rounded-tr-sm rounded-br-sm py-2 px-4 text-sm"
          >
            Submit
          </button>
        </div>
        <div className="mt-12">
          <h2 className="font-bold">
            {allComments && allComments.length ? "Comments" : "No comments yet"}
          </h2>
          {allComments?.map((comment: Comment) => (
            <div
              className="border-b border-primary-tint mt-4 pb-4"
              key={comment.time}
            >
              <p className="p-4 italic ">{comment.message}</p>
              <figure className="flex items-center gap-2 text-xs">
                <img src={comment.avatar} alt="" className="w-8 rounded-full" />
                <figcaption className="text-gray-700">
                  {comment.username}
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
