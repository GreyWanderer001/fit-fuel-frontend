import { Footer } from "@/shared/components/footer";
import { Header } from "@/shared/components/header";

import { Hero } from "./hero";
import { RecommendationSection } from "./recommendation-section";

export function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="my-16 grow">
        <Hero />
      </main>

      <RecommendationSection />

      <Footer />
    </div>
  );
}
