import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Team from "../components/Team";
import Testimonials from "../components/Testimonials";
import Colab from "../components/Colab";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans overflow-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col w-full">
        <Hero />
        <About />
        <Services />
        <Team />
        <Testimonials />
        <Colab />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
