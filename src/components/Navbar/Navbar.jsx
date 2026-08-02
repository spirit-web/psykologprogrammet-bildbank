import { Link } from "react-router-dom";
import "./Navbar.css";
import MusicPlayer from "./MusicPlayer";

function Navbar() {
  return (
    <header className="navbar">

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

          🦭 Hippocampus

        </Link>

        <MusicPlayer />

      </nav>

    </header>
  );
}

export default Navbar;