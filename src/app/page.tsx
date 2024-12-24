import {
  Header,
  HeroSection,
  FeaturesSection,
  AboutSection,
  CallToAction,
  ContactSection,
  Footer,
} from "./homePageComponents";

const Homepage = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      <Header />

      <main>
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <CallToAction />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
