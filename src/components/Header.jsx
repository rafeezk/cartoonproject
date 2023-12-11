import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const scroll = () => {
    window.addEventListener("scroll", function () {
      const header = document.querySelector("header");
      header.classList.toggle("sticky", window.scrollY > 0);
    });
  };

  useEffect(() => {
    scroll();
  }, []);

  return (
    <header className="header absolute w-full px-8 py-[24px] z-10">
      <nav className="flex justify-between items-center mx-12">
        <div>
          <h2 className="font-bold text-white cursor-pointer text-[25px]">
            realiflix
          </h2>
          {/* <img className="w-[120px] cursor-pointer" src="/images/rafeyproject.png"/> */}
        </div>
        <div className="nav-links duration-500 md:static absolute md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto  w-full flex items-center px-5">
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            <li>
              <a
                className="text-white hover:text-[#DEDFDA] transition duration-300 no-underline"
                href="#home"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="text-white hover:text-[#DEDFDA] transition duration-300 no-underline"
                href="#movie"
              >
                Movie
              </a>
            </li>
            <li>
              <a
                className="text-white hover:text-[#DEDFDA] transition duration-300 no-underline"
                href="#faq"
              >
                Faq
              </a>
            </li>
            <li>
              {/* <a className="text-white hover:text-green-400" href="#">Brands</a> */}
              <a
                className="text-white hover:text-[#DEDFDA] transition duration-300 no-underline"
                href="#contacts"
              >
                Contacts
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <button
            className="cursor-pointer text-white"
            onClick={() => navigate("/booking")}
          >
            <FaUserCircle size={25} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
