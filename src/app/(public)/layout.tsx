// import { ReactNode } from "react";

import { Navbar } from "@/components/public/navbar";

// export default function Layout({ children }:{children:ReactNode}) {
//   return { children };
// }

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
       <Navbar />
      
      {children}
      {/* <Footer /> */}
    </>
  );
}