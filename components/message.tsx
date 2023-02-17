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
    <div>
      <div
        className="
      mt-6
        w-fit
      p-4
      border
      border-b-4
      text-gray-800
      text-base
      rounded-lg
      bg-white
      border-primary-tint
      relative
      before:w-0
      before:h-0
      before:absolute
      before:border-8
      before:border-transparent
      before:border-l-primary-tint
      before:border-t-primary-tint
      before:-bottom-4
      before:left-8
      after:w-0
      after:h-0
      after:absolute
      after:border-8
      after:border-transparent
      after:border-l-white
      after:border-t-white
      after:-bottom-3
      after:left-[34px]"
      >
        <p>{description}</p>
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs">
        <figure className="flex items-center gap-2">
          <img src={avatar} alt="" className="w-8 rounded-full" />
          <figcaption className="text-gray-700">{username}</figcaption>
        </figure>
        {children}
      </div>
    </div>
  );
}
