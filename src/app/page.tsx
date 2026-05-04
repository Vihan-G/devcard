import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <p className="text-center text-sm text-[#7d8590]">
            devcard scaffold — UI in progress.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
