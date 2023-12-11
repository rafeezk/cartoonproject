
import Faq from "../components/FAQ";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MoviePage from "./MoviePage";

const HomePage = () => {
  return (
    <>
      <Header />
      <section className="home h-screen backdrop-brightness-50" id="home">
        <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
          <h2 className="text-5xl text-white w-[50%] font-bold drop-shadow-xl ">
            Spy X Family : Season 2
          </h2>
          <h3 className="text-[18px] text-white mt-3 md:mt-8 w-[60%] drop-shadow-xl leading-7 tracking-wide">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi omnis
            repudiandae dolorem sit, sapiente necessitatibus itaque unde magnam
            ratione aperiam.
          </h3>
          <button className="rounded-[4px] py-2 px-4 mt-2 font-medium bg-white hover:bg-transparent">
            Play
          </button>
        </div>
      </section>

      <MoviePage />
      <Faq/>
      <Footer/>
    </>
  );
};

export default HomePage;
