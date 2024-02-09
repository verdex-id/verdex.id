import HomeAboutUs from "@/components/page/home/about-us";
import HomeFAQ from "@/components/page/home/faq";
import HomeFeedback from "@/components/page/home/feedback";
import HomeHero from "@/components/page/home/hero";
import HomeNewCourse from "@/components/page/home/new-course";
export default function Home() {
  return (
    <>
      <section id="hero" className="min-h-dvh">
        <HomeHero />
      </section>
      <section id="about-us" className="min-h-dvh">
        <HomeAboutUs />
      </section>
      <section id="new-course" className="min-h-dvh">
        <HomeNewCourse />
      </section>
      <section id="faq" className="min-h-dvh">
        <HomeFAQ />
      </section>
      <section id="feedback" className="min-h-dvh">
        <HomeFeedback />
      </section>
    </>
  );
}
