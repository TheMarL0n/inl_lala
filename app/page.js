import Footer from "./components/Footer";
import Header from "./components/Header";
import Aprende from "./components/Home/Aprende";
import Dudas from "./components/Home/Dudas";
import Mitos from "./components/Home/Mitos";
import Nutricion from "./components/Home/Nutricion";
import Preguntas from "./components/Home/Preguntas";
import Profesionales from "./components/Home/Profesionales";
import HomeJumbotron from "./components/HomeJumbotron";

export default function Home() {
  return (
    <main>
      <Header />
      <HomeJumbotron />
      <Nutricion />
      <Dudas />
      <Aprende />
      <Preguntas />
      <Mitos />
      <Profesionales />
      <Footer/>
    </main>
  );
}