import React, { ReactNode } from "react";
import Nav from "./Nav";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-6 md:max-w-2xl md:mx-auto font-open-sans">
      <Nav />
      <main>{children}</main>
    </div>
  );
}
