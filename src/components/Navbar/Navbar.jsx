import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import MusicPlayer from "./MusicPlayer";
import SeahorseIcon from "../Icons/SeahorseIcon";

function Navbar() {

  const [hidden, setHidden] = useState(false);

  const lastScrollY = useRef(0);

  useEffect(() => {

    function handleScroll() {

      const currentY = window.scrollY;

      const scrolledDown = currentY > lastScrollY.current;

      const pastThreshold = currentY > 80;

      setHidden(scrolledDown && pastThreshold);

      lastScrollY.current = currentY;

    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  return (
    <header className={hidden ? "navbar navbar-hidden" : "navbar"}>

      <Link to="/" className="navbar-left navbar-home-link">

        <div className="logo">
          🧠
        </div>

        <div className="title">

          <h1>Psykopedia</h1>

          <span>
            Psykologprogrammets viktigaste koncept
          </span>

        </div>

      </Link>

      <nav className="navbar-right">

        <Link to="/favoriter" className="nav-button">❤️ Favoriter</Link>

        <Link
            to="/admin"
            className="nav-button"
        >

            👤 Admin

        </Link>

        <Link to="/hippocampus" className="nav-button hippocampus">

          <SeahorseIcon size={16} /> Teman

        </Link>

        <Link to="/fall" className="nav-button">

          🩺 Fall

        </Link>

        <MusicPlayer />

      </nav>

    </header>
  );
}

export default Navbar;