import Nav from './components/Nav';
import Hero from './components/Hero';
import SobreMi from './components/SobreMi';
import Servicios from './components/Servicios';
import Proyectos from './components/Proyectos';
import Stack from './components/Stack';
import Contacto from './components/Contacto';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SobreMi />
        <Servicios />
        <Proyectos />
        <Stack />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
