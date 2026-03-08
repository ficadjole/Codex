import Header from "./Header";
import Footer from "./Footer";
import type { LayoutProps } from "../../types/props/layout_props/LayoutProps";

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0C1618] text-[#EAF4EF]">
      <Header />

      <main className="flex-1 p-10 flex justify-center">
        {children}
      </main>

      <Footer />
    </div>
  );
}

// import Header from "./Header";
// import Footer from "./Footer";

// interface LayoutProps {
//   children: React.ReactNode;
// }

// export default function Layout({ children }: LayoutProps) {
//   return (
//     <div
//       className="
//       min-h-screen 
//       flex flex-col 
//       text-[#EAF4EF]
//       bg-[radial-gradient(circle_at_center,_#132226_0%,_#0C1618_70%)]
//       "
//     >
//       <Header />

//       <main className="flex-1 w-full">
//         {children}
//       </main>

//       <Footer />
//     </div>
//   );
// }