import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

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