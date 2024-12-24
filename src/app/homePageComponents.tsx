import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold">SKE TECH</div>
        <nav className="hidden md:flex space-x-6">
          <Link href="#features">
            <span className="hover:text-gray-300">Features</span>
          </Link>
          <Link href="#about">
            <span className="hover:text-gray-300">About Us</span>
          </Link>
          <Link href="#contact">
            <span className="hover:text-gray-300">Contact</span>
          </Link>
          <Link href="/register">
            <span className="hover:text-gray-300">Register your School</span>
          </Link>
        </nav>
        <div className="md:hidden cursor-pointer">☰</div>
      </div>
    </header>
  );
};

const HeroSection = () => {
  return (
    <section
      className="h-screen bg-cover bg-center flex items-center justify-center font-extrabold text-gray-800"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1596495577886-d920f13eaa7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80')",
      }}
    >
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to SKE TECH
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          Empowering Education Through Technology
        </p>
        <a
          href="#contact"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      img: "https://img.icons8.com/ios-filled/100/000000/school.png",
      title: "School Management",
      description:
        "Manage school operations, academic sessions, and student enrollments with ease.",
    },
    {
      img: "https://img.icons8.com/ios-filled/100/000000/teacher.png",
      title: "Teacher Dashboard",
      description:
        "Comprehensive tools for teachers to manage classes and student progress.",
    },
    {
      img: "https://img.icons8.com/ios-filled/100/000000/student-male.png",
      title: "Student Portal",
      description:
        "Personalized student portals with access to assignments, grades, and more.",
    },
  ];

  return (
    <section id="features" className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md">
              <img
                src={feature.img}
                alt={feature.title}
                className="mx-auto mb-4 w-20"
              />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// components/AboutSection.tsx
const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <img
          src="https://images.unsplash.com/photo-1587560699334-f186d9d717c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
          alt="About Us"
          className="rounded-lg mx-auto mb-8 max-w-full h-auto"
        />
        <h2 className="text-3xl font-bold mb-4">About SKE TECH</h2>
        <p className="mb-4">
          SKE TECH is a comprehensive platform designed to simplify the
          management of educational institutions.
        </p>
        <p>
          Whether you are an administrator, teacher, or student, SKE TECH
          provides the tools you need to succeed in the digital age of
          education.
        </p>
      </div>
    </section>
  );
};

// components/CallToAction.tsx
const CallToAction = () => {
  return (
    <section className="py-16 bg-gray-800 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">
        Ready to Transform Your School?
      </h2>
      <a
        href="/signup"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full"
      >
        Get Started
      </a>
    </section>
  );
};

// components/ContactSection.tsx
const ContactSection = () => {
  return (
    <section id="contact" className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
        <form
          action="/submit_form/"
          method="post"
          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-left font-semibold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-left font-semibold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-left font-semibold mb-2"
            >
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="w-full border border-gray-300 p-2 rounded-lg"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

// components/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-300 text-center py-4">
      <p>&copy; 2024 SKE TECH. All rights reserved.</p>
    </footer>
  );
};

export {
  Header,
  HeroSection,
  FeaturesSection,
  AboutSection,
  CallToAction,
  ContactSection,
  Footer,
};
