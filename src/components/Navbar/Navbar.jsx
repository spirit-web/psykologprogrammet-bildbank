import { Link } from "react-router-dom";
import "./Navbar.css";
import MusicPlayer from "./MusicPlayer";

function Navbar() {
  return (
    <header className="navbar">

      <div className="navbar-left">

        <div className="logo">
          🧠
        </div>

        <div className="title">

          <h1>Psykopedia</h1>

          <span>
            AI-driven kunskapsportal
          </span>

        </div>

      </div>

      <nav className="navbar-right">

        <Link to="/favoriter" className="nav-button">❤️ Favoriter</Link>

        <MusicPlayer />

        <Link
            to="/admin"
            className="nav-button"
        >

            👤 Admin

        </Link>

        <Link to="/hippocampus" className="nav-button hippocampus">

          🦭 Hippocampus

        </Link>

      </nav>

    </header>
  );
}

export default Navbar;