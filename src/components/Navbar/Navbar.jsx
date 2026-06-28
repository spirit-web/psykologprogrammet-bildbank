import { Link } from "react-router-dom";

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

        <button>❤️ Favoriter</button>

        <button>ℹ Om</button>

        <Link to="/admin">

            👤 Admin

        </Link>

        <button className="hippocampus">

          🦭 Hippocampus

        </button>

      </nav>

    </header>
  );
}

export default Navbar;