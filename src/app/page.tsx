import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeClient from "@/components/HomeClient";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HomeClient />
      </main>
      <Footer />
    </>
  );
}
