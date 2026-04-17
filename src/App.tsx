import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <Hero />
        <Portfolio />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
