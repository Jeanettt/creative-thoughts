import { ReactNode } from "react";

export interface MessageProps {
  children?: ReactNode;
  avatar?: string;
  username?: string;
  description?: string;
}

export default function Message({
  children,
  avatar,
  username,
  description,
}: MessageProps) {
  return (
    <div className="bg-white p-8 border-b-2 rounded-lg">
      <div className="flex items-center gap-2">
        <img src={avatar} alt="" className="w-10 rounded-full" />
        <h2>{username}</h2>
      </div>
      <div className="py-4">
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
