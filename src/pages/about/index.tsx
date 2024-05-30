import { Footer } from "@/shared/components/footer";
import { Header } from "@/shared/components/header";

export function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="container max-w-screen-md grow py-16">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Empowering Your Fitness Journey with FitFuel
        </h1>

        <div className="mt-6 space-y-6 leading-7">
          <p>
            At FitFuel, we believe that everyone deserves the opportunity to
            unlock their full potential and achieve their fitness goals. Founded
            by a team of passionate athletes and nutrition experts, our mission
            is simple: to provide the highest quality sports nutrition products
            and support to help you reach new heights of performance and
            wellness.
          </p>

          <p>
            With a deep understanding of the unique needs of athletes at every
            level, we've meticulously curated a range of premium supplements
            designed to fuel your body, enhance recovery, and optimize results.
            Whether you're a professional athlete, a weekend warrior, or just
            starting your fitness journey, we're here to empower you with the
            tools and knowledge you need to succeed.
          </p>

          <p>
            But FitFuel is more than just a store—it's a community. We're
            dedicated to fostering a supportive environment where athletes can
            connect, share knowledge, and inspire each other to greatness.
            Through our blog, social media channels, and exclusive events, we
            provide valuable resources, expert advice, and a platform for
            athletes to come together and celebrate their achievements.
          </p>

          <p>
            Our commitment to quality is unwavering. Every product we offer
            undergoes rigorous testing and adheres to the highest industry
            standards, so you can trust that what you're putting into your body
            is of the utmost purity and efficacy.
          </p>

          <p>
            Thank you for choosing FitFuel as your partner in fitness. Join us
            today and let's embark on this journey together—together, we'll
            achieve greatness.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
